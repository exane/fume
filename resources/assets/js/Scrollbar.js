var $ = require("jquery");

var Scrollbar = (function(){
    var Scrollbar = {}
    var r = Scrollbar;

    r.isScrolling = false;

    r.$chat = $(".chats");

    r.isOnBottom = function(){
        var padding = parseInt(this.$chat.css("padding-top"));
        var isDown = (this.$chat.prop("scrollHeight") - this.$chat.height() - padding) <= this.$chat.scrollTop();
        return isDown;
    }

    r.scrollDown = function(force){
        force = force || false;
        if(!force && this.isScrolling){
            return;
        }
        this.$chat.scrollTop(this.$chat.prop("scrollHeight"));

        if(!this.isOnBottom()){
            this.scrollDown(true);
        }
    }

    return Scrollbar;
})();

module.exports = Scrollbar;