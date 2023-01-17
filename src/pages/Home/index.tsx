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
    FooterAnchor, TitleIcon
} from './styles';
import {combinePathToURL, defaultParams} from '../../helpers';
import {ButterflyCurve} from './items/ButterflyCurve';
import {Limacon} from './items/Limacon';
import {RoseCurve} from './items/RoseCurve';
import {FermatSpiral} from './items/FermatSpiral';
import {LissajousCurve} from './items/LissajousCurve';
import {ArchimedeanSpiral} from './items/ArchimedeanSpiral';
import {Hypocycloid} from './items/Hypocycloid';
import {Ellipse} from './items/Ellipse';
import {Hyperbola} from './items/Hyperbola';
import calculusIcon from '../../images/calculus.png';
import {Trigonometric} from './items/Trigonometric';

const enterURL = combinePathToURL(defaultParams);

export class Home extends Component {
    render(): ReactNode {
        return <HomeRoot>
            <HomeHeader>
                <Title><Link to={enterURL}><TitleIcon src={calculusIcon} alt="icon"/>Function Plotter {version}</Link></Title>
            </HomeHeader>
            <HomeContainer>
                <DefaultGlobalStyle/>
                <EquationsList>
                    <Hyperbola/>
                    <Ellipse/>
                    <Trigonometric/>
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
                <FooterAnchor href="./">Function Plotter {version}</FooterAnchor> | <FooterAnchor
                    href="https://github.com/fang-lin/function-plotter" target="_blank">GitHub</FooterAnchor> | <FooterAnchor
                    href="https://www.fanglin.me/" target="_blank">Lin Fang in {(new Date()).getFullYear()}</FooterAnchor> | <FooterAnchor
                    href="https://algorythm.fanglin.me/" target="_blank">algoRYTHM</FooterAnchor> | <FooterAnchor
                    href="https://game-of-life.fanglin.me/" target="_blank">Game of Life</FooterAnchor>
            </HomeFooter>
        </HomeRoot>;
    }
}




