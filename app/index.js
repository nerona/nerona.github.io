/**
 * Author :  neron
 * time   : 2015/12/3
 * description: ...
 */
require('./css/normalize.css');
require('./less/style.less');

var Aside = require('./components/aside.js');
var Main= require('./components/main.js');
var React = require('react');
var ReactDOM = require('react-dom');

var Page = React.createClass({
    render: function () {
        return (
            <div className="page">
                <Aside />
                <Main />
            </div>
        );
    }
});
ReactDOM.render(
    <Page />,
    document.getElementById('page')
);