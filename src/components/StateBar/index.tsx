import React, {FunctionComponent} from 'react';
import {Link} from 'react-router-dom';
import {AppTitle, CoordinateLabel, ExpandToggle, IsDrawing, StateBarWrapper} from './styles';
import {version} from '../../../package.json';
import {ParsedParams, canvasToEquation} from '../../helpers';
import {Coordinate, Size} from '../../pages/Plotter';

export interface StateBarProps {
    trackPoint: Coordinate;
    params: ParsedParams;
    size: Size;
    pushToHistory: (params: Partial<ParsedParams>) => void;
}

export const StateBar: FunctionComponent<StateBarProps> = (props) => {
    const {trackPoint, size, params: {expandStateBar, origin, scale}, pushToHistory} = props;
    const [x, y] = canvasToEquation(trackPoint, origin, size, scale);
    return <StateBarWrapper {...{expandStateBar}}>
        <AppTitle><Link to="/">Function Plotter {version}</Link></AppTitle>
        <CoordinateLabel>x: {x.toFixed(4)}, y: {y.toFixed(4)}</CoordinateLabel>
        <ExpandToggle {...{expandStateBar}} onClick={(): void => pushToHistory({expandStateBar: !expandStateBar})}/>
    </StateBarWrapper>;
};
