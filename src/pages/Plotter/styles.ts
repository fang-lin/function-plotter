import styled, {createGlobalStyle} from 'styled-components';
import {DragState} from './functions';
import {defaultStyle} from '../Home/styles';

const fullScreenStyle = `
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

export const FullScreenGlobalStyle = createGlobalStyle`
    html, body, #root {
        ${defaultStyle}
        ${fullScreenStyle}
    }
`;

export const AppWrapper = styled.div<{ dragState: DragState; showCrossCursor: boolean }>`
    min-width: 320px;
    min-height: 320px;
    position: relative;
    cursor: ${({showCrossCursor}): string => showCrossCursor ? 'none' : 'crosshair'};
    ${defaultStyle}
    ${fullScreenStyle}
    ${({dragState}): string => dragState === DragState.start ? 'cursor: grab;' : ''}
    ${({dragState}): string => dragState === DragState.moving ? 'cursor: grabbing;' : ''}
`;



