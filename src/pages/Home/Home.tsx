import React, {Component, ReactNode} from 'react';
import {version} from '../../../package.json';
import {AppTitle} from '../../components/StateBar/StateBar.style';
import {DefaultGlobalStyle, HomeWrapper} from './Home.style';
import {combinePathToURL, defaultParams} from '../../helpers/diagraphParams';
import {utoa} from '../../helpers/codec';
import {Link} from 'react-router-dom';

const enterURL = combinePathToURL(defaultParams);

const butterflyCurveURL = combinePathToURL({
    ...defaultParams, ...{
        equations: utoa(JSON.stringify([['x=sin(t)(E^cos(t)-2cos(4t)-sin(t/12)^5);y=cos(t)(E^cos(t)-2cos(4t)-sin(t/12)^5);[0,10PI]', 'rgb(238, 102, 0)', true]]))
    }
});

const limaconURL = combinePathToURL({
    ...defaultParams, ...{
        scaleIndex: '9',
        equations: utoa(JSON.stringify([['x=4/2+2cos(t)+4/2cos(2t);y=2sin(t)+4/2sin(2t);[0,2PI]', 'rgb(170, 170, 102)', true]]))
    }
});

const roseCurveURL = combinePathToURL({
    ...defaultParams, ...{
        scaleIndex: '9',
        equations: utoa(JSON.stringify([['x=4*cos(2*t)*cos(t);y=4*cos(2*t)*sin(t);[0,2*PI]', 'rgb(204, 68, 170)', true]]))
    }
});

const fermatSpiralURL = combinePathToURL({
    ...defaultParams, ...{
        scaleIndex: '9',
        equations: utoa(JSON.stringify([
            ['x=t^(1/2)sin(t);y=t^(1/2)cos(t);[0,8*PI]', 'rgb(0, 170, 68)', true],
            ['x=-t^(1/2)sin(t);y=-t^(1/2)cos(t);[0,8*PI]', 'rgb(238, 136, 68)', true]
        ]))
    }
});

const lissajousCurveURL = combinePathToURL({
    ...defaultParams, ...{
        scaleIndex: '9',
        equations: utoa(JSON.stringify([
            ['x=2sin(5t);y=2sin(6t);[0,2PI]', 'rgb(34, 102, 170)', true]
        ]))
    }
});

export class Home extends Component {
    render(): ReactNode {
        return <HomeWrapper>
            <DefaultGlobalStyle/>
            <AppTitle><a href="/">Function Diagram {version}</a></AppTitle>
            <div>
                <ul>
                    <li>
                        <h3><Link to={enterURL}>Enter directly</Link></h3>
                    </li>
                    <li>
                        <h3>Butterfly curve (transcendental)</h3>
                        <Link to={butterflyCurveURL}>
                            x=sin(t)(E^cos(t)-2cos(4t)-sin(t/12)^5);<br/>
                            y=cos(t)(E^cos(t)-2cos(4t)-sin(t/12)^5);
                        </Link>
                    </li>
                    <li>
                        <h3>Limacon</h3>
                        <Link to={limaconURL}>
                            x=4/2+2cos(t)+4/2cos(2t);<br/>
                            y=2sin(t)+4/2sin(2t);
                        </Link>
                    </li>
                    <li>
                        <h3>Rose curve (k=2)</h3>
                        <Link to={roseCurveURL}>
                            x=4*cos(2*t)*cos(t);<br/>
                            y=4*cos(2*t)*sin(t);
                        </Link>
                    </li>
                    <li>
                        <h3>Fermat&apos;s spiral</h3>
                        <Link to={fermatSpiralURL}>
                            x=t^(1/2)sin(t);<br/>
                            y=t^(1/2)cos(t);<br/>
                            <br/>
                            x=-t^(1/2)sin(t);<br/>
                            y=-t^(1/2)cos(t);
                        </Link>
                    </li>
                    <li>
                        <h3>Lissajous curve</h3>
                        <Link to={lissajousCurveURL}>
                            x=2sin(5t);<br/>
                            y=2sin(6t);
                        </Link>
                    </li>
                    <li>
                        <h3>Archimedean spiral</h3>
                        <a>
                            x=t*cos(t);<br/>
                            y=t*sin(t);<br/>
                            [0,8*PI]
                        </a>
                    </li>
                    <li>
                        <h3>Hypocycloid</h3>
                    </li>
                    <li>
                        <a>
                            x=t*cos(t);<br/>
                            y=t*sin(t);<br/>
                            [-2.5*PI,2.5*PI]
                        </a>
                    </li>
                    <li>
                        <a>
                            x=4*(sin(2*t)+0.2*sin(80*t))*cos(t);<br/>
                            y=4*(sin(2*t)+0.2*sin(80*t))*sin(t);<br/>
                            [0,2*PI]
                        </a>
                    </li>
                    <li>
                        <h3>Rose curve (k=8)</h3>
                        <a>
                            x=cos(8*t)*cos(t);<br/>
                            y=cos(8*t)*sin(t);<br/>
                            [0,2*PI]
                        </a>
                    </li>
                    <li>
                        <h3>Rose curve (k=3)</h3>
                        <a>
                            x=cos(3*t)*cos(t);<br/>
                            y=cos(3*t)*sin(t);<br/>
                            [0,2*PI]
                        </a>
                    </li>
                    <li>
                        <h3>Rose curve (k=3)</h3>
                        <a>
                            x=cos(16t)*cos(t);y=cos(16t)*sin(t);[0.1,2*PI];???
                        </a>
                    </li>
                </ul>
            </div>
        </HomeWrapper>;
    }
}




