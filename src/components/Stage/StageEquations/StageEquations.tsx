import React, {CSSProperties, Dispatch, FunctionComponent, SetStateAction, useEffect} from 'react';
import random from 'lodash/random';
import {erasure, withCanvasContext} from '../Stage.function';
import {EquationCanvas} from './StageEquations.style';
import {EquationWorkerInput, EquationWorkerOutput, workerPool} from '../../../services/workerPool';
import {ParsedParams} from '../../../helpers/params';
import {Coordinate, Size} from '../../App/App.function';
import {deviceRatio} from '../../../helpers/deviceRatio';
import {drawEquation} from './StageEquations.function';

interface StageEquationProps {
    cursor: Coordinate;
    equationWorkerOutput: Map<number, EquationWorkerOutput>;
    setEquationWorkerOutput: Dispatch<SetStateAction<Map<number, EquationWorkerOutput>>>;
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

export const StageEquation: FunctionComponent<StageEquationProps> = (props) => {
    const {size, setRedrawing, params: {origin, scale, isSmooth, isBold, equations}, style, attributes, equationWorkerOutput, setEquationWorkerOutput} = props;

    useEffect(() => {
        (async (): Promise<void> => {
            setRedrawing(true);
            await Promise.all(equations.map((equation, index) => {
                const canvas = document.querySelector<HTMLCanvasElement>(`#equation-${code}-${index}`);
                return withCanvasContext(canvas, async context => {
                    erasure(context, size);
                    if (equation.displayed) {
                        const {mapping, coordinates} = await workerPool.exec<EquationWorkerInput>({
                            type: 'Equation',
                            equation,
                            origin,
                            size,
                            scale,
                            isSmooth,
                            deviceRatio
                        });
                        setEquationWorkerOutput(equationWorkerOutput.set(index, {mapping, coordinates}));
                        erasure(context, size);
                        drawEquation(context, coordinates, isBold, equation.color);
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
