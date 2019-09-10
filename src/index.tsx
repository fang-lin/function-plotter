import {render} from 'react-dom';
import React from 'react';
import {Provider} from 'mobx-react';
import {App} from './components/App';
import {Stage} from './stores/Stage';
import {Equations} from './stores/Equations';
import {Preferences} from './stores/Preferences';

const stage = new Stage();
const equations = new Equations();
const preferences = new Preferences();

const dom = document.getElementById('root');
if (dom) {
    render(<Provider
        stage={stage}
        equations={equations}
        preferences={preferences}>
        <App/>
    </Provider>, dom);
}
