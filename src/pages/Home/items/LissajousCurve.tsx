import React, {FunctionComponent} from 'react';
import {equationsURL} from '../../../helpers';
import {Link, Head3, EquationsListItem, Anchor} from '../styles';

export const LissajousCurve: FunctionComponent = () => {
    return <EquationsListItem>
        <Head3>
            <Anchor href="https://en.wikipedia.org/wiki/Lissajous_curve" target="_blank" rel="noopener noreferrer">
                Lissajous curve
            </Anchor>
        </Head3>
        <Link to={equationsURL([
            ['x=2sin(5t);y=2sin(6t);[0,2PI]', '#26A']
        ], 10)}>
            x=2sin(5t);<br/>
            y=2sin(6t);
        </Link>
    </EquationsListItem>;
};