import React, {FunctionComponent} from 'react';
import {AppTitle, CoordinateLabel, ExpandToggle, IsDrawing, StateBarWrapper} from './StateBar.style';
import {version} from '../../../package.json';
import {ParsedParams} from '../../helpers/params';
import {Coordinate} from '../App/App.function';

export interface StateBarProps {
    trackPoint: Coordinate;
    redrawing: boolean;
    params: ParsedParams;
    pushToHistory: (params: Partial<ParsedParams>) => void;
}

export const StateBar: FunctionComponent<StateBarProps> = (props) => {
    const {trackPoint, redrawing, params: {expandStateBar}, pushToHistory} = props;
    return (<StateBarWrapper {...{expandStateBar}}>
        <AppTitle><a href="/">Function Diagram {version}</a></AppTitle>
        <CoordinateLabel>x: {trackPoint[0].toFixed(2)}, y: {trackPoint[1].toFixed(2)}</CoordinateLabel>
        <IsDrawing redrawing={redrawing}>drawing...</IsDrawing>
        <ExpandToggle {...{expandStateBar}} onClick={(): void => pushToHistory({expandStateBar: !expandStateBar})}/>
    </StateBarWrapper>);
};
