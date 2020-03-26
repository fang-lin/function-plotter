import React, {FunctionComponent} from 'react';
import {ShadowWrapper, ZoomInButton, ZoomLevelButton, ZoomOutButton, ZoomPanelWrapper} from './ZoomPanel.style';
import {
    normalizeZoomIndex,
    stopPropagation,
    ParsedParams
} from './App.function';

export interface ZoomPanelProps {
    params: ParsedParams;
    pushToHistory: (params: Partial<ParsedParams>) => void;
}

export const ZoomPanel: FunctionComponent<ZoomPanelProps> = (props) => {
    const {pushToHistory} = props;
    const {zoomIndex} = props.params;
    return (
        <ZoomPanelWrapper>
            <ShadowWrapper>
                <ZoomInButton
                    title="Zoom In"
                    {...stopPropagation}
                    onClick={() => pushToHistory({zoomIndex: normalizeZoomIndex(zoomIndex, 1)})}>Zoom In</ZoomInButton>
                <ZoomOutButton
                    title="Zoom Out"
                    {...stopPropagation}
                    onClick={() => pushToHistory({zoomIndex: normalizeZoomIndex(zoomIndex, -1)})}>Zoom Out</ZoomOutButton>
            </ShadowWrapper>
            <ZoomLevelButton zoomIndex={zoomIndex} title={`x${zoomIndex}`}>{`x${zoomIndex}`}</ZoomLevelButton>
        </ZoomPanelWrapper>
    );
};


