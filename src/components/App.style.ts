import styled, {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html, body, #root {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: #ccc;
        cursor: crosshair;
        font-family: consolas courier, monospace;
    }
`;

export const AppStyle = styled.div<{
    isDragging: boolean
}>`
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #ccc;
    cursor: crosshair;
    font-family: consolas courier, monospace;
    cursor: ${({isDragging}) => isDragging ? 'grabbing' : 'grab'};
`;


