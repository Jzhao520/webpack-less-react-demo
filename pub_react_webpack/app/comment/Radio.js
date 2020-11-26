import React from 'react';
import ReactDOM from 'react-dom';


//可控组件与不可控组件
//<input type="text" defaultValue={this.state.value}/>
//var inputValue= this.state.value;

/**
 * 组件可控的好处：
 * 符合React的数据流
 * 数据存储在state中,便于使用
 * 便于对数据进行处理
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * **/
class Radio extends React.Component{
    SubmitHandler(event){
        event.preventDefault();
        let val = this.refs.hello.value;
        console.log(val);
    }
    render(){
        return(
            <form onSubmit={this.SubmitHandler.bind(this)}>
                <input type="text" ref="hello" defaultValue="Hello"/>
                <button type="submit">提交</button>
            </form>
        )
    }
}
export default Radio;