import React, {FunctionComponent} from 'react';
import {equationsURL} from '../../../helpers';
import {Link, Head3, EquationsListItem, Paragraph, Anchor, FooterParagraph} from '../styles';

const sin: [string, string] = ['y=sin(x)', '#684'];
const csc: [string, string] = ['y=csc(x)', '#806'];
const cos: [string, string] = ['y=cos(x)', '#E80'];
const sec: [string, string] = ['y=sec(x)', '#A20'];
const tan: [string, string] = ['y=tan(x)', '#E28'];
const cot: [string, string] = ['y=cot(x)', '#04C'];

export const Trigonometric: FunctionComponent = () => {
    const url = equationsURL([sin, csc, cos, sec, tan, cot], 10);
    return <EquationsListItem>
        <Head3><Link to={url}>Trigonometric</Link></Head3>
        <Paragraph>
            <Link to={equationsURL([sin], 10)}>
                y=sin(x);
            </Link> <Link to={equationsURL([csc], 10)}>
                y=csc(x);
            </Link><br/>
            <Link to={equationsURL([cos], 10)}>
                y=cos(x);
            </Link> <Link to={equationsURL([sec], 10)}>
                y=sec(x);
            </Link><br/>
            <Link to={equationsURL([tan], 10)}>
                y=tan(x);
            </Link> <Link to={equationsURL([cot], 10)}>
                y=cot(x);
            </Link>
        </Paragraph>
        <FooterParagraph>
            <Anchor href="https://en.wikipedia.org/wiki/Trigonometric_functions" target="_blank" rel="noopener noreferrer">
                Trigonometric in wikipedia.org
            </Anchor>
        </FooterParagraph>
    </EquationsListItem>;
};
