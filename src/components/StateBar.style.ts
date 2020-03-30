import styled from 'styled-components';

export const StateBarWrapper = styled.div`
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 12px;
    font-weight: normal;
    margin: 0 -5px;
`;
export const AppTitle = styled.h1`
    font-size: 12px;
    margin: 3px 5px;
    a{ text-decoration: none; }
`;
export const CoordinateLabel = styled.div`
    margin: 3px 5px;
`;
export const IsDrawing = styled.div<{ redrawing: boolean }>`
    margin: 3px 5px;
    transition: all .3s;
    opacity: ${({redrawing}): string => redrawing ? '1' : '0'};
`;
