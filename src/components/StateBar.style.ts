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
    display: inline;
    font-size: 12px;
    margin: 3px 5px;
    a{
        text-decoration: none;
    }
`;
export const CoordinateLabel = styled.div`
    margin: 3px 5px;
`;
export const IsDrawing = styled.span<{ redrawing: boolean; }>`
    transition: all .1s;
    opacity: ${({redrawing}) => redrawing ? '1' : '0'};
`;
