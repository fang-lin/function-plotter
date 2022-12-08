import React, {FunctionComponent} from 'react';
import {equationsURL} from '../../../helpers';
import {Link, Head3, EquationsListItem, Anchor, Paragraph} from '../styles';

export const FermatSpiral: FunctionComponent = () => {
    const url = equationsURL([
        ['x=t^(1/2)sin(t);y=t^(1/2)cos(t);[0,8*PI]', '#4A8'],
        ['x=-t^(1/2)sin(t);y=-t^(1/2)cos(t);[0,8*PI]', '#E84']
    ], 9);
    return <EquationsListItem>
        <Head3><Link to={url}>Fermat&apos;s spiral</Link></Head3>
        <Paragraph>
            <Link to={url}>
                x=t^(1/2)sin(t);<br/>
                y=t^(1/2)cos(t);<br/>
                <br/>
                x=-t^(1/2)sin(t);<br/>
                y=-t^(1/2)cos(t);
            </Link>
        </Paragraph>
        <Paragraph>
            <Anchor href="https://en.wikipedia.org/wiki/Fermat%27s_spiral" target="_blank" rel="noopener noreferrer">
                Fermat&apos;s spiral in wikipedia.org
            </Anchor>
        </Paragraph>
    </EquationsListItem>;
};
