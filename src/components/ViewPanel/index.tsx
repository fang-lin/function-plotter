import React, {FunctionComponent} from 'react';
import {CenteredButton, CoordinateButton, SmoothButton, ViewPanelWrapper, WeightButton} from './styles';
import {ParsedParams} from '../../helpers';
import {stopPropagation} from '../../pages/Diagraph';

interface ViewPanelProps {
    pushToHistory: (params: Partial<ParsedParams>) => void;
    params: ParsedParams;
}

export const ViewPanel: FunctionComponent<ViewPanelProps> = (props) => {
    const {pushToHistory, params: {isSmooth, isBold, showCrossCursor}} = props;

    const smoothText = `Smooth: ${isSmooth ? 'On' : 'Off'}`;

    const isBoldText = `Weight: ${isBold ? 'Bold' : 'Light'}`;

    const coordinateText = `Coordinate: ${showCrossCursor ? 'On' : 'Off'}`;

    return <ViewPanelWrapper>
        <CenteredButton
            title="Centered"
            {...stopPropagation}
            onClick={(): void => pushToHistory({origin: [0, 0]})}>
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
