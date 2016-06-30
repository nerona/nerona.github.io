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

console.log('----------------------------------------------------');

var buf = new Buffer(10);

var buf2 = new Buffer([10, 20, 30, 40]);

var buf3 = new Buffer('http://www.pthui.com', 'utf-8');

var buf4 = new Buffer(256);
var len = buf4.write('http://www.pthui.com');

console.log('write code num : ' + len);

console.log('----------------------------------------------------');

var buf5 = new Buffer(26);

for(var i=0; i<26; i++) {
    buf5[i] = i + 97;
}

console.log(buf5.toString('ascii'));
console.log(buf5.toString('ascii', 0, 5));
console.log(buf5.toString('utf-8', 0, 5));
console.log(buf5.toString(undefined, 0, 5));

console.log('----------------------------------------------------');

console.log(buf5.toJSON());
console.log(buf3.toJSON());

console.log('----------------------------------------------------');

var buf6 = Buffer.concat([buf5, buf5]);

console.log(buf6.toString('utf-8'));

console.log('----------------------------------------------------');
