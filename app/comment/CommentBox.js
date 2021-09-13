import React from 'react';
import ReactDOM from 'react-dom';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import $ from 'jquery';
class CommentBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data :[]
        }
        this.getComments();
        // setInterval( () => this.getComments(),5000);
    }
    handleCommentSubmit(comment){
        console.log(comment)
        let comments = this.state.data,
            newComments = comments.concat(comment);
        
        this.setState({data:newComments})

    }
    getComments(){
        $.ajax({
            url : this.props.url,
            dataType: 'json',
            cache : false,
            success : comments =>{
                this.setState({data:comments});
            },
            error:(xhr,status,error) =>{
                console.log(error);
            }
        })
    }
    
    render (){
        return (
           <div className="comments">
                <h2 className="form-signin-heading">评论模块</h2>
                <div className="divider"></div>
                <CommentList data={this.state.data}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)}/>
            </div>
        )
    }
}
export default CommentBox;