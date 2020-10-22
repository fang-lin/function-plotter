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

export const Title = styled.h1`
    margin: 5px 0;
    font-size: 18px;
    line-height: 30px;
    a { 
        text-decoration: none; 
        color: #333;
        text-shadow: 0 1px 1px rgba(255, 255, 255, .7);
    }
`;

export const HomeWrapper = styled.div`
    padding: 30px;
`;

export const EquationsList = styled.div`
    color: #333;
    text-shadow: 0 1px 1px rgba(255, 255, 255, .7);
    h3 {
        font-size: 20px;
    }
    ul {
        
    }
    li {
    }
    p {
        
    }
    a {
        text-decoration: none;
        color: #333;
        text-shadow: 0 1px 1px rgba(255, 255, 255, .7);
        font-size: 12px;
    }
    a:hover {
        color: #333;
        text-decoration: underline;
    }
`;
