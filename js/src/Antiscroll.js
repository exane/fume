var $ = require("jquery");

var Antiscroll = (function(){

    $.fn.antiscroll = function(options){
        return this.each(function(){
            if($(this).data('antiscroll')){
                $(this).data('antiscroll').destroy();
            }

            $(this).data('antiscroll', new $.Antiscroll(this, options));
        });
    };

    /**
     * Expose constructor.
     */

    $.Antiscroll = Antiscroll;


    /**
     * Antiscroll pane constructor.
     *
     * @param {Element|jQuery} main pane
     * @parma {Object} options
     * @api public
     */

    var Antiscroll = function (el, opts){
        this.el = $(el);
        this.options = opts || {};

        this.x = (false !== this.options.x) || this.options.forceHorizontal;
        this.y = (false !== this.options.y) || this.options.forceVertical;
        this.autoHide = false !== this.options.autoHide;
        this.padding = undefined == this.options.padding ? 2 : this.options.padding;

        this.inner = this.el.find('.antiscroll-inner');
        this.inner.css({
            'width': '+=' + (this.y ? scrollbarSize() : 0), 'height': '+=' + (this.x ? scrollbarSize() : 0)
        });

        this.refresh();
    };

    /**
     * refresh scrollbars
     *
     * @api public
     */

    Antiscroll.prototype.refresh = function(){
        var needHScroll = this.inner.get(0).scrollWidth > this.el.width() + (this.y ? scrollbarSize() : 0),
        needVScroll = this.inner.get(0).scrollHeight > this.el.height() + (this.x ? scrollbarSize() : 0);

        if(this.x){
            if(!this.horizontal && needHScroll){
                this.horizontal = new Scrollbar.Horizontal(this);
            }
            else if(this.horizontal && !needHScroll){
                this.horizontal.destroy();
                this.horizontal = null;
            }
            else if(this.horizontal){
                this.horizontal.update();
            }
        }

        if(this.y){
            if(!this.vertical && needVScroll){
                this.vertical = new Scrollbar.Vertical(this);
            }
            else if(this.vertical && !needVScroll){
                this.vertical.destroy();
                this.vertical = null;
            }
            else if(this.vertical){
                this.vertical.update();
            }
        }
    };

    /**
     * Cleans up.
     *
     * @return {Antiscroll} for chaining
     * @api public
     */

    Antiscroll.prototype.destroy = function(){
        if(this.horizontal){
            this.horizontal.destroy();
            this.horizontal = null
        }
        if(this.vertical){
            this.vertical.destroy();
            this.vertical = null
        }
        return this;
    };

    /**
     * Rebuild Antiscroll.
     *
     * @return {Antiscroll} for chaining
     * @api public
     */

    Antiscroll.prototype.rebuild = function(){
        this.destroy();
        this.inner.attr('style', '');
        Antiscroll.call(this, this.el, this.options);
        return this;
    };

    return Antiscroll;
})();

module.exports = Antiscroll;
