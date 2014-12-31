
var $ = require("jquery");


var Config = (function(){
    var Config = function(){
        if(!(this instanceof Config))
            return (new Config(arguments));
        if(Config._singleton) return Config._singleton;
        Config._singleton = this;

    };
    var r = Config.prototype;
    Config._singleton = null;

    r._cache = null;
    r._memeCache = null;

    r.getCfg = function(){
        return this._cache;
    }

    r.getMeme = function(){
        return this._memeCache;
    }

    r.load = function(){
        var deferred = new $.Deferred();
        var self = this;


        $.ajax({
            url: "../public/loadConfig",
            data: "loadConfig",
            success: function(data){
                self._cache = JSON.parse(data);
                deferred.resolve("loaded");
            },
            error: function(jqXHR, status, err){
                deferred.reject("error loading config data!");
            }
        });

        return deferred.promise();
    }

    r.loadMeme = function(){
        var deferred_meme = new $.Deferred();
        var self = this;

        $.ajax({
            url: "../public/loadMeme",
            data: "loadMeme",
            success: function(data){
                self._memeCache = JSON.parse(data);
                deferred_meme.resolve("loaded");
            },
            error: function(jqXHR, status, err){
                deferred_meme.reject("error loading meme data!");
            }
        });
        return deferred_meme.promise();
    }

    return Config;
})();

module.exports = Config;