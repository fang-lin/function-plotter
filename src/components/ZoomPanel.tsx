import React, {Dispatch, SetStateAction} from 'react';
import {ZoomInButton, ZoomLevelButton, ZoomOutButton, ZoomPanelWrapper} from './ZoomPanel.style';

interface ZoomPanelProps {
    zoom: number;
    setZoom: Dispatch<SetStateAction<number>>
}

export const ZoomPanel = (props: ZoomPanelProps) => {
    const {zoom, setZoom} = props;
    return (
        <ZoomPanelWrapper>
            <ZoomInButton
                title="Zoom In"
                onClick={() => setZoom(zoom => zoom + 1)}>Zoom In</ZoomInButton>
            <ZoomOutButton
                title="Zoom Out"
                onClick={() => setZoom(zoom => zoom - 1)}>Zoom Out</ZoomOutButton>
            <ZoomLevelButton level={zoom - 1} title={`x${zoom}`}>{`x${zoom}`}</ZoomLevelButton>
        </ZoomPanelWrapper>
    );
};


