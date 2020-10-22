import React, {CSSProperties, FunctionComponent, useEffect, useRef} from 'react';
import {BackgroundCanvas} from './StageBackground.style';
import {axisColor, erasure, gridColor, withCanvasContext} from '../Stage.function';
import {redrawAxis, redrawGrid} from './StageBackground.function';
import {ParsedParams} from '../../../helpers';
import {Size} from '../../../pages/Diagraph/Diagraph.function';

interface StageBackgroundProps {
    size: Size;
    attributes: {
        width: number;
        height: number;
    };
    style: CSSProperties;
    params: ParsedParams;
}

export const StageBackground: FunctionComponent<StageBackgroundProps> = (props) => {
    const {size, style, attributes, params: {origin, scale}} = props;

    const gridRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        withCanvasContext(gridRef.current, context => {
            erasure(context, size);
            redrawGrid(context, origin, size, scale, gridColor);
            redrawAxis(context, origin, size, scale, axisColor);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [origin[0], origin[1], size[0], size[1], scale]);

    return <BackgroundCanvas ref={gridRef} {...{style}} {...attributes}/>;
};
