import React from 'react';
import {view_panel, centered, smooth, smooth_off, coord, coord_off} from './ViewPanel.css';
import {Stage as StageStore} from "../stores/Stage";
import {Preferences as PreferencesStore} from "../stores/Preferences";
import {inject, observer} from "mobx-react";

interface ViewPanelProps {
    stage: StageStore;
    preferences: PreferencesStore;
}

export const ViewPanel = inject('stage', 'preferences')(observer(
    (props: {}) => {
        const {preferences, stage} = props as ViewPanelProps;
        const {isSmooth, showCoordinate, switchSmooth, switchCoordinate} = preferences;
        const {updateOriginInCenter} = stage;
        const smoothText = `Smooth: ${isSmooth ? 'On' : 'Off'}`;
        const coordText = `Coord: ${showCoordinate ? 'On' : 'Off'}`;

        return <div className={view_panel}>
            <button className={centered}
                    title="Centered"
                    onClick={updateOriginInCenter}>
                Centered
            </button>
            <button className={isSmooth ? smooth : smooth_off}
                    title={smoothText}
                    onClick={switchSmooth}>
                {smoothText}
            </button>
            <button className={showCoordinate ? coord : coord_off}
                    title={coordText}
                    onClick={switchCoordinate}>
                {coordText}
            </button>
        </div>;
    }
));
