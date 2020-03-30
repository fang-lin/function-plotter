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
    const {zoom} = props.params;
    return (
        <ZoomPanelWrapper>
            <ShadowWrapper>
                <ZoomInButton
                    title="Zoom In"
                    {...stopPropagation}
                    onClick={(): void => pushToHistory({zoom: normalizeZoomIndex(zoom, 1)})}>Zoom In</ZoomInButton>
                <ZoomOutButton
                    title="Zoom Out"
                    {...stopPropagation}
                    onClick={(): void => pushToHistory({zoom: normalizeZoomIndex(zoom, -1)})}>Zoom Out</ZoomOutButton>
            </ShadowWrapper>
            <ZoomLevelButton zoomIndex={zoom} title={`x${zoom}`}>{`x${zoom}`}</ZoomLevelButton>
        </ZoomPanelWrapper>
    );
};


