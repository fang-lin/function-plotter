import React, {Dispatch, SetStateAction, useEffect, useRef} from 'react';
import {arithmetic} from '../services/arithmetic';
import {
    StageWrapper,
    Canvas
} from './Stage.style';
import {Coordinate, deviceRatio, parseZoom, Size} from './App.function';
import {drawEquation, erasure, redrawAxis, redrawGrid} from './Stage.function';

interface StageProps {
    size: Size;
    origin: Coordinate;
    zoom: number;
    transform: Coordinate;
    smooth: boolean;
    setRedrawing: Dispatch<SetStateAction<boolean>>;
}

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
    }, [origin, size, zoom, smooth]);

    return <StageWrapper style={moving}>
        <Canvas ref={gridRef} {...{style}} {...attributes}/>
        <Canvas ref={axisRef} {...{style}} {...attributes}/>
        {equationRefs.map((equationRef, index) => <Canvas key={index}
                                                          ref={equationRef} {...{style}} {...attributes}/>)}
    </StageWrapper>;
};
