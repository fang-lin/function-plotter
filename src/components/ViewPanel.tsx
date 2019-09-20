import React from 'react';
import {ViewPanelWrapper, CenteredButton, SmoothButton, CoordinateButton} from './ViewPanel.style';
import {Stage as StageStore} from '../stores/Stage';
import {Equations as EquationsStore} from '../stores/Equations';

interface ViewPanelProps {
    stage: StageStore;
    equations: EquationsStore;
    redraw: () => void;
}

export const ViewPanel = (props: ViewPanelProps) => {
    const {stage: {updateOriginInCenter, isSmooth, showCoordinate, switchSmooth, switchCoordinate}, redraw} = props;
    const smoothText = `Smooth: ${isSmooth ? 'On' : 'Off'}`;
    const coordinateText = `Coordinate: ${showCoordinate ? 'On' : 'Off'}`;

    return <ViewPanelWrapper>
        <CenteredButton
            title="Centered"
            onClick={() => {
                updateOriginInCenter();
                redraw();
            }}>
            Centered
        </CenteredButton>
        <SmoothButton
            isSmooth={isSmooth}
            title={smoothText}
            onClick={() => {
                switchSmooth();
                redraw();
            }}>
            {smoothText}
        </SmoothButton>
        <CoordinateButton
            showCoordinate={showCoordinate}
            title={coordinateText}
            onClick={() => {
                switchCoordinate();
                redraw();
            }}>
            {coordinateText}
        </CoordinateButton>
    </ViewPanelWrapper>;
};
