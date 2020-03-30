import React, {FunctionComponent} from 'react';
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

export const ViewPanel: FunctionComponent<ViewPanelProps> = (props) => {
    const {getCenteredOrigin, size, pushToHistory, params} = props;
    const {isSmooth, isBold, showCrossCursor} = params;
    const smoothText = `Smooth: ${isSmooth ? 'On' : 'Off'}`;
    const isBoldText = `Weight: ${isBold ? 'Bold' : 'Light'}`;
    const coordinateText = `Coordinate: ${showCrossCursor ? 'On' : 'Off'}`;

    return <ViewPanelWrapper>
        <CenteredButton
            title="Centered"
            {...stopPropagation}
            onClick={(): void => pushToHistory({origin: getCenteredOrigin(size)})}>
            Centered
        </CenteredButton>
        <SmoothButton
            isSmooth={isSmooth}
            title={smoothText}
            {...stopPropagation}
            onClick={(): void => pushToHistory({isSmooth: !isSmooth})}>
            {smoothText}
        </SmoothButton>
        <WeightButton
            isBold={isBold}
            title={isBoldText}
            {...stopPropagation}
            onClick={(): void => pushToHistory({isBold: !isBold})}>
            {isBoldText}
        </WeightButton>
        <CoordinateButton
            showCoordinate={showCrossCursor}
            title={coordinateText}
            {...stopPropagation}
            onClick={(): void => pushToHistory({showCrossCursor: !showCrossCursor})}>
            {coordinateText}
        </CoordinateButton>
    </ViewPanelWrapper>;
};
