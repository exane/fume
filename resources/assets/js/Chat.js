var $ = require("jquery");
var Config = require("./Config.js");
var Login = require("./Login.js");

var Chat = (function(){
    var Chat = function(url){
        if(!(this instanceof Chat))
            return (new Chat(url));
        if(Chat._singleton) return Chat._singleton;
        Chat._singleton = this;

        this.setUrl(url);

        this.events();

        this._login = Login();

        this.$chat = $(".chats");


        $.when(Config().load())
        .then(this.initPusher.bind(this))
        .then(this.bindChannel.bind(this))
        .then(this.scrollDown.bind(this));

    };
    var r = Chat.prototype;

    Chat._singleton = null;

    r._url = null;
    r._login = null;
    r._userName = null;


    r.pusher = null;
    r.chatChannel = null;
    r.userTypesChannel = null;
    r.userDoesntTypeChannel = null;

    r.$chat = null;

    r.setUrl = function(url){
        this._url = url;
    }

    r.getUrl = function(){
        return this._url;
    }

    r.events = function(){

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
        this.chatChannel = this.pusher.subscribe("nachrichten");
        this.userTypesChannel = this.pusher.subscribe("schreiben");
        this.userDoesntTypeChannel = this.pusher.subscribe("schreiben-keine");

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
        this.chatChannel.bind("nachrichten senden", this.chatChannelCallback.bind(this));
        this.userTypesChannel.bind("schreiben", this.userTypesChannelCallback.bind(this));
        this.userDoesntTypeChannel.bind("schreiben-keine", this.userDoesntTypeChannelCallback.bind(this));
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

        this.addMessage(userName, message, time, isHandy);


    }
    r.userTypesChannelCallback = function(data){
        /*data = {
            "benutzer": "exane"
        }*/
    }
    r.userDoesntTypeChannelCallback = function(data){
        /*data = {
            "benutzer": "exane"
        }*/
    }

    r.scrollDown = function(){
        var div = $(".chats");
        div.scrollTop(div.parent().height() << 10); //fuck that shit
    }


    return Chat;
})();

module.exports = Chat;