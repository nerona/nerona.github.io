/**
 * Author :  neron
 * time   : 2016/1/19
 * description: ...
 */
import React from 'react';
import ReactDOM from 'react-dom';
import StyleSheet from 'react-style';

class CommentForm extends React.Component {
    constructor(props){
        super(props);
    }

    handleSubmit(e){
        e.preventDefault();
        let author = this.refs.author.value.trim();
        let text = this.refs.text.value.trim();
        if(!author || !text){
            return;
        }
        this.props.onCommitSubmit({author: author, text: text});
        this.refs.author.value = '';
        this.refs.text.value = '';
        return;
    }

    render(){
        return (
            <form className="CommentForm" onsubmit={this.handleSubmit}>
                <input type="text" placeholder="Your name?" ref="author"/>
                <input type="text" placeholder="Say something?" ref="text"/>
                <input type="submit" value="Post"/>
            </form>
        );
    }
}

export default CommentForm