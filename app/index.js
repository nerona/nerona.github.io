/**
 * Author :  neron
 * time   : 2015/12/3
 * description: ...
 */
require('./css/normalize.css');

var Header = require('./components/header.js');
var React = require('react');
var ReactDOM = require('react-dom');

var Page = React.createClass({
    render: function () {
        return (
            <div className="page">
                <Header />
            </div>
        );
    }
});
ReactDOM.render(
    <Page />,
    document.getElementById('page')
);