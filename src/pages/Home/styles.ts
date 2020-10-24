import styled, {createGlobalStyle} from 'styled-components';
import {Link} from 'react-router-dom';

export const defaultStyle = `
    margin: 0;
    padding: 0;
    background: #ccc;
    font-family: 'Fira Code',monospace,consolas,courier;
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

export const EquationsList = styled.ul`
`;

export const EquationsListItem = styled.li`
`;
export const Paragraph = styled.p`
    font-size: 12px;
`;

export const Head3 = styled.h3`
    font-size: 20px;
    color: #333;
    text-shadow: 0 1px 1px rgba(255, 255, 255, .7);
    a {
        text-decoration: none;
        color: #333;
    }
    a:hover {
        text-decoration: underline;
    }
`;

export const Links = styled(Link)`
    text-decoration: none;
    color: #333;
    text-shadow: 0 1px 1px rgba(255, 255, 255, .7);
    font-size: 12px;
    &:hover {
        text-decoration: underline;
    }
`;
