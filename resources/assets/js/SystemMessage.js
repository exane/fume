var Message = require("./Message");
var Scrollbar = require("./Scrollbar.js");
var $ = require("jquery");

var SystemMessage = (function(){
  var SystemMessage = function(opt){
    if(!(this instanceof SystemMessage)){
      return (new SystemMessage(opt));
    }
    Message.call(this, opt);
    /**
     * constructor here
     */


  };
  SystemMessage.prototype = Object.create(Message.prototype);
  var r = SystemMessage.prototype;
  /**
   * methods && properties here
   * r.property = null;
   * r.getProperty = function() {...}
   */

  r.addMessage = function(){
    var box = this.$box = $("<div data-id='" + this._id + "' class='box'><p></p></div>")

    box.addClass("box-system");

    box.find("p").append(this._time + ": " + this._message);
    box.find("span").append(this._time);

    this.$chat.find('.typing').before(box);

    Scrollbar.scrollDown();
  }


  return SystemMessage;
})();

module.exports = SystemMessage;