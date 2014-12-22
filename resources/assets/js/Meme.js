var list = require("./meme_data.js");
var Config = require("./Config.js");


var Meme = (function(){
    var Meme = {}
    var r = Meme;

    r._replaceAll = function(find, replace, str){
        return str.replace(new RegExp(find, 'g'), replace);
    }
    r.convert = function(text){
        var cfg = Config().get();
        for(var word in list) {
            text = this._replaceAll(word, "<img class='meme-img' src='" + cfg["img_url"] + list[word] + "'>", text);
        }

        return text;
    }

    return Meme;
})();

module.exports = Meme;