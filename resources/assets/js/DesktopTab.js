var FumeTab = require("./FumeTab");
var $ = require("jquery");
var vex = require("./vex");
var msg = require("./Message");
vex.dialog = require("./vex.dialog");
var System = require("./SystemMessage");


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
    var self = this;
    vex.dialog.open({
      message: 'Create App',
      input: '<input name="title" type="text" placeholder="Title">' +
      '<textarea name="code" placeholder="Content..."></textarea>',
      buttons: [
        $.extend({}, vex.dialog.buttons.YES, {
          text: 'Save'
        }), $.extend({}, vex.dialog.buttons.NO, {
          text: 'Abort'
        })
      ],
      callback: function(data){
        if(data === false){
          return;
        }
        $.ajax("../public/saveAppAs", {
          type: "POST",
          data: {
            title: data.title,
            code: data.code
          }
        })
        .done(function(res){
          res = JSON.parse(res);
          self._installApp(res.id, res.title);
        });
      }
    });
  }

  r.remove = function(){
    return 0;
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

    if(readonly && title){
      this._createAppRef.before('<div class="tab-desktop-icon" data-title="' + title + '" data-id="' + id + '">' + title + '</div>');
      return;
    }
    $.ajax("../public/installApp/" + id)
    .done(function(res){
      res = JSON.parse(res);
      title = title || res.title;
      this._createAppRef.before('<div class="tab-desktop-icon" data-title="' + title + '" data-id="' + id + '">' + title + '</div>');
    }.bind(this));
  }

  r._hasApp = function(id){
    var res = false;
    this._privateContentRef.children().each(function(index, app){
      var _id = $(app).data().id;
      if(_id == id) return res = true;
    });
    return res;
  }

  r._removeApp = function(id){
    this._privateContentRef.children().each(function(index, app) {
      app = $(app);
      if(app.data().id == id) {
        app.remove();
        $.ajax("../public/removeApp/" + id);
        return;
      }
    });
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