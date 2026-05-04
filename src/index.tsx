import {createRoot} from 'react-dom/client';
import React from 'react';
import {HashRouter, Navigate, Route, Routes} from 'react-router-dom';
import {Plotter} from './pages/Plotter';
import {combinePathToURL, defaultParams, Page, routerPath} from './helpers';
import {Home} from './pages/Home';

const dom = document.getElementById('root');

if (dom) {
    const root = createRoot(dom);
    root.render(<HashRouter>
        <Routes>
            <Route path={routerPath()} element={<Plotter/>}/>
            <Route path={Page.home} element={<Home/>}/>
            <Route path={Page.plotter} element={<Navigate to={combinePathToURL(defaultParams)} replace/>}/>
            <Route path="*" element={<Navigate to={Page.home} replace/>}/>
        </Routes>
    </HashRouter>);
}
