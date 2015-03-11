var $ = require("jquery");
var socketCluster = require("socketcluster-client");
var Config = require("./Config.js");
var DisplayTyping = require("./Display.js");
var Autolinker = require("autolinker");
var Meme = require("./Meme.js");
var Tab = require("./taboverride.js");
var Cmd = require("./Command.js");
var Sound = require("./Sound.js");
var imagesloaded = require("imagesloaded");
var Message = require("./Message.js");
var System = require("./SystemMessage");
var Scrollbar = require("./Scrollbar.js");
var Flag = require("./Flags.js");
var FumeTab = require("./FumeTabManager");


var Chat = (function(){
  var Chat = function(){
    if(!(this instanceof Chat))
      return (new Chat());

    if(Chat._singleton) return Chat._singleton;
    Chat._singleton = this;
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
  r.channelMessage = null;
  r.channelTyping = null;
  r.channelMessageError = null;

  r._started = false;
  r._lastMessageReceived = null; //unix-timestamp

  r.tabs = null;


  r.$chat = null;

  r.setUrl = function(url){
    this._url = url;
  }

  r.getUrl = function(){
    return this._url || "http://127.0.0.1/";
  }

  r.init = function(){
    this.setUrl(Config().getCfg().url);
    /* this.initChatFlag();*/
    this.setChatFocus();
    this.handleYoutubeLinksClick();
    this.$chat = $(".chats");

    this.setUserName($('.chatbox').attr('data-cookie'));

    this.tabs = FumeTab();
    this.tabs.add("Desktop", "../public/loadDesktop/", true);
    this.tabs.setActive(0);

    $(".chatbox").on("keydown", this.onKeypress.bind(this));

    this._lastMessageReceived = (Date.now() / 1000) | 0;

    Tab.tabSize(this._tabsize);
    Tab.set(document.querySelector(".chatbox"));

    this.$chat.on("scroll", this.onScroll.bind(this));

    this.onStart();
  }

  r.start = function(){
    $.when(Config().load(), Config().loadMeme())
    .then(this.init.bind(this))
    .then(this.initSockets.bind(this))
    .then(this.bindChannel.bind(this));
  }

  r.initSockets = function(){
    var cfg = Config().getCfg();
    this.socket = socketCluster.connect(Flag.socketOptions); //new FumePush(cfg["url_origin"], 8000);

    this.channelMessage = this.socket.subscribe(Flag.channel.message);
    this.channelTyping = this.socket.subscribe(Flag.channel.typing);
    this.channelMessageError = this.socket.subscribe(Flag.channel.messageError);

    //this.setUserName(cfg["username"]);

    /*var intVal = setInterval(function(){
        if(!this.socket.connected) return;
        this.socket.emit(Flag.channel.userConnected, this.getUserName());
        clearInterval(intVal);
    }.bind(this),100);*/

  }

  r.onStart = function(){
    var chat = document.querySelector(".chats");
    chat.innerHTML = Message.parseLink(chat.innerHTML);
    this.convertAllYoutubeLinks();
    imagesloaded(document.querySelectorAll(".chats"), this.onLoad.bind(this));
  }

  r.onLoad = function(){
    this.hideSplashScreen();
    //this.scrollDown(true);
    Scrollbar.scrollDown(true);
  }

  r.onScroll = function(){
    if(Scrollbar.isOnBottom()){
      //this.removeFlag(flags.SCROLLING);
      Scrollbar.isScrolling = false;
      return;
    }
    //this.setFlag(flags.SCROLLING);
    Scrollbar.isScrolling = true;
  }

  r.onKeypress = function(e){
    /*if(e.which == keyCode.tab){
        e.preventDefault();
        this.addTab();
    }*/
    if(e.which === Flag.keyCode["f5"]) return; //to prevent user calls "typing" when he only refresh his page

    //to prevent overhead it fires only every 3 seconds an "typing" event
    if((this._typingTimeFlag + 3000) < Date.now()){
      this._typingTimeFlag = Date.now();

      this.socket.emit(Flag.channel.typing, {
        user: this.getUserName()
      })
    }

    if(e.which != Flag.keyCode.enter || e.shiftKey) return;
    this.sendMessage();
    return false;
  }

  r.setUserName = function(name){
    this._userName = name || this._userName;
  }

  r.getUserName = function(){
    return this._userName || "Smitty Werben Jagger Man Jensen";
  }

  r.sendMessage = function(){
    var raw = $(".chatbox").val();
    //var id = this.getCurrentChatID();
    //var time = this.getChatTime();
    var handy = this.isHandy();
    var res, msg;
    var self = this;

    if(!$.trim(raw)){
      this.empty();
      return;
    }

    if(res = Cmd.compile(raw)){
      this.empty();
      //this.addMessage("cmd", res, time, false, "cmd");
      Message({user: "cmd", message: res, id: "cmd"})
      return;
    }

    raw = Meme.compile(raw);
    //this.addMessage(this.getUserName(), raw, time, handy, id);
    msg = Message({user: this.getUserName(), message: raw});

    //this.setChatState(chatState.PENDING, id);
    msg.setState(Flag.chatState.PENDING);

    this.empty();
    this._typingTimeFlag = 0;
    this._lastSendId = msg.get().id;
    /*
    msg.message = raw;*/
    msg._legacy = false;

    this.socket.emit(Flag.channel.message, msg.get(), function(err){
      if(err){
        //self.setChatState(chatState.ERROR_SC, msg.id);
        msg.setState(Flag.chatState.ERROR_SC);
        throw err;
      }
      //self.setChatState(chatState.SAVED_SC, msg.id);
      msg.setState(Flag.chatState.SAVED_SC);
    });

    this.createDBEntry(msg);
  }

  r.bindChannel = function(){
    var self = this;

    this.socket.watch(Flag.channel.message, this.chatChannelCallback.bind(this));
    this.socket.on(Flag.channel.message, this.chatChannelCallback.bind(this));

    this.socket.watch(Flag.channel.typing, this.userTypesChannelCallback.bind(this));
    this.socket.watch(Flag.channel.messageError, this.messageErrorCallback.bind(this));

    this.socket.on("disconnect", function(){
      //self.addMessage("system", "System >> Disconnected", false, "cmd");
      System({user: "System", message: "System >> Disconnected", id: "cmd"});
    })

    this.socket.on("connect", function(){
      self.socket.emit(Flag.channel.userConnected, self.getUserName());
      if(!self._started){
        self._started = true;
        return;
      }
      //self.addMessage("system", "System >> Connected", self.getChatTime(), false, "cmd");
      System({user: "System", message: "System >> Connected", id: "cmd"});
      self.missedMessages();
    })
  }

  r.missedMessages = function(){
    var self = this;
    $.ajax({
      url: "../public/loadMissedMessages/" + this._lastMessageReceived + "/" + this.getUserName()
    })
    .done(function(data){
      data = JSON.parse(data);
      if(data[0].ids == 0) return;
      //self.addMessage("System", "System >> "+data[0].ids + " missed Messages!", self.getChatTime(), false, "cmd");
      System({user: "System", message: "System >> " + data[0].ids + " missed Messages!", id: "cmd"});
    })
    .fail(function(err, status, jqXHR){
      if(err){
        //self.addMessage("System", "Error >> Couldn't connect to Server! (php/ajax request)", self.getChatTime(), false, "cmd");
        System({
          user: "System",
          message: "Error >> Couldn't connect to Server! (php/ajax request) " + status,
          id: "cmd"
        });
        console.error(err, status, jqXHR);
        throw err;
      }
    });
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
    var isHandy = data.handy || false;
    var message = data.message;
    var time = data.time;
    var id = data.id;

    this._lastMessageReceived = (Date.now() / 1000) | 0;

    if(id === this._lastSendId){
      //this.setChatState(chatState.saved, id);
      return;
    }
    //if(userName === this.getUserName() && !isHandy) return;

    //this.addMessage(userName, message, time, isHandy, id);
    Message({user: userName, message: message, time: time, handy: isHandy, id: id})
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

    //this.scrollDown();
    Scrollbar.scrollDown();
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

  r.createDBEntry = function(message, id){
    var self = this;
    var text = message.get();
    var msg = message;
    $.ajax({
      url: "../public/createDBEntry",
      type: "post",
      cache: false,
      data: {
        handy: text.handy,
        message: text.message,
        user: this.getUserName()
      }
    })
    .done(function(val){
      //self.setChatState(chatState.SAVED_DB, id);
      //console.log(msg);
      msg.setState(Flag.chatState.SAVED_DB);
      //msg.setState(Flag.chatState.ERROR_DB);
    })
    .fail(function(err){
      //self.addMessage("System", "Error >> DB save error! Couldn't connect to Server! (php/ajax request)", self.getChatTime(), false, "cmd");
      System({
        user: "System",
        message: "Error >> DB save error! Couldn't connect to Server! (php/ajax request)",
        id: "cmd"
      })
      self.socket.emit(Flag.channel.messageError, {
        err: err
      });
      //self.setChatState(chatState.ERROR_DB, id);
      msg.setState(Flag.chatState.ERROR_DB);
    });
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
    var self = this;
    $(document).on("click", ".youtube-link", function(e){
      var id = $(this).attr("href");

      if(e.metaKey){
        window.open("//www.youtube.com/watch?v=" + id);
      }
      else {
        //$(".youtube-wrap").html("<iframe width='560' height='315' src='//www.youtube.com/embed/" + id + "?rel=0&autoplay=1' frameborder='0' allowfullscreen></iframe>")
        var title = $(this).find("em").text();
        var content = "<iframe width='560' height='315' src='//www.youtube.com/embed/" + id + "?rel=0&autoplay=1' frameborder='0' allowfullscreen></iframe>";
        self.tabs.add(title, content);
      }

      return false;
    });
  }

  r.convertAllYoutubeLinks = function(){
    var youtubeBox;

    youtubeBox = $(".box");

    youtubeBox.find(".youtube-link").each(function(index, value){
      $.ajax({
        url: "../public/getYoutubeTitle/" + $(this).attr("href") + "/" + index
      })
      .done(function(val){
        val = JSON.parse(val);
        $(this).find("em").text(val.title);
      }.bind(this));
    });

  }

  r.empty = function(){
    $(".chatbox").val("");
  }

  r.hideSplashScreen = function(){
    $(".splashscreen").hide();
    $(".chat-wrap").show();
  }

  return Chat;
})();

module.exports = Chat;