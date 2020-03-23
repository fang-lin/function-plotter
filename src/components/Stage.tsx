import React, {Dispatch, SetStateAction, useEffect, useRef} from 'react';
import {arithmetic} from '../services/arithmetic';
import {
    StageWrapper,
    GridCanvas,
    AxisCanvas,
    EquationCanvas, BackgroundCanvas
} from './Stage.style';
import {Coordinate, deviceRatio, parseZoom, Size} from './App.function';
import {drawEquation, erasure, redrawAxis, redrawGrid} from './Stage.function';

interface StageProps {
    size: Size;
    ORIGIN: Coordinate;
    ZOOM_INDEX: number;
    transform: Coordinate;
    SMOOTH: boolean;
    IS_BOLD: boolean;
    setRedrawing: Dispatch<SetStateAction<boolean>>;
}

export const Stage = (props: StageProps) => {

    const {size, ORIGIN, ZOOM_INDEX, transform, setRedrawing, SMOOTH, IS_BOLD} = props;
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
        transform: `translate(${transform[0]}px, ${transform[1]}px)`
    };
    // const moving = {transform: `translate(${transform[0]}px, ${transform[1]}px)`};

    useEffect(() => {
        console.log(props.ORIGIN, '=========', ORIGIN, size, ZOOM_INDEX, ZOOM_INDEX, IS_BOLD);
        redrawGrid(gridRef.current, ORIGIN, size, parseZoom(ZOOM_INDEX));
        redrawAxis(axisRef.current, ORIGIN, size);

        if (equationRefs[0] && equationRefs[0].current) {
            const canvas = equationRefs[0].current;
            erasure(canvas, size);
            setRedrawing(true);
            arithmetic({
                rangeX: [-ORIGIN[0] / parseZoom(ZOOM_INDEX) * deviceRatio, (size[0] - ORIGIN[0]) / parseZoom(ZOOM_INDEX) * deviceRatio],
                rangeY: [(ORIGIN[1] - size[1]) / parseZoom(ZOOM_INDEX) * deviceRatio, ORIGIN[1] / parseZoom(ZOOM_INDEX) * deviceRatio],
                fx: 'Math.sin(x)',
                offset: ORIGIN,
                zoom: parseZoom(ZOOM_INDEX) / deviceRatio,
                isSmooth: SMOOTH,
            }, (matrix: Coordinate[]) => {
                setRedrawing(false);
                erasure(canvas, size);
                drawEquation(canvas, matrix, IS_BOLD);
            });
        }
    }, [ORIGIN, size, ZOOM_INDEX, SMOOTH, IS_BOLD]);

    return <StageWrapper>
        <BackgroundCanvas ref={axisRef} {...{style}} {...attributes}/>
        {/*{equationRefs.map((equationRef, index) => <EquationCanvas key={index}*/}
        {/*                                                          ref={equationRef} {...{style}} {...attributes}/>)}*/}
        <GridCanvas ref={gridRef} {...{style}} {...attributes}/>
        <AxisCanvas ref={axisRef} {...{style}} {...attributes}/>
    </StageWrapper>;
};
