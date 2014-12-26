var $ = require("jquery");
var FumePush = require("./FumePushClient.js");
var Config = require("./Config.js");
var DisplayTyping = require("./Display.js");
var Autolinker = require("autolinker");
var Meme = require("./Meme.js");
var Tab = require("./taboverride.js");
var Cmd = require("./Command.js");
var Sound = require("./Sound.js");

var keyCode = {
    "enter": 13,
    "shift": 16,
    "tab": 9,
    "f5": 116
}

var channel = {
    chat: {
        channelName: "chat",
        event: {
            message: "send",
            typing: "typing",
            messageError: "messageError"
        }
    }
}

var flags = {
    SCROLLING: 0x1,
    YOUTUBE_LINK: 0x2
}

var Chat = (function(){
    var Chat = function(){
        if(!(this instanceof Chat))
            return (new Chat());

        if(Chat._singleton) return Chat._singleton;
        Chat._singleton = this;


        $.when(Config().load())
        .then(this.init.bind(this))
        .then(this.initSockets.bind(this))
        .then(this.bindChannel.bind(this));
        //.then($(window).load(this.scrollDown.bind(this, true)));
    }
    var r = Chat.prototype;

    Chat._singleton = null;

    r._url = null;
    r._login = null;
    r._userName = null;

    r._tabsize = 4;
    r._typingTimeFlag = 0;
    r._chatFlag = null;


    r.socket = null;
    r.chatChannel = null;


    r.$chat = null;

    r.setUrl = function(url){
        this._url = url;
    }

    r.getUrl = function(){
        return this._url || "http://127.0.0.1/";
    }

    r.init = function(){
        this.setUrl(Config().get().url);
        this.initChatFlag();
        this.setChatFocus();
        this.handleYoutubeLinksClick();
        this.$chat = $(".chats");

        $(".chatbox").on("keydown", this.onKeypress.bind(this));

        Tab.tabSize(this._tabsize);
        Tab.set(document.querySelector(".chatbox"));

        this.$chat.on("scroll", this.onScroll.bind(this));

        $(window).load(function(){
            this.hideSplashScreen();
            this.scrollDown(true);
        }.bind(this));
        $(window).ready(function(){ //crap -.-
            this.hideSplashScreen();
            this.scrollDown(true);
        }.bind(this));
    }

    r.initChatFlag = function(){
        this._chatFlag = 0;
    }

    r.initSockets = function(){
        var cfg = Config().get();
        this.socket = new FumePush(cfg["url_origin"], 8000);

        this.chatChannel = this.socket.subscribe(channel.chat.channelName);


        this.setUserName(cfg["username"]);
    }

    r.onScroll = function(){
        if(this.isScrollOnBottom()){
            this.removeFlag(flags.SCROLLING);
            return;
        }
        this.setFlag(flags.SCROLLING);
    }

    r.onKeypress = function(e){
        /*if(e.which == keyCode.tab){
            e.preventDefault();
            this.addTab();
        }*/
        if(e.which === keyCode["f5"]) return; //to prevent user calls "typing" when he only refresh his page

        //to prevent overhead it fires only every 3 seconds an "typing" event
        if((this._typingTimeFlag + 3000) < Date.now()){
            this._typingTimeFlag = Date.now();

            this.chatChannel.trigger(channel.chat.event.typing, {
                user: this.getUserName()
            })
        }

        if(e.which != keyCode.enter || e.shiftKey) return;
        this.sendMessage();
        return false;
    }

    r.setUserName = function(name){
        this._userName = name || this._userName;
    }

    r.getUserName = function(){
        return this._userName || "Smitty Werben Jagger Man Jensen";
    }

    r.addMessage = function(user, message, time, isHandy, id){
        var box = $("<div data-id='" + id + "' class='box'><p></p><span></span></div>")

        if(user === this.getUserName())
            box.addClass("box-me");
        else
            box.addClass("box-partner");

        box.find("p").append(message);
        box.find("span").append(time);

        if(isHandy)
            box.find("span").append("<i></i>");

        this.$chat.append(box);

        box.find("img").on("load", function(){
            this.scrollDown()
        }.bind(this));

        this.scrollDown();
    }

    r.sendMessage = function(){
        var raw = $(".chatbox").val();
        var text = this.parseLink(raw);
        var id = this.getCurrentChatID();
        var time = this.getChatTime();
        var handy = this.isHandy();
        var res;

        if(!$.trim(text)){
            this.empty();
            return;
        }

        if(res = Cmd.compile(text)){
            this.empty();
            this.addMessage("cmd", res, time, false, "cmd");
            return;
        }

        text = Meme.convert(text);
        raw = Meme.convert(raw);

        this.addMessage(this.getUserName(), text, time, handy, id);

        this.convertYoutubeLinks();
        text = $(".box[data-id='" + (this.getCurrentChatID() - 1) + "']").find("p").html();

        this.empty();
        this._typingTimeFlag = 0;

        this.chatChannel.trigger(channel.chat.event.message, {
            user: this.getUserName(),
            handy: handy,
            message: text,
            time: time,
            id: id
        });

        this.createDBEntry(raw, handy);
    }

    r.bindChannel = function(){
        this.chatChannel.bind(channel.chat.event.message, this.chatChannelCallback.bind(this));
        this.chatChannel.bind(channel.chat.event.typing, this.userTypesChannelCallback.bind(this));
        this.chatChannel.bind(channel.chat.event.messageError, this.messageErrorCallback.bind(this));
    }

    r.chatChannelCallback = function(data){
        /*data = {
            user: "exane",
            handy: false,
            message: "yolo",
            time: "17:39"
        }*/
        data = this.isJson(data) ? JSON.parse(data) : data;
        var userName = data.user;
        var isHandy = data.handy;
        var message = data.message;
        var time = data.time;
        var id = data.id;

        if(userName === this.getUserName()) return;

        this.addMessage(userName, message, time, isHandy, id);
        DisplayTyping().end();
        DisplayTyping().increaseMessageCounter().updateTitle();
        Sound().play();
    }

    r.userTypesChannelCallback = function(data){
        /*data = {
            "user": "exane"
        }*/
        if(data.user === this.getUserName()) return;
        DisplayTyping().start();

        this.scrollDown();
    }

    r.messageErrorCallback = function(data){
        $(".box[data-id='" + data.id + "']").find("span").prepend("<b></b>");
    }

    r.isJson = function(str){
        try {
            JSON.parse(str);
        } catch(e) {
            return false;
        }
        return true;
    }

    r.createDBEntry = function(text, handy, id){
        var _this = this;
        $.ajax({
            url: "../public/createDBEntry",
            type: "post",
            data: {
                handy: handy,
                message: text
            }
        }).done(function(val){
        }).fail(function(val){
            _this.chatChannel.trigger(channel.chat.event.messageError, {
                id: id
            });
        });
    }

    r.parseLink = function(input){

        return Autolinker.link(input, {
            truncate: 40,
            replaceFn: function(autolinker, match){

                if(this.isHandy()){
                    return true;
                }

                var url = match.getUrl();

                switch(match.getType()) {
                    case 'url':
                        // Image.
                        if(url.match(/\.(jpeg|jpg|gif|png)$/)){
                            return "<a href='" + url + "' target='_blank'><img class='chat-img' src='" + url + "'></a>";
                        }

                        // Youtube.
                        if(url.match(/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/)){
                            this.setFlag(flags.YOUTUBE_LINK);
                            return "<a class='youtube-link' href='" + RegExp.$1 + "'><small></small><em></em></a>";
                        }

                        return true;
                }
            }.bind(this)
        });
    }

    r.setFlag = function(expr){
        this._chatFlag |= expr;
    }

    r.removeFlag = function(expr){
        this._chatFlag &= ~expr;
    }

    r.toggleFlag = function(expr){
        this._chatFlag ^= expr;
    }

    r.isFlag = function(expr){
        return this._chatFlag & expr;
    }

    r.getChatTime = function(){
        var hours = new Date().getHours();
        var minutes = new Date().getMinutes();

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;

        return hours + ":" + minutes;
    }

    r.isHandy = function(){
        return screen.width < 500;
    }

    r.setChatFocus = function(){
        $(window).focus(function(){
            $(".chatbox").focus();
            DisplayTyping().isWindowActive = true;
            DisplayTyping().resetMessageCounter().updateTitle();
        })
        .blur(function(){
            DisplayTyping().isWindowActive = false;
        });
    }

    r.handleYoutubeLinksClick = function(){
        $(document).on("click", ".youtube-link", function(){
            var id = $(this).attr("href");
            $(".youtube-wrap").html("<iframe width='560' height='315' src='//www.youtube.com/embed/" + id + "?rel=0&autoplay=1' frameborder='0' allowfullscreen></iframe>")

            return false;
        });
    }

    r.convertYoutubeLinks = function(){
        var youtubeBox;

        if(!this.isFlag(flags.YOUTUBE_LINK)) return;

        youtubeBox = $(".box[data-id='" + (this.getCurrentChatID() - 1) + "']");

        youtubeBox.find(".youtube-link").each(function(index, value){
            $.ajax({
                url: "../public/getYoutubeTitle/" + $(this).attr("href"),
                async: false
            }).done(function(val){
                youtubeBox.find(".youtube-link:eq(" + index + ")").find("em").text(val);
            });
        });

        this.removeFlag(flags.YOUTUBE_LINK);
    }

    r.getCurrentChatID = function(){
        return +$(".box:not([data-id='cmd']):not(.typing)").last().attr("data-id") + 1;
    }

    r.empty = function(){
        $(".chatbox").val("");
    }

    r.isScrollOnBottom = function(){
        var padding = parseInt(this.$chat.css("padding-top"));
        var isDown = (this.$chat.prop("scrollHeight") - this.$chat.height() - padding) <= this.$chat.scrollTop();
        return isDown;
    }

    r.scrollDown = function(force){
        force = force || false;
        if(!force && this.isFlag(flags.SCROLLING)){
            return;
        }
        this.$chat.scrollTop(this.$chat.prop("scrollHeight"));

        if(!this.isScrollOnBottom()){
            this.scrollDown(true);
        }
    }

    r.hideSplashScreen = function(){
        $(".splashscreen").hide();
        $(".chat-wrap").show();
    }

    return Chat;
})();

module.exports = Chat;