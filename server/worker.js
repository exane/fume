var fs = require('fs');
var express = require('express');
var serveStatic = require('serve-static');
var Pusher = require("pusher"); //only for legacy support (handy)
var PusherClient = require("pusher-client");

var channel = {
    message: "fume/message",
    typing: "fume/typing",
    messageError: "fume/messageError",
    userConnected: "fume/user/connection"
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

    if(!process.env.PUSHER){

        var pusher = new Pusher({
            appId: '49001',
            key: '46a076615faeaaaa5f96',
            secret: 'd36f7cd4e3b4fb67a5e7'
        });
        var pusherClient = new PusherClient("46a076615faeaaaa5f96");
        var pusherClientChannel = pusherClient.subscribe("nachrichten");

        pusherClientChannel.bind("nachrichten senden", function(data){
            if(!data.handy) return;
            scServer.global.publish(channel.message, {
                user: data.benutzer,
                message: data.nachricht,
                time: data.zeit,
                handy: data.handy,
                id: "cmd"
            });
        });

    }

    scServer.on('connection', function(socket){
        console.log("new socket connection");
        activeSessions[socket.session.id] = socket.session;
        var userName = null;

        socket.on(channel.message, function(data, res){
            console.log("message >> ", data);
            res.end('Success'); // Send back success

            if(data._legacy !== false) return;

            socket.global.publish(channel.message, data);

            if(!process.env.PUSHER){
                pusher.trigger("nachrichten", "nachrichten senden", {
                    "benutzer": data.user,
                    "nachricht": data.message,
                    "zeit": data.time,
                    "handy": data.handy
                });
            }
        })

        socket.on(channel.typing, function(data){
            socket.global.publish(channel.typing, data);
        })

        socket.on(channel.messageError, function(data){
            console.error("messageError occured!", data);
        })

        socket.on("disconnect", function(){
            console.log(userName + " disconnected");
        })

        socket.on(channel.userConnected, function(user, res){
            console.log(user + " connected");
            userName = user;
        })


    });

    scServer.on('sessionEnd', function(ssid){
        //console.log("session end");
        delete activeSessions[ssid];
    });

};