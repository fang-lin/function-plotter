import React from 'react';
import {StateBarWrapper, AppTitle, CoordinateLabel, IsDrawing} from './StateBar.style';
import {version} from '../../package.json';
import {ConvertedParams, Coordinate, deviceRatio, parseZoom} from "./App.function";

const getCoordinate = (offset: number, zoomLevel: number): string => {
    return isNaN(offset) ? '--' : (offset / parseZoom(zoomLevel) * deviceRatio).toFixed(2);
};

export interface StateBarProps {
    cursor: Coordinate;
    redrawing: boolean;
    params: ConvertedParams;
}

export const StateBar = (props: StateBarProps) => {
    const {cursor, redrawing} = props;
    const {ORIGIN, ZOOM_INDEX} = props.params;
    const x = getCoordinate(cursor[0] - ORIGIN[0], ZOOM_INDEX);
    const y = getCoordinate(ORIGIN[1] - cursor[1], ZOOM_INDEX);
    return (<StateBarWrapper>
        <AppTitle><a href="/">Function Diagram {version}</a></AppTitle>
        <CoordinateLabel>x: {x}, y: {y}</CoordinateLabel>
        <IsDrawing redrawing={redrawing}>drawing...</IsDrawing>
    </StateBarWrapper>);
};
