var FumePush = require("./FumePushServer.js");

var fumePush = new FumePush(8000);

fumePush.bind("send", function(data){
    console.log("event called on server! room: " + data.room + " event: " + data.event + " data: ", data.data);
})

fumePush.bind("typing", function(data){
    console.log("event called on server! room: " + data.room + " event: " + data.event + " data: ", data.data);
})

setInterval(function(){
    fumePush.trigger("send", {
        user: "fitch",
        time: "08:15",
        handy: true,
        message: "test yo"
    });
},1000);