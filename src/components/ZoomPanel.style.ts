import styled from 'styled-components';
import ZoomIn from '../images/zoom-in.png';
import ZoomOut from '../images/zoom-out.png';
import ZoomInHover from '../images/zoom-in-hover.png';
import ZoomOutHover from '../images/zoom-out-hover.png';
import x1 from '../images/x1.png';
import x1Hover from '../images/x1-hover.png';
import x2 from '../images/x2.png';
import x2Hover from '../images/x2-hover.png';
import x3 from '../images/x3.png';
import x3Hover from '../images/x3-hover.png';
import x4 from '../images/x4.png';
import x4Hover from '../images/x4-hover.png';
import x5 from '../images/x5.png';
import x5Hover from '../images/x5-hover.png';
import x6 from '../images/x6.png';
import x6Hover from '../images/x6-hover.png';
import x7 from '../images/x7.png';
import x7Hover from '../images/x7-hover.png';
import x8 from '../images/x8.png';
import x8Hover from '../images/x8-hover.png';
import x9 from '../images/x9.png';
import x9Hover from '../images/x9-hover.png';
import x10 from '../images/x10.png';
import x10Hover from '../images/x10-hover.png';
import x11 from '../images/x11.png';
import x11Hover from '../images/x11-hover.png';
import x12 from '../images/x12.png';
import x12Hover from '../images/x12-hover.png';
import x13 from '../images/x13.png';
import x13Hover from '../images/x13-hover.png';
import x14 from '../images/x14.png';
import x14Hover from '../images/x14-hover.png';
import x15 from '../images/x15.png';
import x15Hover from '../images/x15-hover.png';
import x16 from '../images/x16.png';
import x16Hover from '../images/x16-hover.png';
import x17 from '../images/x17.png';
import x17Hover from '../images/x17-hover.png';
import x18 from '../images/x18.png';
import x18Hover from '../images/x18-hover.png';
import x19 from '../images/x19.png';
import x19Hover from '../images/x19-hover.png';
import x20 from '../images/x20.png';
import x20Hover from '../images/x20-hover.png';
import x21 from '../images/x21.png';
import x21Hover from '../images/x21-hover.png';
import x22 from '../images/x22.png';
import x22Hover from '../images/x22-hover.png';
import x23 from '../images/x23.png';
import x23Hover from '../images/x23-hover.png';
import x24 from '../images/x24.png';
import x24Hover from '../images/x24-hover.png';
import {LargeIconButton} from './Dialog.style';

const levels = [x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12, x13, x14, x15, x16, x17, x18, x19, x20, x21, x22, x23, x24];
const hovers = [
    x1Hover, x2Hover, x3Hover, x4Hover,
    x5Hover, x6Hover, x7Hover, x8Hover,
    x9Hover, x10Hover, x11Hover, x12Hover,
    x13Hover, x14Hover, x15Hover, x16Hover,
    x17Hover, x18Hover, x19Hover, x20Hover,
    x21Hover, x22Hover, x23Hover, x24Hover
];

export const ZoomPanelWrapper = styled.div`
    position: absolute;
    bottom: 20px;
    right: 20px;
    margin: -5px;
`;

export const ShadowWrapper = styled.div`
    margin: 5px;
    display: inline-block;
    border-radius: 6px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .3);
`;

export const ZoomInButton = styled(LargeIconButton)`
    border-radius: 6px 0 0 6px;
    margin-right: -1px;
    background-image: url(${ZoomIn});
    box-shadow: none;
    :hover {
        background-image: url(${ZoomInHover});
    }
`;

export const ZoomOutButton = styled(LargeIconButton)`
    border-radius: 0 6px 6px 0;
    background-image: url(${ZoomOut});
    box-shadow: none;
    :hover {
        background-image: url(${ZoomOutHover});
    }
`;

export const ZoomLevelButton = styled(LargeIconButton)<{ scaleLevel: number }>`
    margin: 5px;
    background-image: url(${({scaleLevel}): string => levels[scaleLevel - 1]});
    :hover{
        background-image: url(${({scaleLevel}): string => hovers[scaleLevel - 1]});
    }
`;
