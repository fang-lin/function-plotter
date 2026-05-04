import {createRoot} from 'react-dom/client';
import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {Plotter} from './pages/Plotter';
import {combinePathToURL, defaultParams, Page, routerPath} from './helpers';
import {Home} from './pages/Home';
import {NotFound} from './pages/NotFound';

const dom = document.getElementById('root');

if (dom) {
    const root = createRoot(dom);
    root.render(<BrowserRouter>
        <Routes>
            <Route path={routerPath()} element={<Plotter/>}/>
            <Route path={Page.home} element={<Home/>}/>
            <Route path={Page.plotter} element={<Navigate to={combinePathToURL(defaultParams)} replace/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </BrowserRouter>);
}
