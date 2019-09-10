import React from 'react';
import {StateBarWrapper, AppTitle, Coordinate, IsDrawing} from './StateBar.style';
import {deviceRatio} from '../services/utilities';
import {Stage as StageStore} from "../stores/Stage";
import {Preferences as PreferencesStore} from "../stores/Preferences";
import {Equations as EquationsStore} from "../stores/Equations";
import {version} from '../../package.json';
import {inject, observer} from "mobx-react";

export interface InjectedStateBarProps {
    stage: StageStore;
    preferences: PreferencesStore;
    equations: EquationsStore;
}

export const StateBar = inject('stage', 'preferences', 'equations')(observer(
    (props: {}) => {
        const {equations: {isRedrawing}, stage: {origin, zoom}, preferences: {cursor}} = props as InjectedStateBarProps;
        const x = cursor[0] ? ((cursor[0] - origin[0]) / zoom * deviceRatio).toFixed(2) : '--';
        const y = cursor[1] ? ((cursor[1] - origin[1]) / zoom * deviceRatio).toFixed(2) : '--';
        return (<StateBarWrapper>
        <span>
            <AppTitle href="/">FuncDiagraph {version}</AppTitle>
            <IsDrawing isRedrawing={isRedrawing}>drawing...</IsDrawing>
        </span>
            <Coordinate>{x}, {y}</Coordinate>
        </StateBarWrapper>);
    }
));
