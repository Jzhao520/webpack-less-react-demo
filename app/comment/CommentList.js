import BootsTrap from 'bootstrap'
import React from 'react';
import ReactDOM from 'react-dom';
import Comment from './Comment.js';

class Commentlist extends React.Component{
    render (){
        let commentNodes = this.props.data.map((comment,i) => {
            return (
                <Comment author={comment.author} data={comment.date} key={i}>
                    {comment.text}
                </Comment>
            )
        })
        return (
           <div>
               {commentNodes}
           </div>
        )
    }
}

export default Commentlist;