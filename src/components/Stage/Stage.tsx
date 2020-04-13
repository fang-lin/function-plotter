import React, {Dispatch, FunctionComponent, SetStateAction, useState} from 'react';
import {StageWrapper} from './Stage.style';
import {StageBackground} from './StageBackground/StageBackground';
import {StageEquation} from './StageEquations/StageEquations';
import {StageCursor} from './StageCursor/StageCursor';
import {ParsedParams} from '../../helpers/params';
import {Coordinate, Size} from '../App/App.function';
import {deviceRatio} from '../../helpers/deviceRatio';
import {EquationWorkerOutput} from '../../services/workerPool';

interface StageProps {
    cursor: Coordinate;
    size: Size;
    transform: Coordinate;
    setRedrawing: Dispatch<SetStateAction<boolean>>;
    setTrackPoint: Dispatch<SetStateAction<Coordinate>>;
    params: ParsedParams;
}

export const Stage: FunctionComponent<StageProps> = (props) => {
    const {cursor, size, transform, setRedrawing, params, setTrackPoint} = props;

    const [equationWorkerOutput, setEquationWorkerOutput] = useState<Map<number, EquationWorkerOutput>>(new Map());

    const attributes = {
        width: size[0] * deviceRatio,
        height: size[1] * deviceRatio
    };

    const style = {
        width: `${size[0]}px`,
        height: `${size[1]}px`,
    };

    return <StageWrapper style={{transform: `translate(${transform[0]}px, ${transform[1]}px)`}}>
        <StageBackground {...{size, params, attributes, style}}/>
        <StageEquation {...{
            size,
            cursor,
            params,
            attributes,
            style,
            setRedrawing,
            equationWorkerOutput,
            setEquationWorkerOutput
        }}/>
        <StageCursor {...{size, cursor, params, attributes, style, equationWorkerOutput, setTrackPoint}}/>
    </StageWrapper>;
};
