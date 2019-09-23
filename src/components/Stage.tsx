import React, {Dispatch, SetStateAction, useEffect, useRef} from 'react';
import {arithmetic} from '../services/arithmetic';
import {Coordinate, deviceRatio, parseZoom, Size} from '../services/utilities';
import {
    StageWrapper,
    Canvas
} from './Stage.style';

const GRID_COLOR = '#ddd';
const AXIS_COLOR = '#000';

interface StageProps {
    size: Size;
    origin: Coordinate;
    zoom: number;
    transform: Coordinate;
    smooth: boolean;
    setRedrawing: Dispatch<SetStateAction<boolean>>;
}

const withCanvasContext = (canvas: HTMLCanvasElement, withContext: (context: CanvasRenderingContext2D) => void) => {
    if (canvas) {
        const context = canvas.getContext('2d');
        if (context) {
            withContext(context);
        }
    }
};

const erasure = (canvas: HTMLCanvasElement, size: Size): void => {
    withCanvasContext(canvas, context => {
        context.clearRect(0, 0, size[0] * deviceRatio, size[1] * deviceRatio);
    });
};

const redrawAxis = (canvas: HTMLCanvasElement, origin: Coordinate, size: Size): void => {
    withCanvasContext(canvas, context => {
        erasure(canvas, size);
        context.beginPath();
        context.moveTo(0, Math.floor(origin[1] * deviceRatio) + 0.5);
        context.lineTo(size[0] * deviceRatio, Math.floor(origin[1] * deviceRatio) + 0.5);
        context.moveTo(Math.floor(origin[0] * deviceRatio) + 0.5, 0);
        context.lineTo(Math.floor(origin[0] * deviceRatio) + 0.5, size[1] * deviceRatio);

        context.strokeStyle = AXIS_COLOR;
        context.stroke();
    });
};

const redrawGrid = (canvas: HTMLCanvasElement, origin: Coordinate, size: Size, zoom: number): void => {
    withCanvasContext(canvas, context => {
        erasure(canvas, size);
        context.beginPath();
        let x = origin[0] * deviceRatio % zoom - zoom;
        let y = origin[1] * deviceRatio % zoom - zoom;
        while (x < size[0] * deviceRatio) {
            x += zoom;
            context.moveTo(x + 0.5, 0);
            context.lineTo(x + 0.5, size[1] * deviceRatio);
        }
        while (y < size[1] * deviceRatio) {
            y += zoom;
            context.moveTo(0, y + 0.5);
            context.lineTo(size[0] * deviceRatio, y + 0.5);
        }
        context.strokeStyle = GRID_COLOR;
        context.stroke();
    });
};

const drawEquation = (canvas: HTMLCanvasElement, matrix: Coordinate[], size: Size): void => {
    withCanvasContext(canvas, context => {
        console.log('drawEquation');
        context.fillStyle = '#0f0';
        matrix.map(point => {
            context.fillRect(point[0] * deviceRatio, point[1] * deviceRatio, deviceRatio, deviceRatio);
        });
    });
};

export const Stage = (props: StageProps) => {

    const {size, origin, zoom, transform, setRedrawing, smooth} = props;
    const gridRef: any = useRef<HTMLCanvasElement>();
    const axisRef: any = useRef<HTMLCanvasElement>();
    const equationRefs: any[] = [
        useRef<HTMLCanvasElement>()
    ];

    const attributes = {
        width: size[0] * deviceRatio,
        height: size[1] * deviceRatio
    };
    const style = {
        width: `${size[0]}px`,
        height: `${size[1]}px`,
    };
    const moving = {transform: `translate(${transform[0]}px, ${transform[1]}px)`};

    useEffect(() => {
        redrawGrid(gridRef.current, origin, size, parseZoom(zoom));
        redrawAxis(axisRef.current, origin, size);

        if (equationRefs[0] && equationRefs[0].current) {
            const canvas = equationRefs[0].current;
            erasure(canvas, size);
            setRedrawing(true);
            arithmetic({
                rangeX: [-origin[0] / zoom, (size[0] - origin[0]) / zoom],
                rangeY: [(origin[1] - size[1]) / zoom, origin[1] / zoom],
                fx: 'Math.sin(x*10)*10',
                offset: origin,
                zoom,
                isSmooth: smooth,
            }, (matrix: Coordinate[]) => {
                setRedrawing(false);
                erasure(canvas, size);
                drawEquation(canvas, matrix, size);
            });
        }
    }, [origin, size, zoom]);

    return <StageWrapper style={moving}>
        <Canvas ref={gridRef} {...{style}} {...attributes}/>
        <Canvas ref={axisRef} {...{style}} {...attributes}/>
        {equationRefs.map((equationRef, index) => <Canvas key={index}
                                                          ref={equationRef} {...{style}} {...attributes}/>)}
    </StageWrapper>;
};
