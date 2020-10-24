import React, {FunctionComponent} from 'react';
import {Link} from 'react-router-dom';
import {equationsURL} from '../../../helpers';

export const LissajousCurve: FunctionComponent = () => {
    return <li>
        <h3>Lissajous curve</h3>
        <Link to={equationsURL([
            ['x=2sin(5t);y=2sin(6t);[0,2PI]', '#26A']
        ], 10)}>
            x=2sin(5t);<br/>
            y=2sin(6t);
        </Link>
    </li>;
};