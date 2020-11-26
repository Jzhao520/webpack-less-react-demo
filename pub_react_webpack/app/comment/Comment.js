import React from 'react';
import ReactDOM from 'react-dom';


class Comment extends React.Component{
    render(){
        return (
            <div className="comment">
                <div className="content">
                    <span className="author">
                        {this.props.author}
                    </span>
                    <div className="metadate">
                        <span className="date">{this.props.data}</span>
                    </div>
                    <div className="text">{this.props.children}</div>
                </div>
            </div>
        )
    }
}
export default Comment;