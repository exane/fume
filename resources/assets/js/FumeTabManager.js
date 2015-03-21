var Tab = require("./FumeTab");
var Desktop = require("./DesktopTab");
var $ = require("jquery");


var FumeTabManager = (function(){
  var FumeTabManager = function(){
    if(!(this instanceof FumeTabManager))
      return (new FumeTabManager());

    this._tabs = [];
    this._ids = 0;
    this.initEvents();

    this._loadSavedApps();
  };
  var r = FumeTabManager.prototype;

  r._tabs = [];
  r._content = null;
  r._ids = null;

  r.add = function(title, contentID, isDesktop){
    isDesktop = isDesktop || false;
    var newTab = isDesktop ? Desktop(title, this._ids++) : Tab(title, this._ids++, isDesktop);

    this._tabs.push(newTab);
    this.setActive(newTab);
    newTab.getBtnRef().on("click", this.onTabBtnClick.bind(this, newTab));

    if(!isDesktop && Number(contentID) != contentID){ //youtube chat link
      newTab._appID = false;
  }
    else {
      newTab._appID = contentID;
    }
    newTab.addContent(contentID);

    if(isDesktop){
      this._desktop = newTab;
    }
    else {
      this._saveTab(contentID);
    }


    return newTab;
  }

  r._addStaticTab = function(title, content){

    var newTab = Tab(title, this._ids++);
    newTab._appID = false;

    return newTab;
  }

  r.remove = function(id){
    var self = this;
    this._tabs.forEach(function(t, index){
      if(t._id === id && !t.isDesktop()){
        self._tabs.splice(index, 1);
        if(t.active && self._tabs.length){
          self._tabs[0].active = true;
        }
        self._removeTab(t.getAppID());
        return t.remove();
      }
    })
  }

  /**
   *
   * @param {FumeTab | int} tab
   */
  r.setActive = function(tab){
    if(tab instanceof Tab){
      this._tabs.forEach(function(t){
        t.active = false;
      })
      tab.active = true;
    }
    if(Number(tab) === tab){
      this.setActive(this.getTabById(tab));
    }
  }

  r.initEvents = function(){
    $(".site-content")
    .on("mouseup", ".fume-tab", this.onTabClick.bind(this))
    .on("mouseup", ".tab-desktop-icon:not(.tab-desktop-icon-more)", this.onDesktopIconClick.bind(this));
  }

  r.onTabBtnClick = function(tab){
    this.remove(tab.getId());
  }

  r.onDesktopIconClick = function(e){
    var title = $(e.target).data().title;
    var id = $(e.target).data().id;

    if(e.which == 3){ //right click
      return;
    }

    if(e.which == 2){ //middle click
      var activeTab = this.getActiveTab()
      this.add(title, id).active = false;
      activeTab.active = true;
      return;
    }

    this.add(title, id);
  }

  r.onTabClick = function(e){
    var $target = $(e.target);
    var id = $(e.target).data().id;
    if(typeof id === "undefined"){
      id = $target.parent().data().id;
    }

    if(e.which == 3){ //right click
      return;
    }

    if(e.which == 2){ //middle click
      e.preventDefault();
      this.remove(id);
      return;
    }
    this.setActive(id);
  }

  r.getTabById = function(id){
    var res = null;
    this._tabs.forEach(function(t){
      if(t._id === id) return res = t;
    })
    return res;
  }

  r.getActiveTab = function(){
    var result = null;
    this._tabs.forEach(function(tab){
      if(tab.active) return result = tab;
    });
    return result;
  }

  r.getDesktop = function(){
    return this._desktop;
  }

  r.getTabByTitle = function(title){
    var res = false;
    this._tabs.forEach(function(tab){
      if(tab.getTitle() === title){
        return res = tab;
      }
    })
    return res;
  }

  /**
   *
   * @param {int|string} arg as appid/title
   * @returns {Array} tabs
   */
  r.getTabs = function(arg){
    var res = [];
    var type = typeof arg;
    this._tabs.forEach(function(tab){
      if(type === "number" && tab.getAppID() === arg) res.push(tab);
      if(type === "string" && tab.getTitle() === arg) res.push(tab);
    })
    return res;
  }

  r._loadSavedApps = function() {
    var self = this;
    $.ajax("../public/getSavedTabs", {
      type: "post"
    })
    .done(function(res) {
      res = JSON.parse(res);
      res.forEach(function(item) {
        self.add(null, item.app);
      });
    });
  }

  r._saveTab = function(appID) {
    $.ajax("../public/saveTab", {
      type: "post",
      data: {
        appID: appID
      }
    })
  }

  r._removeTab = function(appID) {
    $.ajax("../public/removeTab", {
      type: "post",
      data: {
        appID: appID
      }
    })
  }

  return FumeTabManager;
})();

module.exports = FumeTabManager;