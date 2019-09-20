import {render} from 'react-dom';
import React from 'react';
import {App} from './components/App';
import {Stage} from './stores/Stage';
import {Equations} from './stores/Equations';

const equations = new Equations();
const stage = new Stage(equations);

const dom = document.getElementById('root');
if (dom) {
    render(<App stage={stage}
                equations={equations}/>, dom);
}
