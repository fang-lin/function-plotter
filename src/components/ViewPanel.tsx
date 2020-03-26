import React from 'react';
import {ViewPanelWrapper, CenteredButton, SmoothButton, CoordinateButton, WeightButton} from './ViewPanel.style';
import {
    Coordinate,
    Size,
    stopPropagation,
    ParsedParams
} from './App.function';

interface ViewPanelProps {
    getCenteredOrigin: (size: Size) => Coordinate;
    size: Size;
    pushToHistory: (params: Partial<ParsedParams>) => void;
    params: ParsedParams;
}

export const ViewPanel = (props: ViewPanelProps) => {
    const {getCenteredOrigin, size, pushToHistory, params} = props;
    const {isSmooth, isBold, showCoordinate} = params;
    const smoothText = `Smooth: ${isSmooth ? 'On' : 'Off'}`;
    const isBoldText = `Weight: ${isBold ? 'Bold' : 'Light'}`;
    const coordinateText = `Coordinate: ${showCoordinate ? 'On' : 'Off'}`;

    return <ViewPanelWrapper>
        <CenteredButton
            title="Centered"
            {...stopPropagation}
            onClick={() => pushToHistory({origin: getCenteredOrigin(size)})}>
            Centered
        </CenteredButton>
        <SmoothButton
            isSmooth={isSmooth}
            title={smoothText}
            {...stopPropagation}
            onClick={() => pushToHistory({isSmooth: !isSmooth})}>
            {smoothText}
        </SmoothButton>
        <WeightButton
            isBold={isBold}
            title={isBoldText}
            {...stopPropagation}
            onClick={() => pushToHistory({isBold: !isBold})}>
            {isBoldText}
        </WeightButton>
        <CoordinateButton
            showCoordinate={showCoordinate}
            title={coordinateText}
            {...stopPropagation}
            onClick={() => pushToHistory({showCoordinate: !showCoordinate})}>
            {coordinateText}
        </CoordinateButton>
    </ViewPanelWrapper>;
};
