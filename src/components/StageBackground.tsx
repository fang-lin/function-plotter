import React, {CSSProperties, FunctionComponent, useEffect, useRef} from 'react';
import {ParsedParams, Size} from './App.function';
import {BackgroundCanvas} from './StageBackground.style';
import {
    axisColor,
    erasure,
    gridColor,
    redrawAxis,
    redrawGrid,
    withCanvasContext
} from './Stage.function';

interface StageProps {
    size: Size;
    attributes: {
        width: number;
        height: number;
    };
    style: CSSProperties;
    params: ParsedParams;
}

export const StageBackground: FunctionComponent<StageProps> = (props) => {
    const {size, style, attributes, params} = props;
    const {origin, scale} = params;

    const gridRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        withCanvasContext(gridRef.current, context => {
            erasure(context, size);
            redrawGrid(context, origin, size, scale, gridColor);
            redrawAxis(context, [
                Math.floor(size[0] / 2 + origin[0]),
                Math.floor(size[1] / 2 + origin[1]),
            ], size, axisColor, 2);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [origin[0], origin[1], size[0], size[1], scale]);

    return <BackgroundCanvas ref={gridRef} {...{style}} {...attributes}/>;
};
