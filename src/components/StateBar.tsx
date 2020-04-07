import React, {FunctionComponent} from 'react';
import {StateBarWrapper, AppTitle, CoordinateLabel, IsDrawing} from './StateBar.style';
import {version} from '../../package.json';
import {ParsedParams, Coordinate, Size} from './App.function';

const getCoordinate = (cursor: Coordinate, size: Size, params: ParsedParams): [string, string] => {
    const {origin, scale} = params;
    return [
        ((cursor[0] - size[0] / 2 - origin[0]) / scale).toFixed(2),
        ((size[1] / 2 - cursor[1] + origin[1]) / scale).toFixed(2)
    ];
};

export interface StateBarProps {
    cursor: Coordinate;
    size: Size;
    redrawing: boolean;
    params: ParsedParams;
}

export const StateBar: FunctionComponent<StateBarProps> = (props) => {
    const {cursor, size, redrawing, params} = props;
    const [x, y] = getCoordinate(cursor, size, params);
    return (<StateBarWrapper>
        <AppTitle><a href="/">Function Diagram {version}</a></AppTitle>
        <CoordinateLabel>x: {x}, y: {y}</CoordinateLabel>
        <IsDrawing redrawing={redrawing}>drawing...</IsDrawing>
    </StateBarWrapper>);
};
