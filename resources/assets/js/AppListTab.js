var FumeTab = require("./FumeTab");
var $ = require("jquery");


var AppListTab = (function(){
  var AppListTab = function(desktop){
    if(!(this instanceof AppListTab)){
      return (new AppListTab(desktop));
    }
    FumeTab.call(this, "App List", "appList");
    /**
     * constructor here
     */
    this._desktop = desktop;
    this._ref.addClass("fume-tab-applist")
    this._privateContentRef.addClass("fume-content-applist");


  };
  AppListTab.prototype = Object.create(FumeTab.prototype);
  var r = AppListTab.prototype;
  /**
   * methods && properties here
   * r.property = null;
   * r.getProperty = function() {...}
   */
  r._desktop = null;



  r.addContent = function() {
    this._contentRef.append(this._privateContentRef);
    $.ajax("../public/loadAllApps", {
      type: "post"
    })
    .done(function(res) {
      res = JSON.parse(res);
      this._renderList(res);
      this.loaded.resolve("content loaded!");
    }.bind(this));
  }

  r._renderList = function(res) {
    var self = this;
    this._privateContentRef.append($("<ul></ul>"));
    res.forEach(function(app) {
      self._appendApp(app);
    });
  }

  r._appendApp = function(app) {
    var res = $("<li></li>");
    this._privateContentRef.find("ul").append(res);
    res.html("<span>"+app.id+"</span><span>"+app.title+"</span>");
    res.addClass("fume-tab-content-app");
    res.attr({
      "data-id": app.id,
      "data-title": app.title
    })
    if(this._desktop._hasApp(app.id)) {
      res.addClass("fume-tab-content-has-app");
    }
  }


  return AppListTab;
})();

module.exports = AppListTab;