import {render} from 'react-dom';
import React from 'react';
import {Redirect, Route, Router, Switch} from 'react-router';
import {createHashHistory} from 'history';
import {App} from './components/App';
import {GlobalStyle} from './components/AppWrapper';
import {utoa} from './components/App.function';

const dom = document.getElementById('root');
if (dom) {
    const history = createHashHistory();
    const defaultURL = `/10/NaN/NaN/010110/${utoa('[["Math.cos(51*x)*Math.sin(x)","rgb(0, 136, 0)","1"]]')}`;

    render(<Router history={history}>
        <GlobalStyle/>
        <Switch>
            <Route exact
                path="/:zoom/:originX/:originY/:toggles/:equations"
                component={App}>
            </Route>
            <Redirect from="/" to={defaultURL}/>
        </Switch>
    </Router>, dom);
}
