import React from 'react';
import ReactDOM from 'react-dom';
import Radio from './Radio.js';

class CommentFrom extends React.Component{
    handleSubmit(event){
        event.preventDefault();
        console.log("提交表单...");
        let author = this.refs.author.value,
            text =  this.refs.text.value;
        console.log(author,text);
        this.props.onCommentSubmit({author,text,date:'刚刚'});
    }
    render (){
        return (
            <div>
                <form className="reply form" onSubmit={this.handleSubmit.bind(this)}>
                    <div className="field">
                        <input type="text" placeholder="姓名" ref="author"/>
                    </div>
                    <div className="field">
                        <textarea placeholder="评论" cols="30" rows="10" ref="text"></textarea>
                    </div>
                    <button type="submit" className="blue button">添加评论</button>
                </form>
                <Radio/>
            </div>
        )
    }
}
export default CommentFrom;