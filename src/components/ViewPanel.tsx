import React from 'react';
import {inject, observer} from 'mobx-react';
import {ViewPanelWrapper, CenteredButton, SmoothButton, CoordinateButton} from './ViewPanel.style';
import {Stage as StageStore} from '../stores/Stage';
import {Preferences as PreferencesStore} from '../stores/Preferences';

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
        const coordinateText = `Coordinate: ${showCoordinate ? 'On' : 'Off'}`;

        return <ViewPanelWrapper>
            <CenteredButton
                title="Centered"
                onClick={updateOriginInCenter}>
                Centered
            </CenteredButton>
            <SmoothButton
                isSmooth={isSmooth}
                title={smoothText}
                onClick={switchSmooth}>
                {smoothText}
            </SmoothButton>
            <CoordinateButton
                showCoordinate={showCoordinate}
                title={coordinateText}
                onClick={switchCoordinate}>
                {coordinateText}
            </CoordinateButton>
        </ViewPanelWrapper>;
    }
));
