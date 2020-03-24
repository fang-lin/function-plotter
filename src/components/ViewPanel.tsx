import React, {Dispatch, SetStateAction} from 'react';
import {ViewPanelWrapper, CenteredButton, SmoothButton, CoordinateButton, WeightButton} from './ViewPanel.style';
import {
    Coordinate,
    Size,
    stopPropagation,
    ConvertedParams
} from './App.function';

interface ViewPanelProps {
    getCenteredOrigin: (size: Size) => Coordinate;
    size: Size;
    pushToHistory: (params: Partial<ConvertedParams>) => void;
    params: ConvertedParams;
}

export const ViewPanel = (props: ViewPanelProps) => {
    const {getCenteredOrigin, size, pushToHistory, params} = props;
    const {SMOOTH, IS_BOLD, SHOW_COORDINATE} = params;
    const smoothText = `Smooth: ${SMOOTH ? 'On' : 'Off'}`;
    const isBoldText = `Weight: ${IS_BOLD ? 'Bold' : 'Light'}`;
    const coordinateText = `Coordinate: ${SHOW_COORDINATE ? 'On' : 'Off'}`;

    return <ViewPanelWrapper>
        <CenteredButton
            title="Centered"
            {...stopPropagation}
            onClick={() => pushToHistory({ORIGIN: getCenteredOrigin(size)})}>
            Centered
        </CenteredButton>
        <SmoothButton
            isSmooth={SMOOTH}
            title={smoothText}
            {...stopPropagation}
            onClick={() => pushToHistory({SMOOTH: !SMOOTH})}>
            {smoothText}
        </SmoothButton>
        <WeightButton
            isBold={IS_BOLD}
            title={isBoldText}
            {...stopPropagation}
            onClick={() => pushToHistory({IS_BOLD: !IS_BOLD})}>
            {isBoldText}
        </WeightButton>
        <CoordinateButton
            showCoordinate={SHOW_COORDINATE}
            title={coordinateText}
            {...stopPropagation}
            onClick={() => pushToHistory({SHOW_COORDINATE: !SHOW_COORDINATE})}>
            {coordinateText}
        </CoordinateButton>
    </ViewPanelWrapper>;
};
