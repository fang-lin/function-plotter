import {render} from 'react-dom';
import React from 'react';
import {App} from './components/App';

const dom = document.getElementById('root');
if (dom) {
    render(<App/>, dom);
}
