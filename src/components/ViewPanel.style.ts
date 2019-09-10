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

export const ViewPanelWrapper = styled.div`
    position: fixed;
    bottom: 20px;
    left: 20px;
    margin: -5px;
`;

export const CenteredButton = styled(Button)`
    background-image: url(${centered});
    &:hover{
        background-image: url(${centeredHover});
    }
`;

export const SmoothButton = styled(Button)<{ isSmooth: boolean; }>`
    background-image: url(${({isSmooth}) => isSmooth ? smooth : smoothOff});
    &:hover{
        background-image: url(${({isSmooth}) => isSmooth ? smoothHover : smoothOffHover});
    }
`;

export const CoordinateButton = styled(Button)<{ showCoordinate: boolean; }>`
    background-image: url(${({showCoordinate}) => showCoordinate ? coordinate : coordinateOff});
    &:hover{
        background-image: url(${({showCoordinate}) => showCoordinate ? coordinateHover : coordinateOffHover});
    }
`;