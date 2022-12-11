import React, {FunctionComponent} from 'react';
import {Link} from 'react-router-dom';
import {AppTitle, CoordinateLabel, ExpandToggle, AppIcon, StateBarWrapper} from './styles';
import {version} from '../../../package.json';
import {ParsedParams, canvasToEquation} from '../../helpers';
import {Coordinate, Size} from '../../pages/Plotter';
import titleIcon from '../../images/icons/icon.png';

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
        <Link to="/"><AppIcon src={titleIcon} alt="icon"/></Link>
        <div>
            <AppTitle><Link to="/">Function Plotter {version}</Link></AppTitle>
            <CoordinateLabel>x: {x.toFixed(4)}, y: {y.toFixed(4)}</CoordinateLabel>
        </div>
        <ExpandToggle {...{expandStateBar}} onClick={(): void => pushToHistory({expandStateBar: !expandStateBar})}/>
    </StateBarWrapper>;
};
