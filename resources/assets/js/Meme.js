//var list = require("./meme_data.js");
var Config = require("./Config.js");
var fs = require("fs");
var ini = require("ini");
var list = ini.parse(fs.readFileSync(__dirname + "/../data/memes.ini", "utf-8"));



var Meme = (function(){
    var Meme = {}
    var r = Meme;

    r._replaceAll = function(find, replace, str){
        return str.replace(new RegExp(find, 'g'), replace);
    }
    r.compile = function(text){
        var regex = /meme\((.+?)\,(.+?)\)/g;
        var img, times, res = text, tmp, arr = [];
        while((arr = regex.exec(text)) != null) {
            img = arr[1];
            times = +arr[2];
            tmp = "";
            for(var i = 0; i < times; i++) {
                tmp += img;
            }
            res = res.replace(arr[0], tmp);
        }
        return res;
    }
    r.display = function(text){
        var cfg = Config().get();
        text = this.compile(text);
        for(var word in list) {
            text = this._replaceAll(list[word], "<div class='meme meme-" + word + "'></div>", text);
        }

        return text;
    }

    return Meme;
})();

module.exports = Meme;