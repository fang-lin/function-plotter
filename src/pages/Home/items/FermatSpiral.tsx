import React, {FunctionComponent} from 'react';
import {equationsURL} from '../../../helpers';
import {Links, Head3, EquationsListItem} from '../styles';

export const FermatSpiral: FunctionComponent = () => {
    return <EquationsListItem>
        <Head3>
            <a href="" target="_blank" rel="noopener noreferrer">
                Fermat&apos;s spiral
            </a>
        </Head3>
        <Links to={equationsURL([
            ['x=t^(1/2)sin(t);y=t^(1/2)cos(t);[0,8*PI]', '#4A8'],
            ['x=-t^(1/2)sin(t);y=-t^(1/2)cos(t);[0,8*PI]', '#E84']
        ], 9)}>
            x=t^(1/2)sin(t);<br/>
            y=t^(1/2)cos(t);<br/>
            <br/>
            x=-t^(1/2)sin(t);<br/>
            y=-t^(1/2)cos(t);
        </Links>
    </EquationsListItem>;
};