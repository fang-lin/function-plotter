import React, {CSSProperties, Dispatch, FunctionComponent, SetStateAction, useEffect, useRef} from 'react';
import {
    erasure,
    withCanvasContext
} from '../Stage.function';
import {CursorCanvas} from './StageCursor.style';
import {redrawCursor, redrawTrackPoint} from './StageCursor.function';
import {TrackPointWorkerInput, workerPool} from '../../../services/workerPool';
import {ParsedParams} from '../../../helpers/params';
import {Coordinate, Size} from '../../App/App.function';

interface StageProps {
    cursor: Coordinate;
    coordinates: Coordinate[];
    size: Size;
    attributes: {
        width: number;
        height: number;
    };
    style: CSSProperties;
    params: ParsedParams;
    setTrackPoint: Dispatch<SetStateAction<Coordinate>>;
}

export const StageCursor: FunctionComponent<StageProps> = (props) => {
    const {cursor, size, params, attributes, style, coordinates} = props;
    const {showCrossCursor, scale, origin} = params;

    const crossRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (showCrossCursor) {
            withCanvasContext(crossRef.current, async context => {
                erasure(context, size);

                // const point = await workerPool.exec<TrackPointWorkerInput, Coordinate>({
                //     type: 'TrackPoint',
                // });
                // redrawTrackPoint(context, point);

                // if (ss.length) {
                //
                //     const point = transformer(ss.sort((a, b) => {
                //         return ((a[0] - x) ** 2 + (a[1] - y) ** 2) ** .5 - ((b[0] - x) ** 2 + (b[1] - y) ** 2) ** .5;
                //     })[0], origin, size, scale);
                //
                //     redrawTrackPoint(context, point);
                //     redrawCursor(context, point, size, 'rgba(0, 0, 0, 0.3)');
                // } else {
                //     redrawCursor(context, cursor, size, 'rgba(0, 0, 0, 0.3)');
                // }

            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cursor[0], cursor[1], size[0], size[1], showCrossCursor]);

    useEffect(() => withCanvasContext(crossRef.current, context => erasure(context, size)), [size, showCrossCursor]);

    return <CursorCanvas ref={crossRef} {...attributes} {...{style}}/>;
};
