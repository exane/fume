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
    newTab.addContent(contentID);

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

  return FumeTabManager;
})();

module.exports = FumeTabManager;