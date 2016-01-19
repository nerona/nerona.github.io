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

class CommentBox extends React.Component {
    constructor(props){
        super(props);
        this.onClickA = this.onClickA.bind(this);
    }

    onClickA() {
        //
    }

    getInitialState(){
        return {data: []};
    }

    loadDataFromServer(){
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data){
                this.setState({data: data});
            }.bind(this),
            error: function (xhr,status,err) {
                console.error(this.props.url,status,err.toString());
            }.bind(this)
        });
    }

    handleCommitSubmit(){
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
            error: function (xhr,status,err) {
                console.error(this.props.url,status,err.toString());
            }.bind(this)
        });
    }

    componentDidMount(){
        this.loadDataFromServer();
        setInterval(this.loadDataFromServer, this.props.pollInterval);
    }
    render(){
        return (
            <div className="commentBox">
               /* <a href={this.props.url} onclick={this.onClickA}>{this.props.text}</a>*/
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommitSubmit={this.handleCommitSubmit}/>
            </div>
        );
    }
}
CommentBox.prototype = propTypes;
CommentBox.defaultProps = defaultProps;

export default CommentBox;