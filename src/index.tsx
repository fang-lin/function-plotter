import {render} from 'react-dom';
import React from 'react';
import {Redirect, Route, Router, Switch} from 'react-router';
import {createBrowserHistory} from 'history';
import {App} from './components/App';
import {GlobalStyle} from "./components/AppWrapper";
import {utoa} from "./components/App.function";

const dom = document.getElementById('root');
if (dom) {
    const history = createBrowserHistory();
    const defaultURL = `/8/NaN/NaN/010110/${utoa('Math.sin(x),#080,1')}`;

    render(<Router history={history}>
        <GlobalStyle/>
        <Switch>
            <Route exact
                   path="/:zoomIndex/:originX/:originY/:toggles/:equations"
                   component={App}>
            </Route>
            <Redirect from="/" to={defaultURL}/>
        </Switch>
    </Router>, dom);
}
