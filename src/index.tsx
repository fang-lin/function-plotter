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
    const defaultURL = `/12/0/0/0110110/0/${utoa('[["cos(51*x)*sin(x)","rgb(0, 136, 0)",true]]')}`;

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
