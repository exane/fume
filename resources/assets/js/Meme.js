var list = require("./meme_data.js");
var Config = require("./Config.js");


var Meme = (function(){
    var Meme = {}
    var r = Meme;

    r._replaceAll = function(find, replace, str){
        return str.replace(new RegExp(find, 'g'), replace);
    }
    r._compileMeme = function(text){
        var regex = /meme\((.+?)\,(.+?)\)/g;
        var img, times, res = text, tmp, arr = [];
        while((arr = regex.exec(text)) != null){
            img = arr[1];
            times = +arr[2];
            tmp = "";
            for(var i=0; i<times; i++){
                tmp += img;
            }
            res = res.replace(arr[0], tmp);
        }
        return res;
    }
    r.convert = function(text){
        var cfg = Config().get();
        text = this._compileMeme(text);
        for(var word in list) {
            text = this._replaceAll(word, "<div class='meme meme-"+ list[word] +"'></div>", text);
        }

        return text;
    }

    return Meme;
})();

module.exports = Meme;