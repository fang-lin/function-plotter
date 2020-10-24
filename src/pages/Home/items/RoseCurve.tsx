import React, {FunctionComponent} from 'react';
import {equationsURL} from '../../../helpers';
import {Links, Head3, EquationsListItem, Paragraph} from '../styles';

const expression = (k: number): string => `x=cos(${k}t)cos(t);y=cos(${k}t)sin(t);[0,2PI]`;

const k2: [string, string] = [expression(2), '#A2A'];
const k3: [string, string] = [expression(3), '#E60'];
const k8: [string, string] = [expression(8), '#AC0'];
const k16: [string, string] = [expression(16), '#EEA'];

export const RoseCurve: FunctionComponent = () => {
    return <EquationsListItem>
        <Head3>
            <a href="https://en.wikipedia.org/wiki/Rose_(mathematics)" target="_blank" rel="noopener noreferrer">
                Rose curve
            </a>
        </Head3>
        <Links to={equationsURL([k16, k8, k3, k2])}>
            x=cos(kt)cos(t);<br/>
            y=cos(kt)sin(t);
        </Links>
        <Paragraph>
            <Links to={equationsURL([k2])}>k=2</Links>,&nbsp;
            <Links to={equationsURL([k3])}>k=3</Links>,&nbsp;
            <Links to={equationsURL([k8])}>k=8</Links>,&nbsp;
            <Links to={equationsURL([k16])}>k=16</Links>;
        </Paragraph>
    </EquationsListItem>;
};