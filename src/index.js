import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App';
import { root } from './components/App.css';

import { states, stage } from './states';

const dom = document.getElementById('root');
dom.id = root;
ReactDOM.render(<App { ...{ states, stage } }/>, dom);
