var argv = require('minimist')(process.argv.slice(2));
var SocketCluster = require('socketcluster').SocketCluster;

process.env.PUSHER = typeof argv.pusher === "undefined" ? true : argv.pusher;


var socketCluster = new SocketCluster({
    balancers: Number(argv.b) || 1,
    workers: Number(argv.w) || 1,
    stores: Number(argv.s) || 1,
    port: Number(argv.p) || 8000,
    appName: argv.n || 'fume',
    workerController: __dirname + '/worker.js',
    balancerController: __dirname + '/balancer.js',
    storeController: __dirname + '/store.js',
    addressSocketLimit: 0,
    socketChannelLimit: 100,
    rebootWorkerOnCrash: !argv.debug
});