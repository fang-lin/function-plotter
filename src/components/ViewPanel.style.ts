import styled from 'styled-components';
import {Button} from './ZoomPanel.style';
import centered from '../images/centered.png';
import smooth from '../images/smooth.png';
import smoothOff from '../images/smooth-off.png';
import coordinate from '../images/coord.png';
import coordinateOff from '../images/coord-off.png';
import centeredHover from '../images/centered-hover.png';
import smoothHover from '../images/smooth-hover.png';
import smoothOffHover from '../images/smooth-off-hover.png';
import coordinateHover from '../images/coord-hover.png';
import coordinateOffHover from '../images/coord-off-hover.png';
import lightCurve from '../images/light-curve.png';
import lightCurveHover from '../images/light-curve-hover.png';
import boldCurve from '../images/bold-curve.png';
import boldCurveHover from '../images/bold-curve-hover.png';

export const ViewPanelWrapper = styled.div`
    position: absolute;
    bottom: 20px;
    left: 20px;
    margin: -5px;
`;

export const CenteredButton = styled(Button)`
    background-image: url(${centered});
    :hover{
        background-image: url(${centeredHover});
    }
`;

export const SmoothButton = styled(Button)<{ isSmooth: boolean; }>`
    background-image: url(${({isSmooth}) => isSmooth ? smooth : smoothOff});
    :hover{
        background-image: url(${({isSmooth}) => isSmooth ? smoothHover : smoothOffHover});
    }
`;

export const WeightButton = styled(Button)<{ isBold: boolean; }>`
    background-image: url(${({isBold}) => isBold ? boldCurve : lightCurve});
    :hover{
        background-image: url(${({isBold}) => isBold ? boldCurveHover : lightCurveHover});
    }
`;

export const CoordinateButton = styled(Button)<{ showCoordinate: boolean; }>`
    background-image: url(${({showCoordinate}) => showCoordinate ? coordinate : coordinateOff});
    :hover{
        background-image: url(${({showCoordinate}) => showCoordinate ? coordinateHover : coordinateOffHover});
    }
`;
