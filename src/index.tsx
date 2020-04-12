import {render} from 'react-dom';
import React from 'react';
import {Redirect, Route, Router, Switch} from 'react-router';
import {createHashHistory} from 'history';
import {App} from './components/App/App';
import {GlobalStyle} from './components/App/App.style';
import {utoa} from './helpers/params';

const dom = document.getElementById('root');
if (dom) {
    const history = createHashHistory();
    const defaultURL = `/13/0/0/0110111/4/${utoa('[["sin(x)","rgb(238, 102, 0)",true],["-sin(x)","rgb(0, 136, 204)",true],["tan(x)","rgb(136, 34, 0)",true],["tan(-x)","rgb(238, 170, 0)",true],["cos(31*x)*sin(x)","rgb(0, 136, 0)",true]]')}`;

    render(<Router history={history}>
        <GlobalStyle/>
        <Switch>
            <Route exact
                path="/:scaleLevel/:originX/:originY/:toggles/:selectedEquationIndex/:equations"
                component={App}>
            </Route>
            <Redirect from="/" to={defaultURL}/>
        </Switch>
    </Router>, dom);
}
