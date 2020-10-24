import React, {FunctionComponent} from 'react';
import {equationsURL} from '../../../helpers';
import {Links, Head3, EquationsListItem} from '../styles';

export const Limacon: FunctionComponent = () => {
    return <EquationsListItem>
        <Head3>
            <a href="https://en.wikipedia.org/wiki/Lima%C3%A7on" target="_blank" rel="noopener noreferrer">
                Limacon
            </a>
        </Head3>
        <Links to={equationsURL([
            ['x=4/2+2cos(t)+4/2cos(2t);y=2sin(t)+4/2sin(2t);[0,2PI]', '#AA6']
        ], 9)}>
            x=a/2+b*cos(t)+a/2cos(2t);<br/>
            y=b*sin(t)+a/2sin(2t);<br/>
        </Links>
    </EquationsListItem>;
};