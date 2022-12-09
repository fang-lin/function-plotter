import React, {FunctionComponent} from 'react';
import {equationsURL} from '../../../helpers';
import {Link, Head3, EquationsListItem, Anchor, Paragraph, FooterParagraph} from '../styles';

export const Limacon: FunctionComponent = () => {
    const url = equationsURL([
        ['x=4/2+2cos(t)+4/2cos(2t);y=2sin(t)+4/2sin(2t);[0,2PI]', '#AA6']
    ], 9);
    return <EquationsListItem>
        <Head3><Link to={url}>Limacon</Link></Head3>
        <Paragraph>
            <Link to={url}>
                x=a/2+b*cos(t)+a/2cos(2t);<br/>
                y=b*sin(t)+a/2sin(2t);<br/>
            </Link>
        </Paragraph>
        <FooterParagraph>
            <Anchor href="https://en.wikipedia.org/wiki/Lima%C3%A7on" target="_blank" rel="noopener noreferrer">
                Limacon in wikipedia.org
            </Anchor>
        </FooterParagraph>
    </EquationsListItem>;
};
