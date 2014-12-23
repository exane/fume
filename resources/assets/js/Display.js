var cfg = require("./Config.js");
var $ = require("jquery");

var DisplayTyping = (function(){
    var DisplayTyping = function(){
        if(!(this instanceof DisplayTyping))
            return (new DisplayTyping());
        if(DisplayTyping._singleton) return DisplayTyping._singleton;
        DisplayTyping._singleton = this;

        this.$chat = $(".chats");
        this._originTitle = document.title;

    };
    var r = DisplayTyping.prototype;
    DisplayTyping._singleton = null;

    r.$chat = null;
    r._id = null;
    r._timeoutInstance = null;
    r._displayduration = 4000;
    r._originTitle = null;
    r._title = null;
    r._messageCounter = 0;
    r.isWindowActive = true;

    r.start = function(){
        if(this._timeoutInstance) return this._timeout();
        var box = $("<div class='box box-partner'><img></div>");

        box.find("img").attr("src", cfg().get().img_url + "gif.gif");

        box.addClass("typing");

        this.$chat.append(box);

        this._setTitle("... " + this._originTitle);
        this.updateTitle();

        this._timeout();
    }
    r.end = function(){
        clearTimeout(this._timeoutInstance);
        this._timeoutInstance = null;
        this.$chat.find(".typing").remove();
        this._setTitle(this._originTitle);
        this.updateTitle();
    }


    r._setTitle = function(string){
        this._title = string;
    }

    r._timeout = function(){
        clearTimeout(this._timeoutInstance);
        this._timeoutInstance = setTimeout(function(){
            this._timeoutInstance = null;
            this.end();
        }.bind(this), this._displayduration);
    }

    r.increaseMessageCounter = function(){
        if(!this.isWindowActive) this._messageCounter++;
        return this;
    }

    r.resetMessageCounter = function(){
        this._messageCounter = 0;
        return this;
    }

    r.updateTitle = function(){
        if(!this._messageCounter || this.isWindowActive){
            document.title = this._title || this._originTitle;
            return this;
        }
        document.title = "(" + this._messageCounter + ") "+ this._title;
        return this;
    }

    return DisplayTyping;
})();

module.exports = DisplayTyping;