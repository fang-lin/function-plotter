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
                <Title><Link to={enterURL}>Function Plotter {version}</Link></Title>
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
                <Anchor href="./">Function Plotter {version}</Anchor>
                &nbsp;|&nbsp;
                <Anchor href="https://github.com/fang-lin/function-plotter" target="_blank">GitHub</Anchor>
                &nbsp;|&nbsp;
                <Anchor href="https://www.fanglin.me/" target="_blank">Lin Fang in {(new Date()).getFullYear()}</Anchor>
                &nbsp;|&nbsp;
                <Anchor href="https://algorythm.fanglin.me/" target="_blank">Sorting Animation</Anchor>
            </HomeFooter>
        </HomeRoot>;
    }
}




