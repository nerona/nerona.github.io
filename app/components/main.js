/**
 * Author :  neron
 * time   : 2015/12/3
 * description: ...
 */
import {React} from 'react';
import {Reflux} from 'reflux';
import $ from 'jquery';

var TodoActions = Reflux.createActions([
    'addItem',
    'deleteItem'
]);
var getAll = Reflux.createAction({async:true});

var TodoStore = Reflux.createStore({
    init: function () {
        this.listenTo(TodoActions.addItem, 'addItem');
        this.listenTo(TodoActions.deleteItem, 'deleteItem');
        this.listenTo(getAll, 'getAll');
    },
    addItem: function (model) {
        console.log(model);
    },
    deleteItem: function (model) {
        console.log(model);
    },
    getAll: function (model) {
        $.get('/all', function (data) {
            if(data){
                getAll.completed(data);
            } else {
                getAll.failed(data);
            }
        });
    }
});

TodoActions.addItem({name:'neron'});
TodoActions.deleteItem({name:'neron'});
getAll({name:'neron'})
    .then(function (data) {
         console.log(data);
    })
    .catch(function (err) {
        throw err;
});
