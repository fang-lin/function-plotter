import React, {FunctionComponent} from 'react';
import {equationsURL} from '../../../helpers';
import {Link} from 'react-router-dom';

const k2p1: [string, string] = ['x=1(2.1-1)cos(t)+1*cos((2.1-1)t);y=1(2.1-1)sin(t)-1*sin((2.1-1)t);[0,20PI]', '#26A'];
const k5p5: [string, string] = ['x=1(5.5-1)cos(t)+1*cos((5.5-1)t);y=1(5.5-1)sin(t)-1*sin((5.5-1)t);[0,4PI]', '#E60'];

export const Hypocycloid: FunctionComponent = () => {
    return <li>
        <h3>Hypocycloid</h3>
        <p>
            <Link to={equationsURL([k2p1], 12)}>
                x=r(k-1)cos(t)+r*cos((k-1)t);<br/>
                y=r(k-1)sin(t)-r*sin((k-1)t);<br/>
                r=1; k=2.1;
            </Link>
        </p>
        <p>
            <Link to={equationsURL([k5p5], 8)}>
                x=r(k-1)cos(t)+r*cos((k-1)t);<br/>
                y=r(k-1)sin(t)-r*sin((k-1)t);<br/>
                r=1; k=5.5;
            </Link>
        </p>
    </li>;
};