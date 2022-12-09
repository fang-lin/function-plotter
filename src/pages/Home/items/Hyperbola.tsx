import React, {FunctionComponent} from 'react';
import {equationsURL} from '../../../helpers';
import {Link, Head3, EquationsListItem, Paragraph, Anchor, FooterParagraph} from '../styles';

const expression = (a: number): string => `y=${a}/x`;

const a1: [string, string] = [expression(1), '#A4E'];
const am1: [string, string] = [expression(-1), '#8E2'];
const a2: [string, string] = [expression(2), '#4E4'];
const am2: [string, string] = [expression(-2), '#2C2'];
const a3: [string, string] = [expression(3), '#800'];
const am3: [string, string] = [expression(-3), '#A64'];

export const Hyperbola: FunctionComponent = () => {
    const url = equationsURL([a1, am1, a2, am2, a3, am3], 10);
    return <EquationsListItem>
        <Head3><Link to={url}>Hyperbola</Link></Head3>
        <Paragraph>
            <Link to={url}>
                y=a/x;
            </Link>
        </Paragraph>
        <Paragraph>
            <Link to={equationsURL([a1], 10)}>a=1;</Link> <Link 
                to={equationsURL([am1], 10)}>a=-1;</Link> <Link 
                to={equationsURL([a2], 10)}>a=2;</Link> <Link 
                to={equationsURL([am2], 10)}>a=-2;</Link> <Link 
                to={equationsURL([a3], 10)}>a=3;</Link> <Link 
                to={equationsURL([am3], 10)}>a=-3;</Link>
        </Paragraph>
        <FooterParagraph>
            <Anchor href="https://en.wikipedia.org/wiki/Hyperbola" target="_blank" rel="noopener noreferrer">
                Hyperbola in wikipedia.org
            </Anchor>
        </FooterParagraph>
    </EquationsListItem>;
};
