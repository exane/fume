var Helper = (function(){
  var Helper = {};
  var r = Helper;
  /**
   * methods && properties here
   * r.property = null;
   * r.getProperty = function() {...}
   */

  r.truncate = function(string, length){
    var res = string;
    length = length || 15;

    res = res.substring(0, length);
    if(res.length < string.length){
      res += "...";
    }
    return res;
  }


  return Helper;
})();

module.exports = Helper;