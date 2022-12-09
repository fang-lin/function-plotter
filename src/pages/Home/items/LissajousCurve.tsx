import React, {FunctionComponent} from 'react';
import {equationsURL} from '../../../helpers';
import {Link, Head3, EquationsListItem, Anchor, Paragraph, FooterParagraph} from '../styles';

export const LissajousCurve: FunctionComponent = () => {
    const url = equationsURL([
        ['x=2sin(5t);y=2sin(6t);[0,2PI]', '#26A']
    ], 10);
    return <EquationsListItem>
        <Head3><Link to={url}>Lissajous curve</Link></Head3>
        <Paragraph>
            <Link to={url}>
                x=2sin(5t);<br/>
                y=2sin(6t);
            </Link>
        </Paragraph>
        <FooterParagraph>
            <Anchor href="https://en.wikipedia.org/wiki/Lissajous_curve" target="_blank" rel="noopener noreferrer">
                Lissajous curve in wikipedia.org
            </Anchor>
        </FooterParagraph>
    </EquationsListItem>;
};
