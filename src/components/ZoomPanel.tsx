import React from 'react';
import {ZoomInButton, ZoomLevelButton, ZoomOutButton, ZoomPanelWrapper} from './ZoomPanel.style';
import {Stage as StageStore} from '../stores/Stage';
import {Equations as EquationsStore} from '../stores/Equations';

interface ZoomPanelProps {
    stage: StageStore;
    equations: EquationsStore;
    redraw: () => void;
}

export const ZoomPanel = (props: ZoomPanelProps) => {
    const {stage: {updateZoom, zoomLevel}, redraw} = props;
    return (
        <ZoomPanelWrapper>
            <ZoomInButton
                title="Zoom In"
                onClick={() => {
                    updateZoom(zoomLevel + 1);
                    redraw();
                }}>Zoom In</ZoomInButton>
            <ZoomOutButton
                title="Zoom Out"
                onClick={() => {
                    updateZoom(zoomLevel - 1);
                    redraw();
                }}>Zoom Out</ZoomOutButton>
            <ZoomLevelButton level={zoomLevel - 1} title={`x${zoomLevel}`}>{`x${zoomLevel}`}</ZoomLevelButton>
        </ZoomPanelWrapper>
    );
};


