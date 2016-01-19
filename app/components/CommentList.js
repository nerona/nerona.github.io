/**
 * Author :  neron
 * time   : 2016/1/19
 * description: ...
 */
import React, {PropTypes} from 'react';
import {ReactDOM} from 'react-dom';
import {Stylesheet} from 'react-style';
import Comment from './Comment';

class CommentList extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="CommentList">
                <Comment author="Hunter">This is one comment!</Comment>
                <Comment author="Neron">This is another comment!</Comment>
            </div>
        );
    }
}

export default CommentList;