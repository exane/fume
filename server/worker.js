var fs = require('fs');
var express = require('express');
var serveStatic = require('serve-static');
var Pusher = require("pusher"); //only for legacy support (handy)
var PusherClient = require("pusher-client");


var channel = {
    message: "fume/message",
    typing: "fume/typing",
    messageError: "fume/messageError"
}

module.exports.run = function(worker){
    console.log('   >> Worker PID:', process.pid);

    var app = require('express')();

    // Get a reference to our raw Node HTTP server
    var httpServer = worker.getHTTPServer();
    // Get a reference to our realtime SocketCluster server
    var scServer = worker.getSCServer();

    app.use(serveStatic(__dirname + '/public'));

    httpServer.on('req', app);

    var activeSessions = {};

    var pusher = new Pusher({
        appId: '49001',
        key: '46a076615faeaaaa5f96',
        secret: 'd36f7cd4e3b4fb67a5e7'
    });
    var pusherClient = new PusherClient("46a076615faeaaaa5f96");
    var pusherClientChannel = pusherClient.subscribe("nachrichten");

    pusherClientChannel.bind("nachrichten senden", function(data){
        if(!data.handy) return;
        //console.log("trigger: pusher", data);
        scServer.global.publish(channel.message, {
            user: data.benutzer,
            message: data.nachricht,
            time: data.zeit,
            handy: data.handy,
            id: "cmd"
        });
    });

    scServer.on('connection', function(socket){
        activeSessions[socket.session.id] = socket.session;
        console.log("new socket connection");

        socket.on(channel.message, function(data){
            console.log("message >> ", data);

            if(data._legacy !== false) return;

            socket.global.publish(channel.message, data);
            pusher.trigger("nachrichten", "nachrichten senden", {
                "benutzer": data.user,
                "nachricht": data.message,
                "zeit": data.time,
                "handy": data.handy
            });
        })

        socket.on(channel.typing, function(data){
            socket.global.publish(channel.typing, data);
        })

        socket.on(channel.messageError, function(data){
            console.log("messageError occured!");
        })

        socket.on("disconnect", function(){
            console.log("socket disconnected");
        })


    });

    scServer.on('sessionEnd', function(ssid){
        console.log("session end");
        delete activeSessions[ssid];
    });

};