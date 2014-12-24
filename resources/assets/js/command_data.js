var commands = {
    "help": function(parent, _indentRow){
        var res = "";
        _indentRow = _indentRow || 1;
        for(var cmd in parent) {
            if(cmd === "help") continue;
            for(var i=0; i<_indentRow; i++){
                res += "\t";
            }
            res += cmd + "\n";
            if(typeof parent[cmd] == "object"){
                res += this["help"](parent[cmd], _indentRow+1);
            }
        }
        return res;
    },
    "sound": {
        "volume": function(val){
            var sound = Sound();
            sound.setVolume(val);
            sound.play();
        },
        "track": function(url){
            var sound = Sound();
            sound.setTrack(url);
        }
    },
    "chat": {
        "test": function(){},
        "test2": function(){}
    }
}