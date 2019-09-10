import styled from 'styled-components';
import {Coordinate} from "./App";

interface CanvasProps {
    size: Coordinate
}

interface StageProps {
    transform: Coordinate
}

export const StageWrapper = styled.div<StageProps>`
    background-color: #fff;
    width: 100%;
    height: 100%;
    position: relative;
    box-shadow: 0 3px 10px 3px rgba(0, 0, 0, .3);
    transform: translate(${({transform}) => transform[0]}px, ${({transform}) => transform[1]}px)
`;
export const GridCanvas = styled.canvas<CanvasProps>`
    position: absolute;
    width: ${({size}) => size[0]}px;
    height: ${({size}) => size[1]}px;
`;

export const AxisCanvas = styled.canvas<CanvasProps>`
    position: absolute;
    width: ${({size}) => size[0]}px;
    height: ${({size}) => size[1]}px;
`;

export const EquationCanvas = styled.canvas<CanvasProps>`
    position: absolute;
    width: ${({size}) => size[0]}px;
    height: ${({size}) => size[1]}px;
`;
