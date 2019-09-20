import React from 'react';
import {StateBarWrapper, AppTitle, Coordinate, IsDrawing} from './StateBar.style';
import {getCoordinate} from '../services/utilities';
import {Stage as StageStore} from '../stores/Stage';
import {Equations as EquationsStore} from '../stores/Equations';
import {version} from '../../package.json';

export interface StateBarProps {
    stage: StageStore;
    equations: EquationsStore;
}

export const StateBar = (props: StateBarProps) => {
    const {equations: {isRedrawing}, stage: {origin, zoom, cursor}} = props;
    const x = getCoordinate(cursor[0], origin[0], zoom);
    const y = getCoordinate(cursor[1], origin[1], zoom);
    return (<StateBarWrapper>
        <div>
            <AppTitle><a href="/">FuncDiagraph {version}</a></AppTitle>
            <IsDrawing isRedrawing={isRedrawing}>drawing...</IsDrawing>
        </div>
        <Coordinate>x: {x}, y: {y}</Coordinate>
    </StateBarWrapper>);
};
