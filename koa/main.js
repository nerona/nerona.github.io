/**
 * Created by dell on 2016/8/8.
 */

var http = require('http');
var koa = require('koa');

var app = koa();

// x-response-time

app.use(function *(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    this.set('X-Response-Time', ms + 'ms');
});

// logger

app.use(function *(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});

// response

app.use(function *(){
    this.body = 'Hello Koa';
    //console.log(this);
    //console.log(this.req);
    //console.log(this.request);
    //console.log(this.response);

    //this.cookies.set('login', 'nerona', {signed: true});
    console.log("<---------------------->");
    console.log(this.query);
    console.log(this.protocol);
    console.log(this.ip);
    console.log(this.app);
    console.log(this.originalUrl);
    console.log(this.url);
    console.log(this.hostname);
    console.log(this.refresh);
    //console.log(this.socket);
    console.log("<---------------------->");
    console.log(this.body);
    console.log(this.status);
    console.log(this.length);
    console.log(this.type);
    console.log("<---------------------->");
});


app.keys = ['im a newer secret', 'i like turtle'];
//app.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256');

app.on('error', function(err){
    log.error('server error', err);
});

//app.listen(3000);
http.createServer(app.callback()).listen(3000);