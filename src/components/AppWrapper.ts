import styled, {createGlobalStyle} from 'styled-components';
import {DragState} from "./App.function";

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

export const AppWrapper = styled.div<{ dragState: DragState }>`
    min-width: 320px;
    min-height: 320px;
    position: relative;
    ${FullScreen}
    ${({dragState}) => dragState === DragState.start && 'cursor: grab;'}
    ${({dragState}) => dragState === DragState.moving && 'cursor: grabbing;'}
`;



