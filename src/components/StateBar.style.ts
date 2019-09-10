import styled from 'styled-components';

export const StateBarWrapper = styled.h1`
    position: fixed;
    top: 20px;
    left: 20px;
    font-size: 12px;
    font-weight: normal;
    margin: 0 -5px;
`;
export const AppTitle = styled.a`
    display: inline-block;
    margin: 3px 5px;
    text-decoration: none;
`;
export const Coordinate = styled.span`
    margin: 3px 5px;
`;
export const IsDrawing = styled.span<{
    isRedrawing: boolean;
}>`
    transition: all .1s;
    opacity: ${({isRedrawing}) => isRedrawing ? '1' : '0'};
`;
