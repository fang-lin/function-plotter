import React, {Dispatch, SetStateAction} from 'react';
import {ZoomInButton, ZoomLevelButton, ZoomOutButton, ZoomPanelWrapper} from './ZoomPanel.style';
import {stopPropagation, ZoomRange} from "./App.function";

interface ZoomPanelProps {
    zoomIndex: number;
    setZoomIndex: Dispatch<SetStateAction<number>>
}

export const ZoomPanel = (props: ZoomPanelProps) => {
    const {zoomIndex, setZoomIndex} = props;
    return (
        <ZoomPanelWrapper>
            <ZoomInButton
                title="Zoom In"
                {...stopPropagation}
                onClick={() => setZoomIndex(
                    zoomIndex => ZoomRange[zoomIndex + 1] ? zoomIndex + 1 : zoomIndex
                )}>Zoom In</ZoomInButton>
            <ZoomOutButton
                title="Zoom Out"
                {...stopPropagation}
                onClick={() => setZoomIndex(
                    zoomIndex => ZoomRange[zoomIndex - 1] ? zoomIndex - 1 : zoomIndex
                )}>Zoom Out</ZoomOutButton>
            <ZoomLevelButton zoomIndex={zoomIndex} title={`x${zoomIndex}`}>{`x${zoomIndex}`}</ZoomLevelButton>
        </ZoomPanelWrapper>
    );
};


