var Sound = require("./Sound.js");
var command = require("./command_data.js");


var Command = (function(){
    var Command = {};
    var r = Command;

    r.compile = function(text){
        var regex = /!(\S+)\s+(\S+)\s*(\S*)/g;
        var arr = [];
        var cmd, prop, val;
        var res;

        if(res = this._help(text)){
            return res;
        }
        arr = regex.exec(text);

        if(!arr) return false;

        cmd = arr[1];
        prop = arr[2];
        val = arr[3];

        if(!(res = this._run(cmd, prop, val))){
            return "~Syntax Error: " + " " + cmd + " " + prop + " " + val;
        }
        return res;
    }

    r._help = function(text){
        var regex = /!(help)/g;
        var arr = [];

        if(!(arr = regex.exec(text))){
            return false;
        }
        if(arr[1] === "help"){
            return this._run("help");
        }
        return false;
    }

    r._run = function(cmd, prop, val){
        var res;
        prop = prop || "";
        val = val || "";

        try {
            if(prop === "" && val === ""){
                return "~help \n\tie.: sound volume 30 \n\n" + commands[cmd](commands);
            }
            res = commands[cmd][prop](val) || true;
        }
        catch(e) {
            return false;
        }
        return res === true ? "~Execute: " + " " + cmd + " " + prop + " " + val : res;
    }

    return Command;
})();

module.exports = Command;