import {render} from 'react-dom';
import React from 'react';
import {Redirect, Route, Router, Switch} from 'react-router';
import {createBrowserHistory} from 'history';
import {App} from './components/App';
import {GlobalStyle} from "./components/AppWrapper";

const dom = document.getElementById('root');
if (dom) {
    const history = createBrowserHistory();
    render(<Router history={history}>
        <GlobalStyle/>
        <Switch>
            <Route exact path="/:ZOOM_INDEX/:ORIGIN/:SHOW_COORDINATE/:SMOOTH/:IS_BOLD/:EQUATION_DIALOG_DISPLAY/:EXPAND_EQUATION_PANEL/:INFO_DIALOG_DISPLAY/:EQUATIONS" component={App}>
            </Route>
            <Redirect from="/" to="/8/NaN+NaN/-/+/+/-/+/-/equations"/>
        </Switch>
    </Router>, dom);
}
