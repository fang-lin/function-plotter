import React, {FunctionComponent} from 'react';
import {ShadowWrapper, ZoomInButton, ZoomLevelButton, ZoomOutButton, ZoomPanelWrapper} from './styles';
import {stopPropagation} from '../../pages/Diagraph';
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
            <ShadowWrapper>
                <ZoomInButton
                    title="Zoom In"
                    {...stopPropagation}
                    onClick={zoomInOut(true)}>Zoom In</ZoomInButton>
                <ZoomOutButton
                    title="Zoom Out"
                    {...stopPropagation}
                    onClick={zoomInOut(false)}>Zoom Out</ZoomOutButton>
            </ShadowWrapper>
            <ZoomLevelButton {...{scaleLevel, title: `x${scaleLevel}`}}>{`x${scaleLevel}`}</ZoomLevelButton>
        </ZoomPanelWrapper>
    );
};


