import React, {FunctionComponent} from 'react';
import {equationsURL} from '../../../helpers';
import {Link, Head3, EquationsListItem, Paragraph, Anchor, FooterParagraph} from '../styles';

const expression = (k: number): string => `x=cos(${k}t)cos(t);y=cos(${k}t)sin(t);[0,2PI]`;

const k2: [string, string] = [expression(2), '#A2A'];
const k3: [string, string] = [expression(3), '#E60'];
const k8: [string, string] = [expression(8), '#AC0'];
const k16: [string, string] = [expression(16), '#EEA'];

export const RoseCurve: FunctionComponent = () => {
    const url = equationsURL([k16, k8, k3, k2]);
    return <EquationsListItem>
        <Head3><Link to={url}>Rose curve</Link></Head3>
        <Paragraph>
            <Link to={url}>
                x=cos(kt)cos(t);<br/>
                y=cos(kt)sin(t);
            </Link>
        </Paragraph>
        <Paragraph>
            <Link to={equationsURL([k2])}>k=2</Link> <Link 
                to={equationsURL([k3])}>k=3</Link> <Link 
                to={equationsURL([k8])}>k=8</Link> <Link 
                to={equationsURL([k16])}>k=16</Link>
        </Paragraph>
        <FooterParagraph>
            <Anchor href="https://en.wikipedia.org/wiki/Rose_(mathematics)" target="_blank" rel="noopener noreferrer">
                Rose curve in wikipedia.org
            </Anchor>
        </FooterParagraph>
    </EquationsListItem>;
};
