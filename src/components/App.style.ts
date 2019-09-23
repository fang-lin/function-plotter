import styled, {createGlobalStyle} from 'styled-components';
import {DRAG_STATE} from "./App.function";

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

export const AppStyle = styled.div<{ dragState: DRAG_STATE }>`
    ${FullScreen}
    ${({dragState}) => dragState === DRAG_STATE.START && 'cursor: grab;'}
    ${({dragState}) => dragState === DRAG_STATE.MOVING && 'cursor: grabbing;'}
`;


