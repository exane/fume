var Tab = require("./FumeTab");
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

    r._tabs = null;
    r._content = null;
    r._ids = null;

    r.add = function(title, content, isDesktop){
        isDesktop = isDesktop || false;
        var newTab = Tab(title, this._ids++);
        this._tabs.push(newTab);
        this.setActive(newTab);
        newTab.getBtnRef().on("click", this.onTabBtnClick.bind(this, newTab));
        newTab.addContent(content);
    }

    r.remove = function(id){
        var self = this;
        this._tabs.forEach(function(t, index){
            if(t._id === id) {
                self._tabs.splice(index, 1);
                if(t.active && self._tabs.length) {
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
        $(".site-content").on("mousedown", ".fume-tab", this.onTabClick.bind(this));
    }

    r.onTabBtnClick = function(tab){
        this.remove(tab.getId());
    }

    r.onTabClick = function(e){
        var id = $(e.target).data().id;
        if(e.which == 2) { //middle click
            e.preventDefault();
            this.remove(id);
            return;
        }
        this.setActive(id);
    }

    r.getTabById = function(id){
        var res = null;
        this._tabs.forEach(function(t){
            if(t._id === id) return res =  t;
        })
        return res;
    }

    return FumeTabManager;
})();

module.exports = FumeTabManager;