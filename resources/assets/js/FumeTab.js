var $ = require("jquery");


var FumeTab = (function(){
    var FumeTab = function(title, id){
        if(!(this instanceof FumeTab))
            return (new FumeTab(title, id));

        root = this;

        this._wrapper = $(".site-content");
        this._id = id;
        this._contentRef = $(".fume-tab-content");
        this._privateContentRef = $("<div class='fume-tab-content-private'></div>");

        this.add(title);
        this.active = false;

    };
    var r = FumeTab.prototype;
    var root = null;

    r._wrapper = null;
    r._ref = null;
    r._contentRef = null;
    r._privateContentRef = null;
    r._id = null;
    r._active = null;

    r.active = null;
    Object.defineProperty(r, "active", {
        get: function(){
            return this._active || false;
        },
        set: function(val){
            this._active = !!val;
            if(this._active) {
                this._ref.addClass("fume-tab-active");
                this._privateContentRef.addClass("fume-tab-content-active");
            }
            else {
                this._ref.removeClass("fume-tab-active");
                this._privateContentRef.removeClass("fume-tab-content-active");
            }

        }
    })



    r.add = function(title){
        title = title || "unnamed";
        this._ref = $("<div class='fume-tab'>" + title + "</div>");
        this._ref.attr("data-id", this._id);
        //this._wrapper.append(this._ref);
        this._ref.insertBefore(this._contentRef);
        this._privateContentRef.attr("data-id", this._id);
        //this.addContent();


    }

    r.remove = function(){
        this._ref.remove();
        this._privateContentRef.remove();
    }

    r.addContent = function(content){
        this._contentRef.append(this._privateContentRef);
        this._privateContentRef.html(content);
    }


    return FumeTab;
})();

module.exports = FumeTab;