import React from 'react';
import {StateBarWrapper, AppTitle, Coordinate, IsDrawing} from './StateBar.style';
import {deviceRatio, getCoordinate} from '../services/utilities';
import {Stage as StageStore} from '../stores/Stage';
import {Preferences as PreferencesStore} from '../stores/Preferences';
import {Equations as EquationsStore} from '../stores/Equations';
import {version} from '../../package.json';
import {inject, observer} from 'mobx-react';

export interface InjectedStateBarProps {
    stage: StageStore;
    preferences: PreferencesStore;
    equations: EquationsStore;
}

export const StateBar = inject('stage', 'preferences', 'equations')(observer(
    (props: {}) => {
        const {equations: {isRedrawing}, stage: {origin, zoom}, preferences: {cursor}} = props as InjectedStateBarProps;
        const x = getCoordinate(cursor[0], origin[0], zoom);
        const y = getCoordinate(cursor[1], origin[1], zoom);
        return (<StateBarWrapper>
            <div>
                <AppTitle><a href="/">FuncDiagraph {version}</a></AppTitle>
                <IsDrawing isRedrawing={isRedrawing}>drawing...</IsDrawing>
            </div>
            <Coordinate>x: {x}, y: {y}</Coordinate>
        </StateBarWrapper>);
    }
));
