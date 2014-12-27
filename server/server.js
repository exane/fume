var FumePush = require("./FumePushServer.js");
var Pusher = require("pusher"); //only for legacy support (handy)
var PusherClient = require("pusher-client");

var pusher = new Pusher({
    appId: '49001',
    key: '46a076615faeaaaa5f96',
    secret: 'd36f7cd4e3b4fb67a5e7'
});
var pusherClient = new PusherClient("46a076615faeaaaa5f96");
pusherClientChannel = pusherClient.subscribe("nachrichten");

var fumePush = new FumePush(8000);

fumePush.bind("send", function(data){
    if(typeof data.data._legacy === "undefined") return;
    console.log("event called on server! room: " + data.room + " event: " + data.event + " data: ", data.data);
    pusher.trigger("nachrichten", "nachrichten senden", {
        "benutzer": data.data.user,
        "nachricht": data.data.message,
        "zeit": data.data.time,
        "handy": data.data.handy
    });
})

fumePush.bind("typing", function(data){
    //console.log("event called on server! room: " + data.room + " event: " + data.event + " data: ", data.data);
})

pusherClientChannel.bind("nachrichten senden", function(data){
    if(!data.handy) return;
    console.log("trigger: pusher", data);
    fumePush.trigger("send", {
        user: data.benutzer,
        message: data.nachricht,
        time: data.zeit,
        handy: data.handy,
        id: "cmd"
    }, "chat");
});