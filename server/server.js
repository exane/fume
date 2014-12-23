var FumePush = require("./FumePushServer.js");

var fumePush = new FumePush(8000);

fumePush.bind("send", function(data){
    console.log("event called on server! room: " + data.room + " event: " + data.event + " data: ", data.data);
})

fumePush.bind("typing", function(data){
    console.log("event called on server! room: " + data.room + " event: " + data.event + " data: ", data.data);
})
/*
setInterval(function(){
    fumePush.trigger("typing", {
        user: "fitch"
    });
}, 200)


var id = 0;
setInterval(function(){
    fumePush.trigger("send", {
        user: "fitch",
        message: "yoyoy",
        time: "12:12",
        handy: false,
        id: id++
    });
}, 1000)*/



