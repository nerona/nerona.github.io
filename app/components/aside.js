/**
 * Author :  neron
 * time   : 2015/12/3
 * description: ...
 */
var React = require('react');

var Category = React.createClass({
    render: function () {
        return (
            <div className="category">
                <h2>Category</h2>
                <div className="lists">
                    <p className="list-item">
                        <span className="list-name">Html5</span>
                        <span className="list-num">3</span>
                    </p>
                    <p className="list-item">
                        <span className="list-name">Css3</span>
                        <span className="list-num">2</span>
                    </p>
                    <p className="list-item">
                        <span className="list-name">Javascript</span>
                        <span className="list-num">1</span>
                    </p>
                </div>
            </div>
        );
    }
});
var Book = React.createClass({
    render: function () {
        return (
            <div className="booklist">
                <div className="book-item">
                    <img src="" alt=""/>
                    <p>texttexttexttexttexttexttexttext</p>
                    <a href="#">介绍</a>
                    <a href="#">ID购买地址</a>
                </div>
                <div className="book-item">
                    <img src="" alt=""/>
                    <p>texttexttexttexttexttexttexttext</p>
                    <a href="#">介绍</a>
                    <a href="#">ID购买地址</a>
                </div>
            </div>
        );
    }
});
var Wechat = React.createClass({
    render: function () {
        return (
            <div className="wechat">
                <h2>我的公众号：690115491</h2>
                <img src="" alt="" />
                </div>
        );
    }
});
var Aside = React.createClass({
    render: function () {
        return (
            <div className="aside">
                <h1 className="author">林东方,吉才神前端开发工程师</h1>
                <ul>
                    <li>
                        <a href="#" alt="首页" className="index">首页</a>
                    </li>
                    <li>
                        <a href="#" alt="关于我" className="about-me">关于我</a>
                    </li>
                </ul>
                <Category />
                <Book />
                <Wechat />
            </div>
        );
    }
});

module .exports = Aside;