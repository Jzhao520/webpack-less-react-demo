
import $ from 'jquery';
import "bootstrap/dist/css/bootstrap.css";
import './main.css';
import './wealth-line-translator.less';

import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './comment/CommentBox.js';
ReactDOM.render(
    <CommentBox url="app/comments.json"/>,
    document.getElementById('app')
);