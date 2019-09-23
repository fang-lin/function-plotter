import styled from 'styled-components';

export const StageWrapper = styled.div`
    background-color: #fff;
    width: 100%;
    height: 100%;
    position: relative;
    box-shadow: 0 3px 10px 3px rgba(0, 0, 0, .3);
`;

export const GridCanvas = styled.canvas`
    position: absolute;
    opacity: 0.2;
`;

export const AxisCanvas = styled.canvas`
    position: absolute;
`;

export const EquationCanvas = styled.canvas`
    position: absolute;
`;