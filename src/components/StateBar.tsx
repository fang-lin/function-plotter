import React from 'react';
import {StateBarWrapper, AppTitle, CoordinateLabel, IsDrawing} from './StateBar.style';
import {version} from '../../package.json';
import {Coordinate, getCoordinate} from "./App.function";

export interface StateBarProps {
    origin: Coordinate;
    zoom: number;
    cursor: Coordinate;
    redrawing: boolean;
}

export const StateBar = (props: StateBarProps) => {
    const {origin, zoom, cursor, redrawing} = props;
    const x = getCoordinate(cursor[0], origin[0], zoom);
    const y = getCoordinate(cursor[1], origin[1], zoom);
    return (<StateBarWrapper>
        <div>
            <AppTitle><a href="/">Function Diagram {version}</a></AppTitle>
            <IsDrawing redrawing={redrawing}>drawing...</IsDrawing>
        </div>
        <CoordinateLabel>x: {x}, y: {y}</CoordinateLabel>
    </StateBarWrapper>);
};
