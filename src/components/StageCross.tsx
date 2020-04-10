import React, {CSSProperties, FunctionComponent, useEffect, useRef} from 'react';
import {ParsedParams, Coordinate, Size} from './App.function';
import {
    erasure,
    redrawAxis,
    withCanvasContext
} from './Stage.function';
import {CrossCanvas} from './StageCross.style';

interface StageProps {
    cursor: Coordinate;
    size: Size;
    attributes: {
        width: number;
        height: number;
    };
    style: CSSProperties;
    params: ParsedParams;
}

export const StageCross: FunctionComponent<StageProps> = (props) => {
    const {cursor, size, params, attributes, style} = props;
    const {showCrossCursor} = params;

    const crossRef = useRef<HTMLCanvasElement>(null);

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

    return <CrossCanvas ref={crossRef} {...attributes} {...{style}}/>;
};
