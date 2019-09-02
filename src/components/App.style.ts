import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
html, body, #root, .app {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #ccc;
    cursor: crosshair;
    font-family: consolas courier, monospace;
}

.drag_start {
    cursor: grab;
}

.dragging {
    cursor: grabbing;
}
`;