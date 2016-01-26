/**
 * Author :  neron
 * time   : 2016/1/26
 * description: ...
 */
var cloneDeep = require('lodash.clonedeep');

var data = {
    id: 'data',
    author: {
        name: 'nerona',
        github: 'https://github.con/nerona'
    }
};

var data1 = cloneDeep(data);

console.log('equal:', data1===data); //false

data1.id = 'data1';
data1.author.name = 'hunter';

console.log(data.id);// data
console.log(data1.id);// data1

console.log(data.author.name);//nerona
console.log(data1.author.name);//hunter