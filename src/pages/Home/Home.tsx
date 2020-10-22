import React, {Component, ReactNode} from 'react';
import {version} from '../../../package.json';
import {DefaultGlobalStyle, HomeWrapper, EquationsList, Title} from './Home.style';
import {combinePathToURL, defaultParams} from '../../helpers';
import {Link} from 'react-router-dom';
import {ButterflyCurve} from './ButterflyCurve';
import {Limacon} from './Limacon';
import {RoseCurve} from './RoseCurve';
import {FermatSpiral} from './FermatSpiral';
import {LissajousCurve} from './LissajousCurve';
import {ArchimedeanSpiral} from './ArchimedeanSpiral';
import {Hypocycloid} from './Hypocycloid';

const enterURL = combinePathToURL(defaultParams);

export class Home extends Component {
    render(): ReactNode {
        return <HomeWrapper>
            <DefaultGlobalStyle/>
            <Title><Link to={enterURL}>Function Diagram {version}</Link></Title>
            <EquationsList>
                <ul>
                    <ButterflyCurve/>
                    <Limacon/>
                    <RoseCurve/>
                    <FermatSpiral/>
                    <LissajousCurve/>
                    <ArchimedeanSpiral/>
                    <Hypocycloid/>
                </ul>
            </EquationsList>
        </HomeWrapper>;
    }
}




