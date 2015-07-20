var $ = require("jquery");
var Helper = require("./Helper");


var FumeTab = (function(){
  var FumeTab = function(title, id, desktop){
    if(!(this instanceof FumeTab))
      return (new FumeTab(title, id, desktop));

    root = this;
    desktop = desktop || false;

    this._wrapper = $(".fume-tabs");
    this._id = id;
    this._contentRef = $(".fume-tab-content");
    this._privateContentRef = $("<div class='fume-tab-content-private'></div>");
    this.loaded = $.Deferred();
    this.add(title, desktop);
    this.active = false;
  };
  var r = FumeTab.prototype;
  var root = null;

  r._wrapper = null;
  r._ref = null; //tab
  r._tabBtn = null;
  r._contentRef = null;
  r._privateContentRef = null; //content
  r._id = null;
  r._active = null;
  r._isDesktop = null;
  r._title = null;
  r._appID = null;

  r.active = null;
  r.loaded = null;

  Object.defineProperty(r, "active", {
    get: function(){
      return this._active || false;
    },
    set: function(val){
      this._active = !!val;
      if(this._active){
        this._ref.addClass("fume-tab-active");
        this._privateContentRef.addClass("fume-tab-content-active");
      }
      else {
        this._ref.removeClass("fume-tab-active");
        this._privateContentRef.removeClass("fume-tab-content-active");
      }

    }
  })

  r.add = function(title, isDesktop){
    title = title || "unnamed";
    this._title = title;
    this._isDesktop = isDesktop || false;
    this._ref = $("<div class='fume-tab unselectable'><span>" + this.getTitleTruncated() + "</span></div>");
    this._ref.attr("data-id", this._id);
    this._ref.attr("data-title", this._title);
    this._tabBtn = $("<div class='fume-tab-btn'><div class='sprite-message_error'></div></div> ");
    this._ref.append(this._tabBtn);

    this._wrapper.append(this._ref);
    //this._ref.insertBefore(this._contentRef);
    this._privateContentRef.attr("data-id", this._id);
  }

  r.remove = function(){
    this._ref.remove();
    this._privateContentRef.remove();
  }

  r.addContent = function(contentID){
    contentID = contentID || null
    this._ref.addClass("fume-tab-app");

    this._contentRef.append(this._privateContentRef);

    if(Number(contentID) != contentID){ //youtube chat link
      return this.setContent(contentID);
    }

    $.ajax("../public/loadDesktopApp/" + contentID)
    .done(function(res){
      res = JSON.parse(res);
      this.setContent(res.content);
      this.loaded.resolve("content loaded!");
      if(this.getTitle() === "unnamed"){
        this.setTitle(res.title, true);
      }
    }.bind(this));
  }

  r.getContent = function(){
    return this._privateContentRef.html();
  }

  r.setContent = function(content){
    this._privateContentRef.html(content);
  }

  r.getBtnRef = function(){
    return this._tabBtn;
  }

  r.getId = function(){
    return Number(this._id);
  }

  r.getTitle = function(){
    return this._title;
  }

  r.getTitleTruncated = function(){
    return Helper.truncate(this.getTitle(), 14);
  }

  r.setTitle = function(title, truncated){
    this._title = title;
    this._ref.find("span").text(truncated ? this.getTitleTruncated() : this.getTitle());
    this._ref.data().title = this.getTitle();
  }

  r.getAppID = function(){
    return this._appID;
  }

  r.isDesktop = function(){
    return this._isDesktop;
  }

  return FumeTab;
})();

module.exports = FumeTab;