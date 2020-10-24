import React, {Component, ReactNode} from 'react';
import {version} from '../../../package.json';
import {DefaultGlobalStyle, HomeWrapper, EquationsList, Title} from './styles';
import {combinePathToURL, defaultParams} from '../../helpers';
import {Link} from 'react-router-dom';
import {ButterflyCurve} from './items/ButterflyCurve';
import {Limacon} from './items/Limacon';
import {RoseCurve} from './items/RoseCurve';
import {FermatSpiral} from './items/FermatSpiral';
import {LissajousCurve} from './items/LissajousCurve';
import {ArchimedeanSpiral} from './items/ArchimedeanSpiral';
import {Hypocycloid} from './items/Hypocycloid';

const enterURL = combinePathToURL(defaultParams);

export class Home extends Component {
    render(): ReactNode {
        return <HomeWrapper>
            <DefaultGlobalStyle/>
            <Title><Link to={enterURL}>Function Diagram {version}</Link></Title>
            <EquationsList>
                <ButterflyCurve/>
                <Limacon/>
                <RoseCurve/>
                <FermatSpiral/>
                <LissajousCurve/>
                <ArchimedeanSpiral/>
                <Hypocycloid/>
            </EquationsList>
        </HomeWrapper>;
    }
}




