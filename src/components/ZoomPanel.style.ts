import styled from 'styled-components';
import ZoomIn from '../images/zoom-in.png';
import ZoomOut from '../images/zoom-out.png';
import ZoomInHover from '../images/zoom-in-hover.png';
import ZoomOutHover from '../images/zoom-out-hover.png';
import x1 from '../images/x1.png';
import x2 from '../images/x2.png';
import x3 from '../images/x3.png';
import x4 from '../images/x4.png';
import x5 from '../images/x5.png';
import x6 from '../images/x6.png';
import x7 from '../images/x7.png';
import x8 from '../images/x8.png';
import x9 from '../images/x9.png';
import x10 from '../images/x10.png';
import x11 from '../images/x11.png';
import x12 from '../images/x12.png';
import x13 from '../images/x13.png';
import x14 from '../images/x14.png';
import x15 from '../images/x15.png';
import x16 from '../images/x16.png';
import x1Hover from '../images/x1-hover.png';
import x2Hover from '../images/x2-hover.png';
import x3Hover from '../images/x3-hover.png';
import x4Hover from '../images/x4-hover.png';
import x5Hover from '../images/x5-hover.png';
import x6Hover from '../images/x6-hover.png';
import x7Hover from '../images/x7-hover.png';
import x8Hover from '../images/x8-hover.png';
import x9Hover from '../images/x9-hover.png';
import x10Hover from '../images/x10-hover.png';
import x11Hover from '../images/x11-hover.png';
import x12Hover from '../images/x12-hover.png';
import x13Hover from '../images/x13-hover.png';
import x14Hover from '../images/x14-hover.png';
import x15Hover from '../images/x15-hover.png';
import x16Hover from '../images/x16-hover.png';

const levels = [x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12, x13, x14, x15, x16];
const hovers = [
    x1Hover, x2Hover, x3Hover, x4Hover,
    x5Hover, x6Hover, x7Hover, x8Hover,
    x9Hover, x10Hover, x11Hover, x12Hover,
    x13Hover, x14Hover, x15Hover, x16Hover
];

export const ZoomPanelWrapper = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    margin: -5px;
`;

export const Button = styled.button`
    width: 28px;
    height: 28px;
    background-size: 28px 28px;
    border: none medium;
    background-color: transparent;
    font-size: 0;
    line-height: 0;
    color: transparent;
    cursor: pointer;
    outline: none;
    margin: 5px;
    padding: 0;
`;

export const ZoomInButton = styled(Button)`
    margin-right: -1px;
    background-image: url(${ZoomIn});
    &:hover {
        background-image: url(${ZoomInHover});
    }
`;

export const ZoomOutButton = styled(Button)`
    margin-left: 0;
    background-image: url(${ZoomOut});
    &:hover {
        background-image: url(${ZoomOutHover});
    }
`;

export const ZoomLevelButton = styled(Button)<{ level: number; }>`
    background-image: url(${({level}) => levels[level]});
    &:hover{
        background-image: url(${({level}) => hovers[level]});
    }
`;
