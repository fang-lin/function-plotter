import {render} from 'react-dom';
import React from 'react';
import {App} from './components/App';
import {root} from './components/App.css';
import * as observable from './services/stores';

const dom = document.getElementById('root');
if (dom) {
    dom.id = root;
    render(<App {...observable}/>, dom);
}
