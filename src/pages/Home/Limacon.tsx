import React, {FunctionComponent} from 'react';
import {Link} from 'react-router-dom';
import {equationsURL} from '../../helpers';

export const Limacon: FunctionComponent = () => {
    return <li>
        <h3>Limacon</h3>
        <Link to={equationsURL([
            ['x=4/2+2cos(t)+4/2cos(2t);y=2sin(t)+4/2sin(2t);[0,2PI]', '#AA6']
        ], 9)}>
            x=4/2+2cos(t)+4/2cos(2t);<br/>
            y=2sin(t)+4/2sin(2t);
        </Link>
    </li>;
};