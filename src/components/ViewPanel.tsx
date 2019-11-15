import React, {Dispatch, SetStateAction} from 'react';
import {ViewPanelWrapper, CenteredButton, SmoothButton, CoordinateButton, WeightButton} from './ViewPanel.style';
import {Coordinate, decodeParams, normalizeZoomIndex, Params, paramsToPath, Size, stopPropagation} from './App.function';
import {useHistory, useParams} from "react-router";

interface ViewPanelProps {
    getCenteredOrigin: (size: Size) => Coordinate;
    size: Size;
}

export const ViewPanel = (props: ViewPanelProps) => {
    const {SMOOTH, IS_BOLD, SHOW_COORDINATE} = decodeParams(useParams<Params>());
    const history = useHistory();
    const toURL = paramsToPath(useParams<Params>());

    const {getCenteredOrigin, size} = props;
    const smoothText = `Smooth: ${SMOOTH ? 'On' : 'Off'}`;
    const isBoldText = `Weight: ${IS_BOLD ? 'Bold' : 'Light'}`;
    const coordinateText = `Coordinate: ${SHOW_COORDINATE ? 'On' : 'Off'}`;

    return <ViewPanelWrapper>
        <CenteredButton
            title="Centered"
            {...stopPropagation}
            onClick={() => history.push(toURL({ORIGIN: getCenteredOrigin(size)}))}>
            Centered
        </CenteredButton>
        <SmoothButton
            isSmooth={SMOOTH}
            title={smoothText}
            {...stopPropagation}
            onClick={() => history.push(toURL({SMOOTH: !SMOOTH}))}>
            {smoothText}
        </SmoothButton>
        <WeightButton
            isBold={IS_BOLD}
            title={isBoldText}
            {...stopPropagation}
            onClick={() => history.push(toURL({IS_BOLD: !IS_BOLD}))}>
            {isBoldText}
        </WeightButton>
        <CoordinateButton
            showCoordinate={SHOW_COORDINATE}
            title={coordinateText}
            {...stopPropagation}
            onClick={() => history.push(toURL({SHOW_COORDINATE: !SHOW_COORDINATE}))}>
            {coordinateText}
        </CoordinateButton>
    </ViewPanelWrapper>;
};
