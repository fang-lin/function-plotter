import React, {FunctionComponent} from 'react';
import {equationsURL} from '../../../helpers';
import {Link} from 'react-router-dom';

export const ArchimedeanSpiral: FunctionComponent = () => {
    return <li>
        <h3>Archimedean spiral</h3>
        <Link to={equationsURL([['x=t*cos(t);y=t*sin(t);[0,8*PI]', '#26A']], 4)}>
            x=t*cos(t);<br/>
            y=t*sin(t);
        </Link>
    </li>;
};