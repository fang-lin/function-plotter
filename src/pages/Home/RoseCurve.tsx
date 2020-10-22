import React, {FunctionComponent} from 'react';
import {equationsURL} from '../../helpers';
import {Link} from 'react-router-dom';

const k2: [string, string] = ['x=cos(2t)cos(t);y=cos(2t)sin(t);[0,2*PI]', '#A2A'];
const k3: [string, string] = ['x=cos(3t)cos(t);y=cos(3t)sin(t);[0,2*PI]', '#E60'];
const k8: [string, string] = ['x=cos(8t)cos(t);y=cos(8t)sin(t);[0,2*PI]', '#AC0'];
const k16: [string, string] = ['x=cos(16t)cos(t);y=cos(16t)sin(t);[0,2*PI]', '#EEA'];

export const RoseCurve: FunctionComponent = () => {
    return <li>
        <h3>Rose curve </h3>
        <Link to={equationsURL([k2, k3, k8, k16].reverse())}>
            x=cos(kt)cos(t);<br/>
            y=cos(kt)sin(t);
        </Link>
        <p>
            <Link to={equationsURL([k2])}>k=2</Link>,
            <Link to={equationsURL([k3])}>k=3</Link>,
            <Link to={equationsURL([k8])}>k=8</Link>,
            <Link to={equationsURL([k16])}>k=16</Link>
        </p>
    </li>;
};