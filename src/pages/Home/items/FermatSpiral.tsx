import React, {FunctionComponent} from 'react';
import {equationsURL} from '../../../helpers';
import {Link} from 'react-router-dom';

export const FermatSpiral: FunctionComponent = () => {
    return <li>
        <h3>Fermat&apos;s spiral</h3>
        <Link to={equationsURL([
            ['x=t^(1/2)sin(t);y=t^(1/2)cos(t);[0,8*PI]', '#0A4'],
            ['x=-t^(1/2)sin(t);y=-t^(1/2)cos(t);[0,8*PI]', '#E84']
        ], 9)}>
            <p>
                x=t^(1/2)sin(t);<br/>
                y=t^(1/2)cos(t);<br/>
            </p>
            <p>
                x=-t^(1/2)sin(t);<br/>
                y=-t^(1/2)cos(t);
            </p>
        </Link>
    </li>;
};