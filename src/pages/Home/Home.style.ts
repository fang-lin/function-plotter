import styled, {createGlobalStyle} from 'styled-components';

export const defaultStyle = `
    margin: 0;
    padding: 0;
    background: #ccc;
    font-family: monospace, consolas, courier;
`;

export const DefaultGlobalStyle = createGlobalStyle`
    html, body, #root {
        ${defaultStyle}
    }
`;

export const HomeWrapper = styled.div`
    padding: 30px;
`;
