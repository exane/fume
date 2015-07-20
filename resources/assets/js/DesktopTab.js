var FumeTab = require("./FumeTab");
var $ = require("jquery");
var vex = require("./vex");
var msg = require("./Message");
vex.dialog = require("./vex.dialog");
var System = require("./SystemMessage");
var Behave = require("./behave");
var Helper = require("./Helper");


var DesktopTab = (function(){
  var DesktopTab = function(title, id){
    if(!(this instanceof DesktopTab)){
      return (new DesktopTab(title, id));
    }
    FumeTab.call(this, title, id, true);
    /**
     * constructor here
     */
    this._removeCloseButton();
    this.changeTabDesign();
    vex.defaultOptions.className = 'vex-theme-flat-attack';
    vex.defaultOptions.appendLocation = '.site-content';
    vex.defaultOptions.overlayClosesOnClick = false;
    vex.defaultOptions.escapeButtonCloses = false;
    msg.desktopRef = this;
    DesktopTab.ref = DesktopTab.ref || this;
  };
  DesktopTab.prototype = Object.create(FumeTab.prototype);
  var r = DesktopTab.prototype;
  /**
   * methods && properties here
   * r.property = null;
   * r.getProperty = function() {...}
   */
  r._createAppRef = null;
  r._editor = null;
  r._apps = [];
  DesktopTab.ref = null;

  r.changeTabDesign = function(){
    this._ref.empty().addClass("fume-tab-desktop");
    this._ref.append("<div class='sprite-home'></div>");
  }

  r.addContent = function(){
    this._contentRef.append(this._privateContentRef);

    $.ajax("../public/loadDesktop")
    .done(function(res){
      res = JSON.parse(res);
      this._addCreateButton();
      this._renderDesktop(res);
      this.loaded.resolve("content loaded!");
    }.bind(this));
  }

  r._renderDesktop = function(data){
    data.forEach(function(row){/*
      this._privateContentRef.append('<div class="tab-desktop-icon" data-title="' + row.title + '" data-id="' + row.id + '">' + row.title + '</div>');*/
      this._installApp(row.id, {
        title: row.title,
        readonly: true
      });
    }.bind(this));
  }

  r._addCreateButton = function(){
    var div = this._createAppRef = $('<div class="tab-desktop-icon tab-desktop-icon-more"></div>');
    this._privateContentRef.append(div);
    div.on("click", this._onCreateApp.bind(this));
  }

  r._removeCloseButton = function(){
    this._tabBtn.remove();
  }

  r._onCreateApp = function(e){
    var modal = this.openModal();
    this.startBehaveOn(modal);
    return modal;
  }

  r.startBehaveOn = function(modal){
    this._editor = new Behave({
      textarea: modal.find("textarea")[0]
    })
  }

  r.openModal = function(cb){
    var self = this;

    cb = cb || function(data){
      $.ajax("../public/saveAppAs", {
        type: "POST",
        data: {
          title: data.title,
          content: data.content
        }
      })
      .done(function(res){
        res = JSON.parse(res);
        self._installApp(res.id, res.title);
      });
    }

    return vex.dialog.open({
      message: 'Create App',
      input: '<input name="title" type="text" placeholder="Title">' +
      '<textarea name="content" placeholder="Content..."></textarea>',
      buttons: [
        $.extend({}, vex.dialog.buttons.YES, {
          text: 'Save'
        }), $.extend({}, vex.dialog.buttons.NO, {
          text: 'Abort'
        })
      ],
      callback: function(data){
        if(data === false) return;
        cb(data);
      }
    });

  }

  r.remove = function(){
    return 0;
  }

  /**
   *
   * @param {int|string} arg title or appid
   * @returns {$}
   */
  r.getAppShortcut = function(arg){
    var res = null;
    var type = typeof arg;
    this._apps.forEach(function(app){
      if((type === "number" || arg === parseInt(arg)) && app.appid === arg) return res = app.ref;
      if(type === "string" && app.title === arg) return res = app.ref;
    })
    return res;
  }

  r._installApp = function(id, opt){
    opt = opt || {};
    var title = opt.title || null;
    var readonly = opt.readonly || false;


    if(this._hasApp(id)){
      if(!readonly){
        System({message: "App already installed!"});
      }
      return;
    }
    var ref = $('<div class="tab-desktop-icon" data-id="' + id + '"></div>')
    if(readonly && title){
      ref.attr("data-title", title).text(Helper.truncate(title));
      this._createAppRef.before(ref);
      this._addApp(ref, id, title);

      return;
    }
    $.ajax("../public/installApp/" + id)
    .done(function(res){
      res = JSON.parse(res);
      title = title || res.title;
      ref.attr("data-title", title).text(Helper.truncate(title));
      this._createAppRef.before(ref);
      this._addApp(ref, id, title);

    }.bind(this));
  }

  r._addApp = function(ref, appid, title){
    this._apps.push({
      ref: ref,
      title: title,
      appid: Number(appid)
    });
  }

  r._hasApp = function(id){
    var res = false;
    this._privateContentRef.children().each(function(index, app){
      var _id = $(app).data().id;
      if(_id == id) return res = true;
    });
    return res;
  }

  r._removeApp = function(id, allUser){
    allUser = allUser || false;
    this._privateContentRef.children().each(function(index, app){
      app = $(app);
      if(app.data().id == id){
        app.remove();
        $.ajax("../public/removeApp/" + id + "/" + allUser);
        return;
      }
    });
  }

  r._deleteApp = function(appID) {
    this._removeApp(appID, true);
    $.ajax("../public/deleteApp/" + appID);
  }

  /**
   *
   * In-chat-syntax:
   * app::cmd(id)[->name]
   */
  r.commands = function(){
    return {
      add: this._installApp,
      share: this._installApp,
      remove: this._removeApp
    }
  }

  return DesktopTab;
})();

module.exports = DesktopTab;