import styled from 'styled-components';
import cornerOff from '../images/corner-off.png';
import cornerOffHover from '../images/corner-off-hover.png';
import cornerOn from '../images/corner-on.png';
import cornerOnHover from '../images/corner-on-hover.png';

const width = 320;

export const EquationPanelWrapper = styled.div<{
    displayEquationPanel: boolean
}>`
    position: absolute;
    ${({displayEquationPanel}) => displayEquationPanel ? 'top: 0' : 'bottom: calc(100% - 24px)'};
    right: ${({displayEquationPanel}) => displayEquationPanel ? 0 : 24 - width}px;
    width: ${width}px;
    padding: 20px 0 0 0;
    background: #eee;
    border-radius: 0 0 0 4px;
    border-style: solid;
    border-color: #666;
    border-width: 0 0 1px 1px;
    box-shadow: 0 5px 20px rgba(0,0,0,.7);
    overflow: hidden;
    background-color: #eee;
`;

export const EquationPanelInner = styled.div`
    width: 640px;
    padding: 30px;
`;

export const Title = styled.div`
    background-color: #ccc;
    border-width: 1px 0;
    border-style: solid;
    border-color: #666;
    color: #333;
    padding: 15px 30px;
    display: flex;
    font-size: 14px;
    justify-content: space-between;
    text-shadow: 0 1px 1px rgba(255,255,255,.7);
`;


export const DisplayToggle = styled.button<{
    displayEquationPanel: boolean
}>`
    position: absolute;
    left: 0;
    bottom: 0;
    border: medium none;
    height: 16px;
    width: 16px;
    outline: none;
    background-image: url(${({displayEquationPanel}) => displayEquationPanel ? cornerOn : cornerOff});
    background-size: 16px 16px;
    :hover{
        background-image: url(${({displayEquationPanel}) => displayEquationPanel ? cornerOnHover : cornerOffHover});
    }
`;
