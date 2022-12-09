import React, {FunctionComponent} from 'react';
import {equationsURL} from '../../../helpers';
import {Link, Head3, EquationsListItem, Paragraph, Anchor, FooterParagraph} from '../styles';

const expression = (k: number, upper: number): string => `x=1(${k}-1)cos(t)+1*cos((${k}-1)t);y=1(${k}-1)sin(t)-1*sin((${k}-1)t);[0,${upper}PI]`;

const k2p1: [string, string] = [expression(2.1, 20), '#826'];
const k3: [string, string] = [expression(3, 2), '#8C0'];
const k3p8: [string, string] = [expression(3.8, 10), '#EC0'];
const k4: [string, string] = [expression(4, 2), '#E60'];
const k5: [string, string] = [expression(5, 2), '#46E'];
const k5p5: [string, string] = [expression(5.5, 4), '#CC0'];
const k6: [string, string] = [expression(6, 2), '#E6A'];
const k7p2: [string, string] = [expression(7.2, 10), '#6AE'];

export const Hypocycloid: FunctionComponent = () => {
    const url = equationsURL([k7p2, k6, k5p5, k5, k4, k3p8, k3, k2p1], 8);
    return <EquationsListItem>
        <Head3><Link to={url}>Hypocycloid</Link></Head3>
        <Paragraph>
            <Link to={url}>
                x=r(k-1)cos(t)+r*cos((k-1)t);<br/>
                y=r(k-1)sin(t)-r*sin((k-1)t);<br/>
            </Link>
        </Paragraph>
        <Paragraph>
            <Link to={equationsURL([k2p1], 12)}>k=2.1;</Link> <Link
                to={equationsURL([k3], 10)}>k=3;</Link> <Link
                to={equationsURL([k3p8], 10)}>k=3.8;</Link> <Link
                to={equationsURL([k4], 10)}>k=4;</Link> <Link
                to={equationsURL([k5], 10)}>k=5;</Link> <Link
                to={equationsURL([k5p5], 8)}>k=5.5;</Link> <Link
                to={equationsURL([k6], 8)}>k=6;</Link> <Link
                to={equationsURL([k7p2], 8)}>k=7.2;</Link>
        </Paragraph>
        <FooterParagraph>
            <Anchor href="https://en.wikipedia.org/wiki/Hypocycloid" target="_blank" rel="noopener noreferrer">
                Hypocycloid in wikipedia.org
            </Anchor>
        </FooterParagraph>
    </EquationsListItem>;
};
