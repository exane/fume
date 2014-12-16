var $ = require("jquery");
var Config = require("./Config.js");
//var Login = require("./Login.js");
var DisplayTyping = require("./Display.js");

var keyCode = {
    "enter": 13,
    "shift": 16,
    "tab": 9
}

var eventName = {
    chat: {
        channel: "nachrichten",
        event: "nachrichten senden"
    },
    typing: {
        channel: "schreiben",
        event: "schreibt"
    }
}

var Chat = (function(){
    var Chat = function(){
        if(!(this instanceof Chat))
            return (new Chat());

        if(Chat._singleton) return Chat._singleton;
        Chat._singleton = this;

        $.when(Config().load())
        .then(this.init.bind(this))
        .then(this.initPusher.bind(this))
        .then(this.bindChannel.bind(this))
        .then(this.scrollDown.bind(this));

    }
    var r = Chat.prototype;

    Chat._singleton = null;

    r._url = null;
    r._login = null;
    r._userName = null;

    r._tabsize = 4;


    r.pusher = null;
    r.chatChannel = null;
    r.userTypesChannel = null;
    r.userDoesntTypeChannel = null;


    r.$chat = null;

    r.setUrl = function(url){
        this._url = url;
    }

    r.getUrl = function(){
        return this._url || "http://127.0.0.1/";
    }

    r.init = function(){
        this.setUrl(Config().get().url);
        //this._login = Login();
        this.$chat = $(".chats");
        $(".chatbox").on("keydown", this.onKeypress.bind(this));
    }


    r.setUserName = function(name){
        this._userName = name || this._userName;
    }

    r.getUserName = function(){
        return this._userName || "Smitty Werben Jagger Man Jensen";
    }

    r.initPusher = function(){
        var cfg = Config().get();
        this.pusher = new Pusher(cfg["pusher_key"]);
        this.chatChannel = this.pusher.subscribe(eventName.chat.channel);
        this.userTypesChannel = this.pusher.subscribe(eventName.typing.channel);

        this.setUserName(cfg["username"]);
    }

    r.addMessage = function(user, message, time, isHandy){
        var box = $("<div class='box'><p></p><span></span></div>")

        if(user === this.getUserName())
            box.addClass("box-me");
        else
            box.addClass("box-partner");

        box.find("p").text(message);
        box.find("span").text(time);

        //todo: handy support

        this.$chat.append(box);

        this.scrollDown();
    }

    r.bindChannel = function(){
        this.chatChannel.bind(eventName.chat.event, this.chatChannelCallback.bind(this));
        this.userTypesChannel.bind(eventName.typing.event, this.userTypesChannelCallback.bind(this));
    }

    r.chatChannelCallback = function(data){
        /*data = {
            benutzer: "exane",
            handy: false,
            nachricht: "yolo",
            zeit: "17:39"
        }*/
        var userName = data.benutzer;
        var isHandy = data.handy;
        var message = data.nachricht;
        var time = data.zeit;

        if(userName === this.getUserName()) return;

        this.addMessage(userName, message, time, isHandy);
    }

    r.userTypesChannelCallback = function(data){
        /*data = {
            "benutzer": "exane"
        }*/
        if(data.benutzer === this.getUserName()) return;
        DisplayTyping().start();

        this.scrollDown();
    }

    r.onKeypress = function(e){
        if(e.which == keyCode.tab){
            e.preventDefault();
            this.addTab();
        }
        if(e.which != keyCode.enter || e.shiftKey) return;
        this.sendMessage();
        return false;
    }

    r.sendMessage = function(){
        var text = $(".chatbox").val();
        var time = this.getChatTime();
        var handy = false;

        if(!text) return;

        this.addMessage(this.getUserName(), text, time, handy);

        this.empty();

        /*data = {
            benutzer: this.getUserName(),
            handy: false,
            nachricht: text,
            zeit: time
        }
        */
        
    }

    r.getChatTime = function(){
        var hours = new Date().getHours();
        var minutes = new Date().getMinutes();

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;

        return hours + ":" + minutes;
    }

    r.addTab = function(){
        var chatText = $(".chatbox")
        var text = chatText.val();

        for(var i = 0; i < this._tabsize; i++) {
            text += " ";
        }
        chatText.val(text)
    }

    r.empty = function(){
        $(".chatbox").val("");
    }

    r.scrollDown = function(){
        var div = $(".chats");
        div.scrollTop(div.parent().height() << 10); //fuck that shit
    }


    return Chat;
})();

module.exports = Chat;