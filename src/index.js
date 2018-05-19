import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App';
import { root } from './components/App.css';
import * as observable from './observable';

const dom = document.getElementById('root');
dom.id = root;
ReactDOM.render(<App { ...observable }/>, dom);
