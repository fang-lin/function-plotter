import React, {FunctionComponent} from 'react';
import {equationsURL} from '../../../helpers';
import {Link, Head3, EquationsListItem, Paragraph, Anchor, FooterParagraph} from '../styles';

const expression = (a: number, b: number): string => `x=${a}*sin(t);y=${b}*cos(t);[0,2PI]`;

const a1b1: [string, string] = [expression(1, 1), '#C6C'];
const a2b1: [string, string] = [expression(2, 1), '#E82'];
const a1b2: [string, string] = [expression(1, 2), '#46E'];
const a3b2: [string, string] = [expression(3, 2), '#C68'];
const a2b3: [string, string] = [expression(2, 3), '#64E'];

export const Ellipse: FunctionComponent = () => {
    const url = equationsURL([a1b1, a2b1, a1b2, a3b2, a2b3], 10);
    return <EquationsListItem>
        <Head3><Link to={url}>Ellipse</Link></Head3>
        <Paragraph>
            <Link to={url}>
                x=a*sin(t);<br/>
                y=b*cos(t);
            </Link>
        </Paragraph>
        <Paragraph>
            <Link to={equationsURL([a1b1], 10)}>a=1, b=1</Link> <Link 
                to={equationsURL([a2b1], 10)}>a=2, b=1</Link> <Link 
                to={equationsURL([a1b2], 10)}>a=1, b=2</Link> <Link 
                to={equationsURL([a3b2], 10)}>a=3, b=2</Link> <Link 
                to={equationsURL([a2b3], 10)}>a=2, b=3</Link>;
        </Paragraph>
        <FooterParagraph>
            <Anchor href="https://en.wikipedia.org/wiki/Ellipse" target="_blank" rel="noopener noreferrer">
                Ellipse in wikipedia.org
            </Anchor>
        </FooterParagraph>
    </EquationsListItem>;
};
