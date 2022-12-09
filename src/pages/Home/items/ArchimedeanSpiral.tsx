import React, {FunctionComponent} from 'react';
import {equationsURL} from '../../../helpers';
import {Link, Head3, EquationsListItem, Anchor, Paragraph, FooterParagraph} from '../styles';

export const ArchimedeanSpiral: FunctionComponent = () => {
    const url = equationsURL([['x=t*cos(t);y=t*sin(t);[0,8*PI]', '#26A']], 4);
    return <EquationsListItem>
        <Head3><Link to={url}>Archimedean
            spiral</Link></Head3>
        <Paragraph>
            <Link to={url}>
                x=t*cos(t);<br/>
                y=t*sin(t);
            </Link>
        </Paragraph>
        <FooterParagraph>
            <Anchor href="https://en.wikipedia.org/wiki/Archimedean_spiral" target="_blank" rel="noopener noreferrer">
                Archimedean spiral in wikipedia.org
            </Anchor>
        </FooterParagraph>
    </EquationsListItem>;
};
