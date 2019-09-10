import styled from 'styled-components';

export const StateBarWrapper = styled.div`
    position: fixed;
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
export const Coordinate = styled.div`
    margin: 3px 5px;
`;
export const IsDrawing = styled.span<{ isRedrawing: boolean; }>`
    transition: all .1s;
    opacity: ${({isRedrawing}) => isRedrawing ? '1' : '0'};
`;
