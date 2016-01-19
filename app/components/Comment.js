/**
 * Author :  neron
 * time   : 2016/1/19
 * description: ...
 */
import React from 'react';
import ReactDOM from 'react-dom';

class Comment extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="Comment">
                <h2 className="CommentAuthor">
                    {this.props.author}
                </h2>
                {this.props.children}
            </div>
        );
    }
}

export default Comment;