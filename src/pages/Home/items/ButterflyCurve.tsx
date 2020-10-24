import React, {FunctionComponent} from 'react';
import {equationsURL} from '../../../helpers';
import {Link, Head3, EquationsListItem, Anchor} from '../styles';

export const ButterflyCurve: FunctionComponent = () => {
    return <EquationsListItem>
        <Head3>
            <Anchor href="https://en.wikipedia.org/wiki/Butterfly_curve_(transcendental)" target="_blank"
                rel="noopener noreferrer">
                Butterfly curve
            </Anchor>
        </Head3>
        <Link to={equationsURL([[
            'x=sin(t)(E^cos(t)-2cos(4t)-sin(t/12)^5);y=cos(t)(E^cos(t)-2cos(4t)-sin(t/12)^5);[0,20PI]',
            '#E60',
        ]], 11)}>
            x=sin(t)(E^cos(t)-2cos(4t)-sin(t/12)^5);<br/>
            y=cos(t)(E^cos(t)-2cos(4t)-sin(t/12)^5);
        </Link>
    </EquationsListItem>;
};