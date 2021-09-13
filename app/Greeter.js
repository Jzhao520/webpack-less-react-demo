import React, {Component} from 'react';
import config from './config.json';
import styles from "./Greeter.css";
// import css from "./wealth-line-translator.less";
class Greeter extends React.Component{
    render(){
        return (
            <div className={styles.root}>
                {config.greetText}
            </div>
        )
    }
}
export default Greeter