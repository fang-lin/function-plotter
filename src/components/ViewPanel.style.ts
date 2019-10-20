import styled from 'styled-components';
import toCenter from '../images/to-center.png';
import smoothOn from '../images/smooth-on.png';
import smoothOff from '../images/smooth-off.png';
import coordinateOn from '../images/coord-on.png';
import coordinateOff from '../images/coord-off.png';
import toCenterHover from '../images/to-center-hover.png';
import smoothOnHover from '../images/smooth-on-hover.png';
import smoothOffHover from '../images/smooth-off-hover.png';
import coordinateOnHover from '../images/coord-on-hover.png';
import coordinateOffHover from '../images/coord-off-hover.png';
import lightCurve from '../images/light-curve.png';
import lightCurveHover from '../images/light-curve-hover.png';
import boldCurve from '../images/bold-curve.png';
import boldCurveHover from '../images/bold-curve-hover.png';
import {LargeIconButton} from "./Base.style";

export const ViewPanelWrapper = styled.div`
    position: absolute;
    bottom: 20px;
    left: 20px;
    margin: -5px;
`;

export const CenteredButton = styled(LargeIconButton)`
    margin-right: 5px;
    background-image: url(${toCenter});
    :hover{
        background-image: url(${toCenterHover});
    }
`;

export const SmoothButton = styled(LargeIconButton)<{ isSmooth: boolean; }>`
    margin-right: 5px;
    background-image: url(${({isSmooth}) => isSmooth ? smoothOn : smoothOff});
    :hover{
        background-image: url(${({isSmooth}) => isSmooth ? smoothOnHover : smoothOffHover});
    }
`;

export const WeightButton = styled(LargeIconButton)<{ isBold: boolean; }>`
    margin-right: 5px;
    background-image: url(${({isBold}) => isBold ? boldCurve : lightCurve});
    :hover{
        background-image: url(${({isBold}) => isBold ? boldCurveHover : lightCurveHover});
    }
`;

export const CoordinateButton = styled(LargeIconButton)<{ showCoordinate: boolean; }>`
    margin-right: 5px;
    background-image: url(${({showCoordinate}) => showCoordinate ? coordinateOn : coordinateOff});
    :hover{
        background-image: url(${({showCoordinate}) => showCoordinate ? coordinateOnHover : coordinateOffHover});
    }
`;
