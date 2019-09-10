import React from 'react';
import {LineX, LineY} from './CrossLine.style';
import {Stage as StoreStage} from "../stores/Stage";
import {Preferences as StorePreferences} from "../stores/Preferences";
import {inject, observer} from "mobx-react";

interface CrossLineProps {
    stage: StoreStage;
    preferences: StorePreferences;
}

export const CrossLine = inject('stage', 'preferences')(observer(
    (props: {}) => {
        const {preferences: {cursor}, stage: {size}} = props as CrossLineProps;
        const styleX = {
            transform: `translate(${cursor[0]}px, 0)`,
            height: `${size[1]}px`
        };
        const styleY = {
            transform: `translate(0, ${cursor[1]}px)`,
            width: `${size[0]}px`
        };
        return (
            <span>
                <LineX style={styleX}/>
                <LineY style={styleY}/>
            </span>
        );
    }
));




