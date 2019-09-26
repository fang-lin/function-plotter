import styled from 'styled-components';
import {DragState} from "./App.function";

export const PaletteWrapper = styled.div`
    position: relative;
    z-index: 1000;
    top: 100px;
    left: 100px;
    cursor: pointer;
`;

export const PaletteCanvas = styled.canvas`
    position: absolute;
`;

export const PickerCanvas = styled.canvas`
    position: absolute;
`;

export const CoverCanvas = styled.canvas`
    position: absolute;
`;
