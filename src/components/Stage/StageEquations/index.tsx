import React, {CSSProperties, Dispatch, FunctionComponent, SetStateAction, useEffect} from 'react';
import {erasure, withCanvasContext} from '../functions';
import {EquationCanvas} from './styles';
import {EquationWorkerInput, EquationWorkerOutput, workerPool} from '../../../services/workerPool';
import {ParsedParams} from '../../../helpers';
import deviceRatio from '../../../helpers/deviceRatio';
import {Coordinate, Size} from '../../../pages/Diagraph';
import {drawEquation} from './functions';

export * from './functions';

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

export const StageEquation: FunctionComponent<StageEquationProps> = (props) => {
    const {size, setRedrawing, params: {origin, scale, isSmooth, isBold, equations}, style, attributes, equationWorkerOutput, setEquationWorkerOutput} = props;

    useEffect(() => {
        if (size[0] > 0 && size[1] > 0) {
            workerPool.terminate();
            (async (): Promise<void> => {
                setRedrawing(true);
                await Promise.all(equations.map((equation, index) => {
                    const canvas = document.querySelector<HTMLCanvasElement>(`#equation-${index}`);
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
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [origin[0], origin[1], size[0], size[1], scale, isSmooth, isBold, equations.serialization().join()]);

    return <>{equations.map((e, index) =>
        <EquationCanvas id={`equation-${index}`} key={index} {...{style}} {...attributes}/>)}</>;
};
