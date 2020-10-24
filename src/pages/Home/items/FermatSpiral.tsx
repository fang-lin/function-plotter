import React, {FunctionComponent} from 'react';
import {equationsURL} from '../../../helpers';
import {Link, Head3, EquationsListItem, Anchor} from '../styles';

export const FermatSpiral: FunctionComponent = () => {
    return <EquationsListItem>
        <Head3>
            <Anchor href="" target="_blank" rel="noopener noreferrer">
                Fermat&apos;s spiral
            </Anchor>
        </Head3>
        <Link to={equationsURL([
            ['x=t^(1/2)sin(t);y=t^(1/2)cos(t);[0,8*PI]', '#4A8'],
            ['x=-t^(1/2)sin(t);y=-t^(1/2)cos(t);[0,8*PI]', '#E84']
        ], 9)}>
            x=t^(1/2)sin(t);<br/>
            y=t^(1/2)cos(t);<br/>
            <br/>
            x=-t^(1/2)sin(t);<br/>
            y=-t^(1/2)cos(t);
        </Link>
    </EquationsListItem>;
};