import React, {FunctionComponent} from 'react';
import {equationsURL} from '../../../helpers';
import {Links, Head3, EquationsListItem} from '../styles';

export const ArchimedeanSpiral: FunctionComponent = () => {
    return <EquationsListItem>
        <Head3>
            <a href="https://en.wikipedia.org/wiki/Archimedean_spiral" target="_blank" rel="noopener noreferrer">
                Archimedean spiral
            </a>
        </Head3>
        <Links to={equationsURL([['x=t*cos(t);y=t*sin(t);[0,8*PI]', '#26A']], 4)}>
            x=t*cos(t);<br/>
            y=t*sin(t);
        </Links>
    </EquationsListItem>;
};