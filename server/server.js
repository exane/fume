var FumePush = require("./FumePushServer.js");

var fumePush = new FumePush(8000);

fumePush.bind("send", function(data){
    console.log("event called on server! room: " + data.room + " event: " + data.event + " data: ", data.data);
})

fumePush.bind("typing", function(data){
    console.log("event called on server! room: " + data.room + " event: " + data.event + " data: ", data.data);
})
