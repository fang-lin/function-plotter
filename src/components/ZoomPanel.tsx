import React from 'react';
import {Stage as StageStore} from '../stores/Stage';
import {inject, observer} from 'mobx-react';
import {ZoomInButton, ZoomLevelButton, ZoomOutButton, ZoomPanelWrapper} from './ZoomPanel.style';

interface ZoomPanelProps {
    stage: StageStore;
}

export const ZoomPanel = inject('stage')(observer(
    (props: {}) => {
        const {stage: {updateZoom, zoomLevel}} = props as ZoomPanelProps;
        return (
            <ZoomPanelWrapper>
                <ZoomInButton
                    title="Zoom In"
                    onClick={() => updateZoom(zoomLevel + 1)}>Zoom In</ZoomInButton>
                <ZoomOutButton
                    title="Zoom Out"
                    onClick={() => updateZoom(zoomLevel - 1)}>Zoom Out</ZoomOutButton>
                <ZoomLevelButton level={zoomLevel - 1} title={`x${zoomLevel}`}>{`x${zoomLevel}`}</ZoomLevelButton>
            </ZoomPanelWrapper>
        );
    }
));


