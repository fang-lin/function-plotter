import React from 'react';
import {StateBarWrapper, AppTitle, CoordinateLabel, IsDrawing} from './StateBar.style';
import {version} from '../../package.json';
import {Coordinate, deviceRatio, parseZoom} from "./App.function";

const getCoordinate = (offset: number, zoomLevel: number): string => {
    return isNaN(offset) ? '--' : (offset / parseZoom(zoomLevel) * deviceRatio).toFixed(2);
};

export interface StateBarProps {
    origin: Coordinate;
    zoomIndex: number;
    cursor: Coordinate;
    redrawing: boolean;
}

export const StateBar = (props: StateBarProps) => {
    const {origin, zoomIndex, cursor, redrawing} = props;
    const x = getCoordinate(cursor[0] - origin[0], zoomIndex);
    const y = getCoordinate(origin[1] - cursor[1], zoomIndex);
    return (<StateBarWrapper>
        <AppTitle><a href="/">Function Diagram {version}</a></AppTitle>
        <CoordinateLabel>x: {x}, y: {y}</CoordinateLabel>
        <IsDrawing redrawing={redrawing}>drawing...</IsDrawing>
    </StateBarWrapper>);
};
