import React, {FunctionComponent} from 'react';
import {equationsURL} from '../../../helpers';
import {Links, Head3, EquationsListItem} from '../styles';

export const LissajousCurve: FunctionComponent = () => {
    return <EquationsListItem>
        <Head3>
            <a href="https://en.wikipedia.org/wiki/Lissajous_curve" target="_blank" rel="noopener noreferrer">
                Lissajous curve
            </a>
        </Head3>
        <Links to={equationsURL([
            ['x=2sin(5t);y=2sin(6t);[0,2PI]', '#26A']
        ], 10)}>
            x=2sin(5t);<br/>
            y=2sin(6t);
        </Links>
    </EquationsListItem>;
};