import React, {Dispatch, SetStateAction, useEffect, useRef} from 'react';
import {arithmetic} from '../services/arithmetic';
import {
    StageWrapper,
    GridCanvas,
    AxisCanvas,
    EquationCanvas,
    BackgroundCanvas
} from './Stage.style';
import {ParsedParams, Coordinate, deviceRatio, parseZoom, Size} from './App.function';
import {drawEquation, erasure, redrawAxis, redrawGrid} from './Stage.function';

interface StageProps {
    size: Size;
    transform: Coordinate;
    setRedrawing: Dispatch<SetStateAction<boolean>>;
    params: ParsedParams;
}

export const Stage = (props: StageProps) => {
    const {size, transform, setRedrawing} = props;
    const {origin, zoomIndex, isSmooth, isBold} = props.params;
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
        redrawGrid(gridRef.current, origin, size, parseZoom(zoomIndex));
        redrawAxis(axisRef.current, origin, size);

        if (equationRefs[0] && equationRefs[0].current) {
            const canvas = equationRefs[0].current;
            erasure(canvas, size);
            setRedrawing(true);
            arithmetic({
                rangeX: [-origin[0] / parseZoom(zoomIndex) * deviceRatio, (size[0] - origin[0]) / parseZoom(zoomIndex) * deviceRatio],
                rangeY: [(origin[1] - size[1]) / parseZoom(zoomIndex) * deviceRatio, origin[1] / parseZoom(zoomIndex) * deviceRatio],
                fx: 'Math.sin(x)',
                offset: origin,
                zoom: parseZoom(zoomIndex) / deviceRatio,
                isSmooth: isSmooth,
            }, (matrix: Coordinate[]) => {
                setRedrawing(false);
                erasure(canvas, size);
                drawEquation(canvas, matrix, isBold);
            });
        }
    }, [origin, size, zoomIndex, isSmooth, isBold]);

    return <StageWrapper>
        <BackgroundCanvas ref={axisRef} {...{style}} {...attributes}/>
        {/*{equationRefs.map((equationRef, index) => <EquationCanvas key={index}*/}
        {/*                                                          ref={equationRef} {...{style}} {...attributes}/>)}*/}
        <GridCanvas ref={gridRef} {...{style}} {...attributes}/>
        <AxisCanvas ref={axisRef} {...{style}} {...attributes}/>
    </StageWrapper>;
};
