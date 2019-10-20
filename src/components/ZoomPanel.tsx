import React from 'react';
import {ZoomInButton, ZoomLevelButton, ZoomOutButton, ZoomPanelWrapper} from './ZoomPanel.style';
import {useHistory, useParams, Link} from 'react-router-dom';
import {decodeParams, normalizeZoomIndex, Params, paramsToURL, stopPropagation} from './App.function';

export const ZoomPanel = () => {
    const {ZOOM_INDEX} = decodeParams(useParams<Params>());
    const history = useHistory();
    const toURL = paramsToURL(useParams<Params>());

    return (
        <ZoomPanelWrapper>
            <ZoomInButton
                title="Zoom In"
                {...stopPropagation}
                onClick={() =>
                    history.push(toURL({ZOOM_INDEX: normalizeZoomIndex(ZOOM_INDEX, 1)}))
                }>Zoom In</ZoomInButton>
            <ZoomOutButton
                title="Zoom Out"
                {...stopPropagation}
                onClick={() =>
                    history.push(toURL({ZOOM_INDEX: normalizeZoomIndex(ZOOM_INDEX, -1)}))
                }>Zoom Out</ZoomOutButton>
            <ZoomLevelButton zoomIndex={ZOOM_INDEX} title={`x${ZOOM_INDEX}`}>{`x${ZOOM_INDEX}`}</ZoomLevelButton>
        </ZoomPanelWrapper>
    );
};


