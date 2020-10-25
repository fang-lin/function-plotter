import React, {Component, ReactNode} from 'react';
import {version} from '../../../package.json';
import {
    DefaultGlobalStyle,
    HomeRoot,
    Link,
    HomeHeader,
    HomeFooter,
    HomeContainer,
    EquationsList,
    Title,
    Anchor
} from './styles';
import {combinePathToURL, defaultParams} from '../../helpers';
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
        return <HomeRoot>
            <HomeHeader>
                <Title><Link to={enterURL}>Function Diagram {version}</Link></Title>
            </HomeHeader>
            <HomeContainer>
                <DefaultGlobalStyle/>
                <EquationsList>
                    <ButterflyCurve/>
                    <Limacon/>
                    <RoseCurve/>
                    <FermatSpiral/>
                    <LissajousCurve/>
                    <ArchimedeanSpiral/>
                    <Hypocycloid/>
                </EquationsList>
            </HomeContainer>
            <HomeFooter>
                <Anchor href="./">Homepage</Anchor>
                &nbsp;|&nbsp;
                <Anchor href="https://github.com/fang-lin/function-diagraph" target="_blank"
                    rel="noopener noreferrer">GitHub</Anchor>
                &nbsp;|&nbsp;
                <Anchor href="#">Lin Fang in {(new Date()).getFullYear()}</Anchor>
            </HomeFooter>
        </HomeRoot>;
    }
}




