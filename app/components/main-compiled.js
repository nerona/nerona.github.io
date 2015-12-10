'use strict';

var _react = require('react');

var _reflux = require('reflux');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TodoActions = _reflux.Reflux.createActions(['addItem', 'deleteItem']); /**
                                                                            * Author :  neron
                                                                            * time   : 2015/12/3
                                                                            * description: ...
                                                                            */

var _getAll = _reflux.Reflux.createAction({ async: true });

var TodoStore = _reflux.Reflux.createStore({
    init: function init() {
        this.listenTo(TodoActions.addItem, 'addItem');
        this.listenTo(TodoActions.deleteItem, 'deleteItem');
        this.listenTo(_getAll, 'getAll');
    },
    addItem: function addItem(model) {
        console.log(model);
    },
    deleteItem: function deleteItem(model) {
        console.log(model);
    },
    getAll: function getAll(model) {
        _jquery2.default.get('/all', function (data) {
            if (data) {
                _getAll.completed(data);
            } else {
                _getAll.failed(data);
            }
        });
    }
});
TodoActions.addItem({ name: 'neron' });
TodoActions.deleteItem({ name: 'neron' });
_getAll({ name: 'neron' }).then(function (data) {
    console.log(data);
}).catch(function (err) {
    throw err;
});

//# sourceMappingURL=main-compiled.js.map