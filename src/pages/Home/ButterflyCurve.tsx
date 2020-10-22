import React, {FunctionComponent} from 'react';
import {equationsURL} from '../../helpers';
import {Link} from 'react-router-dom';

export const ButterflyCurve: FunctionComponent = () => {
    return <li>
        <h3>Butterfly curve (transcendental)</h3>
        <Link to={equationsURL([[
            'x=sin(t)(E^cos(t)-2cos(4t)-sin(t/12)^5);y=cos(t)(E^cos(t)-2cos(4t)-sin(t/12)^5);[0,20PI]',
            '#E60',
        ]], 11)}>
            x=sin(t)(E^cos(t)-2cos(4t)-sin(t/12)^5);<br/>
            y=cos(t)(E^cos(t)-2cos(4t)-sin(t/12)^5);
        </Link>
    </li>;
};