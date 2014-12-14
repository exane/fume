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

        $.when(Config().load())
        .then(this.initPusher.bind(this))
        .then(this.bindChatChannel.bind(this));

    };
    var r = Chat.prototype;

    Chat._singleton = null;

    r._url = null;
    r._cookie = null;
    r._messageNumber = null;
    r._login = null;

    r.getMessageNumber = function(){
        return this._messageNumber;
    }
    r.changeMessageNumberBy = function(i){
        this._messageNumber += i;
    }

    r.pusher = null;
    r.chatChannel = null;
    r.userTypesChannel = null;
    r.userDoesntTypeChannel = null;

    r.$optionsOpenChat = null;
    r.$optionsOpenTrack = null;

    r.setUrl = function(url){
        this._url = url;
    }

    r.getUrl = function(){
        return this._url;
    }

    r.events = function(){
        this.$optionsOpenChat = $("#chat_offnen");
        this.$optionsOpenTrack = $("#track_offnen");

        this.$optionsOpenChat.on("click", this.optionsOpenChat.bind(this));
        this.$optionsOpenTrack.on("click", this.optionsOpenTrack.bind(this));
        $(document).on("click", ".yt-btn", this.onYouTubeClick);
    }

    r.initPusher = function(){
        var cfg = Config().get();
        this.pusher = new Pusher(cfg["pusher_key"]);
        this.chatChannel = this.pusher.subscribe("nachrichten");
        this.userTypesChannel = this.pusher.subscribe("schreiben");
        this.userDoesntTypeChannel = this.pusher.subscribe("schreiben-keine");
        this._cookie = $("#chat-posten").find("textarea").data("cookie");
    }

    r.bindChatChannel = function(){
        this.chatChannel.bind("nachrichten senden", function(data){
            var $dataid = $(".raum:last-child").data("id");
            var $data_id_next = $dataid + 1;
            var cont = $("#chat-inhalt");
            var $farbe = "exane";
            var message = data.nachricht;
            var handy = "";
            var val = "";

            if(this._cookie == data.benutzer){
                $farbe = "pyxl";
            }

            message = message.split('(str_plus)').join('+').split('(str_and)').join("&");

            if(data.handy == "true"){
                handy = "<i></i>";
            }


            val = "" +
            "<div class='raum " + $farbe + "' data-id='" + $data_id_next + "'>" +
                "<div class='sprite pfeil'></div>" +
                "<p>" + this.replaceURLWithHTMLLinks(message) + "</p>" +
                "<span>" + data.zeit + "</span>" + handy +
            "</div>";

            this.changeMessageNumberBy(1);
            /*if(binAfk == true && data.benutzer != $cookie2){
                document.title = nachrichtenAnzahl + " fume " + tippt;
            }
            else if(binAfk == false){
                nachrichtenAnzahl = "";
                document.title = nachrichtenAnzahl + " fume " + tippt;
            }*/
            $("#chat-inhalt").append(val);
            $(".exane").css("margin", "0 0 10px 0");
            $(".pyxl").css("margin", "0 0 10px 0");
            $("#chat-inhalt").animate({ scrollTop: 9999999999999 }, 0);
        }.bind(this));

    }

    r.replaceURLWithHTMLLinks = function(text){
        var link = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        var img = /(\b(https?|ftp|file):\/\/([ \S]+\.(jpg|png|gif)))/ig;
        var yt = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g;

        if(text.match(yt)){
            return text.replace(yt, '<span data-link="$1" style="float: none;"><i class="yt-btn" style="background: url(' + url + 'img/play_fume.png) no-repeat; width: 74px; margin: 10px 100px 10px 110px; height: 49px; cursor: pointer;"></i></span>');
        }
        else if(text.match(img)){
            return text.replace(img, "<a href='$1' target='_blank'><img src='$1' width='290px' height='auto' style='margin: 5px 0 0 0;'></a>");
        }
        return text.replace(link, "<a target='_blank' href='$1'>$1</a>");
    }

    r.imageReplace = function(text){
        var expImage = /(\b(https?|ftp|file):\/\/([ \S]+\.(jpg|png|gif)))/ig;
        return text.replace(expImage, "<a href='$1' target='_blank'><img src='$1' width='290px' height='auto'></a>");
    }

    r.optionsOpenChat = function(){
        if(this.$optionsOpenChat.prop('checked')){
            $.ajax({
                type: "POST",
                data: "tools_check=chat",
                url: this.getUrl() + "settings/checked.php"
            });

            $(".chat-check .red").animate({
                margin: "0 0 0 -44px"
            }, 300);
            $(".chat-check .green").animate({
                margin: "0 0 0 44px"
            }, 300);
            this.setOptionSwitch("track");
        }
        else {

            $.ajax({
                type: "POST",
                data: "tools_check=none",
                url: this.getUrl() + "settings/checked.php"
            });

            $(".chat-check .red").animate({
                margin: 0
            }, 300);
            $(".chat-check .green").animate({
                margin: "0 0 0 88px"
            }, 300);
        }
    }

    r.optionsOpenTrack = function(){
        if(this.$optionsOpenTrack.prop('checked')){
            $.ajax({
                type: "POST",
                data: "tools_check=track",
                url: this.getUrl() + "settings/checked.php"
            });

            $(".track-check .red").animate({
                margin: "0 0 0 -44px"
            }, 300);
            $(".track-check .green").animate({
                margin: "0 0 0 44px"
            }, 300);
            this.setOptionSwitch("chat");
        }
        else {

            $.ajax({
                type: "POST",
                data: "tools_check=none",
                url: this.getUrl() + "settings/checked.php"
            });

            $(".track-check .red").animate({
                margin: 0
            }, 300);
            $(".track-check .green").animate({
                margin: "0 0 0 88px"
            }, 300);
        }
    }

    r.setOptionSwitch = function(val){
        $("#" + val + "_offnen").attr('checked', false);

        $("." + val + "-check .red").animate({
            margin: 0
        }, 300);
        $("." + val + "-check .green").animate({
            margin: "0 0 0 88px"
        }, 300);
    }

    r.onYouTubeClick = function(){
        var $dataLink = $(this).parent().data("link");

        var $parent = $(this).parent();
        $(this).remove();
        $($parent).html('<iframe style="position: relative; border: none; left: 0; top: 0; margin: 5px 0 0 0;" src="http://www.youtube.com/embed/' + $dataLink + '" allowfullscreen width="290px" height="auto"></iframe>');
    }


    return Chat;
})();

module.exports = Chat;