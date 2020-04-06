import React, {Dispatch, FunctionComponent, SetStateAction, useEffect, useRef} from 'react';
import random from 'lodash/random';
import {
    StageWrapper,
    GridCanvas,
    BackgroundCanvas,
    CrossCanvas, EquationCanvas
} from './Stage.style';
import {ParsedParams, Coordinate, deviceRatio, parseZoom, Size} from './App.function';
import {
    AXIS_COLOR,
    drawEquation,
    erasure,
    GRID_COLOR,
    redrawAxis,
    redrawGrid,
    withCanvasContext
} from './Stage.function';
import {workerPool} from '../services/workerPool';

interface StageProps {
    cursor: Coordinate;
    size: Size;
    transform: Coordinate;
    setRedrawing: Dispatch<SetStateAction<boolean>>;
    params: ParsedParams;
}

const code = random(1000, 9999);

export const Stage: FunctionComponent<StageProps> = (props) => {
    const {cursor, size, transform, setRedrawing} = props;
    const {origin, zoom, isSmooth, isBold, showCrossCursor, equations} = props.params;
    const scale = parseZoom(zoom) / deviceRatio;

    const gridRef = useRef<HTMLCanvasElement>(null);
    const crossRef = useRef<HTMLCanvasElement>(null);

    const attributes = {
        width: size[0] * deviceRatio,
        height: size[1] * deviceRatio
    };
    const canvasSize = {
        width: `${size[0]}px`,
        height: `${size[1]}px`,
    };

    useEffect(() => {
        withCanvasContext(gridRef.current, context => {
            erasure(context, size);
            redrawGrid(context, origin, size, parseZoom(zoom), GRID_COLOR);
            redrawAxis(context, origin, size, AXIS_COLOR);
        });

        const range: [Size, Size] = [[
            -origin[0] / scale,
            (size[0] - origin[0]) / scale
        ], [
            (origin[1] - size[1]) / scale,
            origin[1] / scale
        ]];

        (async (): Promise<void> => {
            setRedrawing(true);
            await Promise.all(equations.map((equation, index) => {
                const canvas = document.querySelector<HTMLCanvasElement>(`#equation-${code}-${index}`);
                return withCanvasContext(canvas, async context => {
                    erasure(context, size);
                    if (equation.displayed) {
                        const matrix = await workerPool.exec({equation, range, origin, scale, isSmooth});
                        erasure(context, size);
                        drawEquation(context, matrix, isBold, equation.color);
                        return;
                    }
                });
            }));
            setRedrawing(false);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [origin[0], origin[1], size[0], size[1], zoom, isSmooth, isBold, equations.serialization().join()]);

    useEffect(() => {
        if (showCrossCursor) {
            withCanvasContext(crossRef.current, context => {
                erasure(context, size);
                redrawAxis(context, cursor, size, 'rgba(0, 0, 0, 0.3)');
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cursor[0], cursor[1], size[0], size[1], showCrossCursor]);

    useEffect(() => withCanvasContext(crossRef.current, context => erasure(context, size)), [showCrossCursor, size]);

    return <StageWrapper style={{transform: `translate(${transform[0]}px, ${transform[1]}px)`}}>
        <BackgroundCanvas style={{...canvasSize}} {...attributes}/>
        {equations.map((e, index) => <EquationCanvas
            id={`equation-${code}-${index}`} key={index} style={{...canvasSize}} {...attributes}/>)}
        <GridCanvas ref={gridRef} style={{...canvasSize}} {...attributes}/>
        <CrossCanvas ref={crossRef} style={{...canvasSize}} {...attributes}/>
    </StageWrapper>;
};
