import React from 'react';
import {ZoomInButton, ZoomLevelButton, ZoomOutButton, ZoomPanelWrapper} from './ZoomPanel.style';
import {
    normalizeZoomIndex,
    stopPropagation,
    ConvertedParams
} from './App.function';

export interface ZoomPanelProps {
    params: ConvertedParams;
    pushToHistory: (params: Partial<ConvertedParams>) => void;
}

export const ZoomPanel = (props: ZoomPanelProps) => {
    const {pushToHistory} = props;
    const {ZOOM_INDEX} = props.params;
    return (
        <ZoomPanelWrapper>
            <ZoomInButton
                title="Zoom In"
                {...stopPropagation}
                onClick={() => pushToHistory({ZOOM_INDEX: normalizeZoomIndex(ZOOM_INDEX, 1)})}>Zoom In</ZoomInButton>
            <ZoomOutButton
                title="Zoom Out"
                {...stopPropagation}
                onClick={() => pushToHistory({ZOOM_INDEX: normalizeZoomIndex(ZOOM_INDEX, -1)})}>Zoom Out</ZoomOutButton>
            <ZoomLevelButton zoomIndex={ZOOM_INDEX} title={`x${ZOOM_INDEX}`}>{`x${ZOOM_INDEX}`}</ZoomLevelButton>
        </ZoomPanelWrapper>
    );
};


