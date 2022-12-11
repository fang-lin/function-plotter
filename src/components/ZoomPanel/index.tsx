import React, {FunctionComponent} from 'react';
import {ZoomInButton, ZoomLevelButton, ZoomOutButton, ZoomPanelWrapper} from './styles';
import {stopPropagation} from '../../pages/Plotter';
import {getScaleIndex, ParsedParams, scaleRange} from '../../helpers';

export interface ZoomPanelProps {
    params: ParsedParams;
    pushToHistory: (params: Partial<ParsedParams>) => void;
}

export const ZoomPanel: FunctionComponent<ZoomPanelProps> = (props) => {
    const {pushToHistory, params: {scale}} = props;

    const scaleIndex = getScaleIndex(scale);
    const scaleLevel = scaleIndex + 1;

    const zoomInOut = (isZoomIn: boolean) => (): void => {
        const newScale = scaleRange[scaleIndex + (isZoomIn ? 1 : -1)];
        if (newScale) {
            pushToHistory({scale: newScale});
        }
    };

    return (
        <ZoomPanelWrapper>
            <ZoomInButton
                title="Zoom In"
                {...stopPropagation}
                onClick={zoomInOut(true)}>Zoom In</ZoomInButton>
            <ZoomOutButton
                title="Zoom Out"
                {...stopPropagation}
                onClick={zoomInOut(false)}>Zoom Out</ZoomOutButton>
            <ZoomLevelButton {...{scaleLevel, title: `x${scaleLevel}`}}>{`x${scaleLevel}`}</ZoomLevelButton>
        </ZoomPanelWrapper>
    );
};


