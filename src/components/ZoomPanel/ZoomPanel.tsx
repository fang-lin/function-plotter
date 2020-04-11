import React, {FunctionComponent} from 'react';
import {ShadowWrapper, ZoomInButton, ZoomLevelButton, ZoomOutButton, ZoomPanelWrapper} from './ZoomPanel.style';
import {stopPropagation} from '../App/App.function';
import {getScaleLevel, ParsedParams, scaleRange} from '../../helpers/params';

export interface ZoomPanelProps {
    params: ParsedParams;
    pushToHistory: (params: Partial<ParsedParams>) => void;
}

export const ZoomPanel: FunctionComponent<ZoomPanelProps> = (props) => {
    const {pushToHistory} = props;
    const {scale} = props.params;
    const scaleLevel = getScaleLevel(scale);

    const zoomIn = (): void => {
        const newScale = scaleRange[getScaleLevel(scale)];
        if (newScale) {
            pushToHistory({scale: newScale});
        }
    };

    const zoomOut = (): void => {
        const newScale = scaleRange[getScaleLevel(scale) - 2];
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
                    onClick={zoomIn}>Zoom In</ZoomInButton>
                <ZoomOutButton
                    title="Zoom Out"
                    {...stopPropagation}
                    onClick={zoomOut}>Zoom
                    Out</ZoomOutButton>
            </ShadowWrapper>
            <ZoomLevelButton {...{scaleLevel, title: `x${scaleLevel}`}}>{`x${scaleLevel}`}</ZoomLevelButton>
        </ZoomPanelWrapper>
    );
};


