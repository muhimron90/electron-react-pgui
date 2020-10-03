import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDom from 'react-dom';
import './styles/index.scss';
import App from './App';


const MyApp = hot(App);

ReactDom.render(<MyApp />, document.getElementById('app'));



