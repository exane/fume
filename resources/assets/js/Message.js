var Meme = require("./Meme.js");
var Autolinker = require("autolinker");
var $ = require("jquery");
var Config = require("./Config.js");
var Scrollbar = require("./Scrollbar.js");
var Flag = require("./Flags.js");

var Message = (function(){
  var Message = function(opt){
    if(!(this instanceof Message))
      return (new Message(opt));

    this._user = opt.user;
    this._message = this._raw = opt.message;
    this._time = opt.time ? opt.time : this._getChatTime();
    this._isHandy = opt.handy || false;
    this._id = opt.id || this._getCurrentChatID();

    //this.$chat = $(".chats");

    this.addMessage();
  };
  var r = Message.prototype;

  r._user = null;
  r._message = null;
  r._time = null;
  r._isHandy = null;
  r._id = null;
  r._raw = null;
  r._hasYoutubeLink = null;
  r._legacy = null;

  r.state = 0;
  r.isCmd = 0;

  r.$chat = Message.$chat = (Message.$chat || $(".chats"));
  r.$box = null;
  r.$stateIcon = null;

  Message.desktopRef = null;

  r.addMessage = function(){
    var box = this.$box = $("<div data-id='" + this._id + "' class='box'><p></p><span></span><div class='chat-state-icon'></div></div>");
    /*if(this._parseAppCommand()){
      this.isCmd = true;
    }*/
    this._message = this._parseLink(this._message, this._isHandy);
    this._message = Meme.display(this._message);
    this.$stateIcon = box.find(".chat-state-icon");

    if(this._user === Config().getCfg().username)
      box.addClass("box-me");
    else
      box.addClass("box-partner");

    box.find("p").append(this._message);
    box.find("span").append(this._time);

    this._displayButton();

    if(this._isHandy)
      box.find("span").append("<i></i>");

    this.$chat.find('.typing').before(box);

    this._convertYoutubeLinks();

    box.find("img").on("load", function(){
      //this.scrollDown()
      Scrollbar.scrollDown();
    }.bind(this));

    //this.scrollDown();
    Scrollbar.scrollDown();
  }

  r.remove = function(){
    this.$box.remove();
  }

  r.get = function(){
    return {
      user: this._user,
      message: this._raw,
      time: this._time,
      id: this._id,
      handy: this._isHandy,
      _legacy: this._legacy
    };
  }

  // state = 0111
  // 0110
  r.setState = function(expr){
    var box = this.$stateIcon;
    this.state |= expr;
    box.removeClass().addClass("chat-state-icon");

    if(this.state & Flag.chatState.ERROR){
      if(this.state & Flag.chatState.ERROR_DB){
        box.addClass("sprite-mark-error-db");
      }
      if(this.state & Flag.chatState.ERROR_SC){
        box.addClass("sprite-mark-error-sc");
      }
      return;
    }

    if(this.state & Flag.chatState.OK){
      if((this.state & (Flag.chatState.SAVED_DB | Flag.chatState.SAVED_SC)) === Flag.chatState.OK){
        box.addClass("sprite-mark-all-ok");
        return;
      }
      /*if(this.state & (Flag.chatState.SAVED_SC | Flag.chatState.SAVED_DB)){
          box.addClass("sprite-mark-sc-saved");
      }*/
    }
    if(this.state & Flag.chatState.PENDING){
      box.addClass("sprite-mark-pending");
    }
  }

  r._getChatTime = function(_time){
    _time = _time ? new Date(+_time * 1000) : new Date();
    var hours = _time.getHours();
    var minutes = _time.getMinutes();


    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return hours + ":" + minutes;
  }

  r._getCurrentChatID = function(){
    return +$(".box:not([data-id='cmd']):not(.typing)").last().attr("data-id") + 1;
  }

  r._parseLink = Message.parseLink = function(input, isHandy){
    isHandy = isHandy || false;
    var self = this;
    return Autolinker.link(input, {
      truncate: 40,
      replaceFn: function(autolinker, match){
        var url;

        if(isHandy){
          return true;
        }

        switch(match.getType()) {

          case 'url':
            url = match.getUrl();

            // Image.
            if(url.match(/\.(jpeg|jpg|gif|png)$/)){
              return "<a href='" + url + "' target='_blank'><img class='chat-img' src='" + url + "'></a>";
            }

            // Youtube.
            if(url.match(/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/)){
              //this.setFlag(flags.YOUTUBE_LINK);
              if(self instanceof Message) self._hasYoutubeLink = true;
              return "<a class='youtube-link' href='" + RegExp.$1 + "'><small></small><em></em></a>";
            }

            return true;

          case 'twitter':
            return false;
        }
      }
    });
  }

  r._convertYoutubeLinks = function(){
    var youtubeBox;

    //if(!this.isFlag(flags.YOUTUBE_LINK)) return;
    if(!this._hasYoutubeLink) return;

    youtubeBox = $(".box[data-id='" + this._id + "']");

    youtubeBox.find(".youtube-link").each(function(index, value){
      $.ajax({
        url: "../public/getYoutubeTitle/" + $(this).attr("href") + "/" + index
      }).done(function(val){
        val = JSON.parse(val);
        youtubeBox.find(".youtube-link:eq(" + val.index + ")").find("em").text(val.title);
      });
    });

    //this.removeFlag(flags.YOUTUBE_LINK);
  }

  r._parseAppCommand = Message.parseAppCommand = function(msg){
    msg = msg || this._message;
    var res = this._parseCommand(msg);
    if(!res || !res[1]) return false;
    var cmd = $.trim(res[1]);
    var param = $.trim(res[2] || null);
    this._executeAppCommand(cmd, param);
    return true;
  }

  r._executeAppCommand = Message.executeAppCommand = function(cmd, id){
    var desktop = Message.desktopRef;
    try {
      desktop.commands()[cmd].call(desktop, id);
    }
    catch(e) {
      throw "Couldn't parse command. False command?"
    }
  }

  r._parseCommand = Message.parseCommand = function(msg){
    msg = msg || this._message;
    var regex = /^app::(.*)\((.*)\)-?>?(.*)/i;
    //var regex = /^app::(.*)\((.*)\)/i;
    return regex.exec(msg);
  }

  r._displayButton = Message.displayButton = function(box){
    if(this instanceof Message && typeof box === "undefined"){
      box = this.$box.find("p");
    }
    else {
      box = $(box).find("p");
    }
    var msg = Message.parseCommand(box.text())
    if(!msg) return;
    var replace = $("<button class='app-button'>" + box.text() + "</button>");
    replace.attr({"data-cmd": msg[1], "data-id": msg[2]})
    if(msg[3]){
      replace.attr("data-title", msg[3]);
      replace.text(msg[1] + ": " + msg[3]);
    }
    box.replaceWith(replace);
  }

  return Message;
})();

module.exports = Message;