import React, {Dispatch, FunctionComponent, SetStateAction, useEffect, useRef} from 'react';
import random from 'lodash/random';
import {arithmetic} from '../services/arithmetic';
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
    const {origin, zoomIndex, isSmooth, isBold, showCrossCursor, equations} = props.params;
    const gridRef: any = useRef<HTMLCanvasElement>();
    const crossRef: any = useRef<HTMLCanvasElement>();

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
            redrawGrid(context, origin, size, parseZoom(zoomIndex), GRID_COLOR);
            redrawAxis(context, origin, size, AXIS_COLOR);
        });

        const range: [Size, Size] = [[
            -origin[0] / parseZoom(zoomIndex) * deviceRatio,
            (size[0] - origin[0]) / parseZoom(zoomIndex) * deviceRatio
        ], [
            (origin[1] - size[1]) / parseZoom(zoomIndex) * deviceRatio,
            origin[1] / parseZoom(zoomIndex) * deviceRatio
        ]];

        const zoom = parseZoom(zoomIndex) / deviceRatio;

        (async () => {
            setRedrawing(true);
            await Promise.all(equations.map(({fx, color, displayed}, index) => {
                const canvas = document.querySelector<HTMLCanvasElement>(`#equation-${code}-${index}`);
                withCanvasContext(canvas, async context => {
                    erasure(context, size);
                    const matrix = await arithmetic({range, fx, origin, zoom, isSmooth});
                    erasure(context, size);
                    drawEquation(context, matrix, isBold, color);
                });
            }));
            setRedrawing(false);
        })();
    }, [origin[0], origin[1], size[0], size[1], zoomIndex, isSmooth, isBold]);

    useEffect(() => {
        if (showCrossCursor) {
            withCanvasContext(crossRef.current, context => {
                erasure(context, size);
                redrawAxis(context, cursor, size, 'rgba(0, 0, 0, 0.3)');
            });
        }
    }, [cursor[0], cursor[1]]);

    useEffect(() => withCanvasContext(crossRef.current, context => erasure(context, size)), [showCrossCursor]);

    return <StageWrapper style={{transform: `translate(${transform[0]}px, ${transform[1]}px)`}}>
        <BackgroundCanvas style={{...canvasSize}} {...attributes}/>
        {equations.map(({displayed}, index) => {
            const display = displayed ? 'block' : 'none';
            return <EquationCanvas id={`equation-${code}-${index}`}
                                   key={index} style={{...canvasSize, display}} {...attributes}/>;
        })}
        <GridCanvas ref={gridRef} style={{...canvasSize}} {...attributes}/>
        <CrossCanvas ref={crossRef} style={{...canvasSize}} {...attributes}/>
    </StageWrapper>;
};
