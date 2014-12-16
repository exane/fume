
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

    r.get = function(){
        return this._cache;
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

    return Config;
})();

module.exports = Config;