var Flags = (function(){
    var Flags = {}
    var r = Flags;
    
    r.keyCode = {
        "enter": 13,
        "shift": 16,
        "tab": 9,
        "f5": 116
    }

    r.channel = {
        message: "fume/message",
        typing: "fume/typing",
        messageError: "fume/messageError",
        userConnected: "fume/user/connection"
    }

    r.chatState = {
        PENDING: 0x1,
        SAVED_DB: 0x2, //database
        SAVED_SC: 0x4, //socketcluster
        ERROR_DB: 0x8,
        ERROR_SC: 0x10,
        OK: 0x6, //0110
        ERROR: 0x18 // 0001|1000
    }

    r.socketOptions = {
        port: 8000
    }


    return Flags;
})();

module.exports = Flags;