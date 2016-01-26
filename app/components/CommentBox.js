/**
 * Author :  neron
 * time   : 2016/1/19
 * description: ...
 */

import React, {PropTypes} from 'react';
import {ReactDOM} from 'react-dom';
import {Stylesheet} from 'react-style';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import $ from 'jquery';

const propTypes = {
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    text: PropTypes.string
};

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
const PureRenderMixin = React.addons.PureRenderMixin;

class CommentBox extends React.Component {
    constructor(props) {
        super(props);
        this.onClickA = this.onClickA.bind(this);
        const mixin = [React.addons.LinkedStateMixin];
        this.state = {
            data: 'hello!',
            windowWidth: window.innerWidth
        }
    }

//
    handleChange(e) {
        //
        this.setState({data: e.target.value});
        let node = this.refs.h1.getDOMNode();
        React.addons.TestUtils.Simulate.click(node);
        React.addons.TestUtils.Simulate.change(node, {target: {value: 'Hello'}});
        React.addons.TestUtils.Simulate.keyDown(node, {key: 'Enter'});
    }

    handleResize(e){
        this.setState({
            windowWidth: window.innerWidth
        });
    }
//
    loadDataFromServer() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

//
    handleCommitSubmit() {
        let comments = this.state.data;
        let newComments = comments.concat([comment]);
        this.setState({data: newComments});

        // submit to the server and refresh the list
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: 'comment',
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    //
    componentDidMount() {
        this.loadDataFromServer();
        setInterval(this.loadDataFromServer, this.props.pollInterval);
        window.addEventListener('resize', this.handleResize);
        $.get(this.props.source, function (result) {
            let last = result[0];
            if(this.isMounted){
                this.setState({
                    windowWidth: window.innerWidth
                });
            }
        });
    }

    componentWillUnmount(){
        window.removeEventListener('resize',this.handleResize);
    }

    //
    render() {
        const cs = React.addons.classSet;
        let classes = cs({
            'message': true,
            'message-important': this.props.isImportant,
            'message-read': this.props.isRead
        });
        return (
            <div className="commentBox">
                <ReactCSSTransitionGroup transitionName="example" transitionLeave={false}
                                         component="ul" className="ul-container">
                    /* <a href={this.props.url} onclick={this.onClickA}>{this.props.text}</a>*/
                    <h1 className={classes} ref="title">Comments</h1>
                    <CommentList data={this.state.data}/>
                    <CommentForm onCommitSubmit={this.handleCommitSubmit}/>
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}
CommentBox.prototype = propTypes;
CommentBox.defaultProps = defaultProps;

export default CommentBox;