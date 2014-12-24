var $ = require("jquery");
var Config = require("./Config.js");
require("jquery.cookie");

var Sound = (function(){
    var Sound = function(){
        if(!(this instanceof Sound))
            return (new Sound());

        this.url = Config().get().sound_url;

        this.load = new Audio(this.getTrack());
        this.load.volume = this.getVolume();

    };
    var r = Sound.prototype;

    r.url = null;


    r.play = function(){
        this.load.play();
    }

    r.setVolume = function(val){
        this.load.volume = +val/100;
        $.cookie("fume_sound_volume", this.load.volume, {expires: 999999});
    }

    r.getVolume = function(){
        return $.cookie("fume_sound_volume") || 0.3;
    }

    r.setTrack = function(name){
        this.load = new Audio(this.url + name);
        this.load.volume = this.getVolume();
        $.cookie("fume_sound_track", name + ".wav", {expires: 999999});
    }

    r.getTrack = function(){
        return this.url + $.cookie("fume_sound_track") || this.url + "sound1.wav";
    }


    return Sound;
})();

module.exports = Sound;