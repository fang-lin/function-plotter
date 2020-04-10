import React, {CSSProperties, Dispatch, FunctionComponent, SetStateAction, useEffect} from 'react';
import random from 'lodash/random';
import {ParsedParams, Coordinate, deviceRatio, Size} from './App.function';
import {
    drawEquation,
    erasure,
    withCanvasContext
} from './Stage.function';
import {EquationCanvas} from './StageEquations.style';
import {workerPool} from '../services/workerPool';

interface StageProps {
    cursor: Coordinate;
    size: Size;
    setRedrawing: Dispatch<SetStateAction<boolean>>;
    attributes: {
        width: number;
        height: number;
    };
    style: CSSProperties;
    params: ParsedParams;
}

const code = random(1000, 9999);

export const StageEquation: FunctionComponent<StageProps> = (props) => {
    const {size, setRedrawing, params, style, attributes} = props;
    const {origin, scale, isSmooth, isBold, equations} = params;

    useEffect(() => {
        (async (): Promise<void> => {
            setRedrawing(true);
            await Promise.all(equations.map((equation, index) => {
                const canvas = document.querySelector<HTMLCanvasElement>(`#equation-${code}-${index}`);
                return withCanvasContext(canvas, async context => {
                    erasure(context, size);
                    if (equation.displayed) {
                        const options = {origin, size, scale, isSmooth, deviceRatio};
                        const matrix = await workerPool.exec({equation, options});
                        erasure(context, size);
                        drawEquation(context, matrix, isBold, equation.color);
                        return;
                    }
                });
            }));
            setRedrawing(false);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [origin[0], origin[1], size[0], size[1], scale, isSmooth, isBold, equations.serialization().join()]);

    return <>{equations.map((e, index) =>
        <EquationCanvas id={`equation-${code}-${index}`} key={index} {...{style}} {...attributes}/>)}</>;
};
