import React, {Dispatch, SetStateAction} from 'react';
import {ViewPanelWrapper, CenteredButton, SmoothButton, CoordinateButton} from './ViewPanel.style';
import {Coordinate, Size} from '../services/utilities';

interface ViewPanelProps {
    getCenteredOrigin: (size: Size) => Coordinate;
    setOrigin: Dispatch<SetStateAction<Coordinate>>;
    size: Size;
    smooth: boolean;
    setSmooth: Dispatch<SetStateAction<boolean>>
    showCoordinate: boolean;
    setShowCoordinate: Dispatch<SetStateAction<boolean>>;
}

export const ViewPanel = (props: ViewPanelProps) => {
    const {getCenteredOrigin, size, setOrigin, smooth, setSmooth, showCoordinate, setShowCoordinate} = props;
    const smoothText = `Smooth: ${smooth ? 'On' : 'Off'}`;
    const coordinateText = `Coordinate: ${showCoordinate ? 'On' : 'Off'}`;

    return <ViewPanelWrapper>
        <CenteredButton
            title="Centered"
            onClick={() => setOrigin(getCenteredOrigin(size))}>
            Centered
        </CenteredButton>
        <SmoothButton
            isSmooth={smooth}
            title={smoothText}
            onClick={() => setSmooth(!smooth)}>
            {smoothText}
        </SmoothButton>
        <CoordinateButton
            showCoordinate={showCoordinate}
            title={coordinateText}
            onClick={() => setShowCoordinate(!showCoordinate)}>
            {coordinateText}
        </CoordinateButton>
    </ViewPanelWrapper>;
};
