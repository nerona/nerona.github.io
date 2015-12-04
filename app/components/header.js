/**
 * Author :  neron
 * time   : 2015/12/3
 * description: ...
 */
var React = require('react');
require('./../less/header.less');

var SearchBar = React.createClass({
    render: function () {
        return (
            <div className="search-bar">
                <input type="text" placeholder="Eason chen" className="search-text"/>
                <input type="button" className="search-submit"/>
            </div>
        );
    }
});
var NavItem = React.createClass({
    render: function () {
        return (
            <div className="nav-item">
                <a href="#" className="vip">开通会员</a>
                <a href="#" className="rings">铃音库</a>
            </div>
        );
    }
});
var Navbar = React.createClass({
    render: function () {
        return (
            <div className="navbar">
                <a href="#" title="Neron" className="brand">乐盒音</a>
                <SearchBar />
                <NavItem />
            </div>
        );
    }
});
var Tabbar = React.createClass({
    render: function () {
        return (
            <div className="tabbar">
                <ul>
                    <li className="current"><a href="#">首页</a></li>
                    <li><a href="#">彩铃</a></li>
                    <li><a href="#">乐库</a></li>
                    <li><a href="#">排行榜</a></li>
                    <li><a href="#">电台</a></li>
                    <li><a href="#">视频</a></li>
                    <li><a href="#">专题</a></li>
                    <li><a href="#">大剧院</a></li>
                </ul>
                </div>
        );
    }
});

var Header = React.createClass({
    render: function () {
        return (
            <header>
               <Navbar />
                <Tabbar />
            </header>
        );
    }
});

module.exports = Header;