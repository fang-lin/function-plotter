import React, {FunctionComponent} from 'react';
import {ShadowWrapper, ZoomInButton, ZoomLevelButton, ZoomOutButton, ZoomPanelWrapper} from './ZoomPanel.style';
import {
    normalizeScaleIndex,
    stopPropagation,
    ParsedParams, getScaleLevel
} from './App.function';

export interface ZoomPanelProps {
    params: ParsedParams;
    pushToHistory: (params: Partial<ParsedParams>) => void;
}

export const ZoomPanel: FunctionComponent<ZoomPanelProps> = (props) => {
    const {pushToHistory} = props;
    const {scale} = props.params;
    const scaleLevel = getScaleLevel(scale);
    return (
        <ZoomPanelWrapper>
            <ShadowWrapper>
                <ZoomInButton
                    title="Zoom In"
                    {...stopPropagation}
                    onClick={(): void => pushToHistory({scale: normalizeScaleIndex(scale, 1)})}>Zoom In</ZoomInButton>
                <ZoomOutButton
                    title="Zoom Out"
                    {...stopPropagation}
                    onClick={(): void => pushToHistory({scale: normalizeScaleIndex(scale, -1)})}>Zoom
                    Out</ZoomOutButton>
            </ShadowWrapper>
            <ZoomLevelButton {...{scaleLevel, title: `x${scaleLevel}`}}>{`x${scaleLevel}`}</ZoomLevelButton>
        </ZoomPanelWrapper>
    );
};


