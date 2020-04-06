import styled, {createGlobalStyle} from 'styled-components';
import {DragState} from './App.function';

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

const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
};

export const device = {
    mobileS: `(min-width: ${size.mobileS})`,
    mobileM: `(min-width: ${size.mobileM})`,
    mobileL: `(min-width: ${size.mobileL})`,
    tablet: `(min-width: ${size.tablet})`,
    laptop: `(min-width: ${size.laptop})`,
    laptopL: `(min-width: ${size.laptopL})`,
    desktop: `(min-width: ${size.desktop})`,
    desktopL: `(min-width: ${size.desktop})`
};

export const AppWrapper = styled.div<{ dragState: DragState }>`
    min-width: 320px;
    min-height: 320px;
    position: relative;
    ${FullScreen}
    ${({dragState}): string => dragState === DragState.start ? 'cursor: grab;' : ''}
    ${({dragState}): string => dragState === DragState.moving ? 'cursor: grabbing;' : ''}
`;



