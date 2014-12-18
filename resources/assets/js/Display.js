var cfg = require("./Config.js");
var $ = require("jquery");

var DisplayTyping = (function(){
    var DisplayTyping = function(){
        if(!(this instanceof DisplayTyping))
            return (new DisplayTyping());
        if(DisplayTyping._singleton) return DisplayTyping._singleton;
        DisplayTyping._singleton = this;

        this.$chat = $(".chats");

    };
    var r = DisplayTyping.prototype;
    DisplayTyping._singleton = null;

    r.$chat = null;
    r._id = null;
    r._timeoutInstance = null;
    r._displayduration = 4000;

    r.start = function(){
        if(this._timeoutInstance) return this.timeout();
        var box = $("<div class='box box-partner'><img></div>");

        box.find("img").attr("src", cfg().get().img_url + "gif.gif");

        box.addClass("typing");


        this.$chat.append(box);

        this.timeout();
    }
    r.end = function(){
        clearTimeout(this._timeoutInstance);
        this._timeoutInstance = null;
        this.$chat.find(".typing").remove();
    }

    r.timeout = function(){
        clearTimeout(this._timeoutInstance);
        this._timeoutInstance = setTimeout(function(){
            this._timeoutInstance = null;
            this.end();
        }.bind(this), this._displayduration);
    }

    return DisplayTyping;
})();

module.exports = DisplayTyping;