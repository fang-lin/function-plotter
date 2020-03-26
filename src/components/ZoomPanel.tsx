import React from 'react';
import {ZoomInButton, ZoomLevelButton, ZoomOutButton, ZoomPanelWrapper} from './ZoomPanel.style';
import {
    normalizeZoomIndex,
    stopPropagation,
    ParsedParams
} from './App.function';

export interface ZoomPanelProps {
    params: ParsedParams;
    pushToHistory: (params: Partial<ParsedParams>) => void;
}

export const ZoomPanel = (props: ZoomPanelProps) => {
    const {pushToHistory} = props;
    const {zoomIndex} = props.params;
    return (
        <ZoomPanelWrapper>
            <ZoomInButton
                title="Zoom In"
                {...stopPropagation}
                onClick={() => pushToHistory({zoomIndex: normalizeZoomIndex(zoomIndex, 1)})}>Zoom In</ZoomInButton>
            <ZoomOutButton
                title="Zoom Out"
                {...stopPropagation}
                onClick={() => pushToHistory({zoomIndex: normalizeZoomIndex(zoomIndex, -1)})}>Zoom Out</ZoomOutButton>
            <ZoomLevelButton zoomIndex={zoomIndex} title={`x${zoomIndex}`}>{`x${zoomIndex}`}</ZoomLevelButton>
        </ZoomPanelWrapper>
    );
};


