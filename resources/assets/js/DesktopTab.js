var FumeTab = require("./FumeTab");
var $ = require("jquery");
var vex = require("./vex");
vex.dialog = require("./vex.dialog");


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
  };
  DesktopTab.prototype = Object.create(FumeTab.prototype);
  var r = DesktopTab.prototype;
  /**
   * methods && properties here
   * r.property = null;
   * r.getProperty = function() {...}
   */
  r._createAppRef = null;

  r.changeTabDesign = function(){
    this._ref.empty().addClass("fume-tab-desktop");
    this._ref.append("<div class='sprite-home'></div>");
  }

  r.addContent = function(){
    this._contentRef.append(this._privateContentRef);

    $.ajax("../public/loadDesktop")
    .done(function(res){
      res = JSON.parse(res);
      this._renderDesktop(res);
      this._addCreateButton();
    }.bind(this));
  }

  r._renderDesktop = function(data){
    data.forEach(function(row){
      this._privateContentRef.append('<div class="tab-desktop-icon" data-title="' + row.title + '" data-id="' + row.id + '">' + row.title + '</div>');
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
      callback: function(data) {
        if (data === false) {
          return;
        }
        $.ajax("../public/saveAppAs", {
          type: "POST",
          data: {
            title: data.title,
            code: data.code
          }
        })
        .done(function(res) {

        });
      }
    });
  }

  r.remove = function(){
    return 0;
  }

  return DesktopTab;
})();

module.exports = DesktopTab;