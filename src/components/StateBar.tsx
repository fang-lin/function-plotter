import React, {FunctionComponent} from 'react';
import {StateBarWrapper, AppTitle, CoordinateLabel, IsDrawing} from './StateBar.style';
import {version} from '../../package.json';
import {ParsedParams, Coordinate, deviceRatio, parseZoom} from './App.function';

const getCoordinate = (offset: number, zoomLevel: number): string => {
    return isNaN(offset) ? '--' : (offset / parseZoom(zoomLevel) * deviceRatio).toFixed(2);
};

export interface StateBarProps {
    cursor: Coordinate;
    redrawing: boolean;
    params: ParsedParams;
}

export const StateBar: FunctionComponent<StateBarProps> = (props) => {
    const {cursor, redrawing} = props;
    const {origin, zoom} = props.params;
    const x = getCoordinate(cursor[0] - origin[0], zoom);
    const y = getCoordinate(origin[1] - cursor[1], zoom);
    return (<StateBarWrapper>
        <AppTitle><a href="/">Function Diagram {version}</a></AppTitle>
        <CoordinateLabel>x: {x}, y: {y}</CoordinateLabel>
        <IsDrawing redrawing={redrawing}>drawing...</IsDrawing>
    </StateBarWrapper>);
};
