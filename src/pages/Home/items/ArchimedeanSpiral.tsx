import React, {FunctionComponent} from 'react';
import {equationsURL} from '../../../helpers';
import {Link, Head3, EquationsListItem, Anchor} from '../styles';

export const ArchimedeanSpiral: FunctionComponent = () => {
    return <EquationsListItem>
        <Head3>
            <Anchor href="https://en.wikipedia.org/wiki/Archimedean_spiral" target="_blank" rel="noopener noreferrer">
                Archimedean spiral
            </Anchor>
        </Head3>
        <Link to={equationsURL([['x=t*cos(t);y=t*sin(t);[0,8*PI]', '#26A']], 4)}>
            x=t*cos(t);<br/>
            y=t*sin(t);
        </Link>
    </EquationsListItem>;
};