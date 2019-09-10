import styled, {createGlobalStyle} from 'styled-components';
import {DragEventNames} from '../services/utilities';

const FullScreen = `
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #ccc;
    cursor: crosshair;
    font-family: monospace, consolas, courier;
`;

export const GlobalStyle = createGlobalStyle`
    html, body, #root {
        ${FullScreen}
    }
`;

export const AppStyle = styled.div<{ dragState: DragEventNames }>`
    ${FullScreen}
    ${({dragState}) => dragState === 'START' && 'cursor: grab;'}
    ${({dragState}) => dragState === 'MOVING' && 'cursor: grabbing;'}
`;


