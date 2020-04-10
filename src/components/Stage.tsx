import React, {Dispatch, FunctionComponent, SetStateAction} from 'react';
import {StageWrapper} from './Stage.style';
import {ParsedParams, Coordinate, deviceRatio, Size} from './App.function';
import {StageBackground} from './StageBackground';
import {StageEquation} from './StageEquations';
import {StageCross} from './StageCross';

interface StageProps {
    cursor: Coordinate;
    size: Size;
    transform: Coordinate;
    setRedrawing: Dispatch<SetStateAction<boolean>>;
    params: ParsedParams;
}

export const Stage: FunctionComponent<StageProps> = (props) => {
    const {cursor, size, transform, setRedrawing, params} = props;

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
        <StageEquation {...{size, cursor, params, attributes, style, setRedrawing}}/>
        <StageCross {...{size, cursor, params, attributes, style}}/>
    </StageWrapper>;
};
