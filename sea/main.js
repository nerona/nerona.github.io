/**
 * Created by dell on 2016/5/18.
 */
var fs = require("fs");
var events = require('events');


fs.readFile('server.js', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
});

console.log("程序执行结束!");



var eventEmitter = new events.EventEmitter();

var connectHandler = function connected(){
    "use strict";
    console.log('connect success');

    eventEmitter.emit('data_received');
};

eventEmitter.on('connection', connectHandler);

eventEmitter.on('data_received', function(){
    "use strict";
    console.log('data success');
});

eventEmitter.emit('connection');

console.log('done!');