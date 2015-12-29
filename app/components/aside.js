
var reflux = require('reflux');

var actions = reflux.createActions([
    'hello',
    'greet',
    'say'
]);

var store = reflux.createStore({
    init: function () {
        this.joinConcat(actions.hello, actions.greet, actions.say, this.trigger);
    }
});

store.listen(function() {
    console.log('triggering with', arguments);
});


actions.hello('bubu');
actions.greet('chacha');
actions.say('dockers');
actions.hello(1,2,3);
actions.greet('miku');
actions.say('dockers');

console.log('--------------------------');

actions.hello('bubu');
actions.hello(1,2,3);
actions.greet('chacha');
actions.say('dockers');
actions.greet('miku');
actions.say('dockers');
