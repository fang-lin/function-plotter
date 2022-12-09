import React, {FunctionComponent} from 'react';
import {equationsURL} from '../../../helpers';
import {Link, Head3, EquationsListItem, Anchor, Paragraph, FooterParagraph} from '../styles';

export const ButterflyCurve: FunctionComponent = () => {
    const url = equationsURL([[
        'x=sin(t)(E^cos(t)-2cos(4t)-sin(t/12)^5);y=cos(t)(E^cos(t)-2cos(4t)-sin(t/12)^5);[0,20PI]',
        '#E60',
    ]], 11);
    return <EquationsListItem>
        <Head3><Link to={url}>Butterfly curve</Link></Head3>
        <Paragraph>
            <Link to={url}>
                x=sin(t)(E^cos(t)-2cos(4t)-sin(t/12)^5);<br/>
                y=cos(t)(E^cos(t)-2cos(4t)-sin(t/12)^5);
            </Link>
        </Paragraph>
        <FooterParagraph>
            <Anchor href="https://en.wikipedia.org/wiki/Butterfly_curve_(transcendental)" target="_blank"
                rel="noopener noreferrer">
                Butterfly curve in wikipedia.org
            </Anchor>
        </FooterParagraph>
    </EquationsListItem>;
};
