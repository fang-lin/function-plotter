import React, {CSSProperties, Dispatch, FunctionComponent, SetStateAction, useEffect, useRef} from 'react';
import {
    erasure,
    withCanvasContext
} from '../Stage.function';
import {CursorCanvas} from './StageCursor.style';
import {calculateTrackPoint, redrawCursor, redrawTrackPoint} from './StageCursor.function';
import {EquationWorkerOutput} from '../../../services/workerPool';
import {ParsedParams} from '../../../helpers/params';
import {Coordinate, Size} from '../../App/App.function';

interface StageProps {
    cursor: Coordinate;
    equationWorkerOutput: EquationWorkerOutput;
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
    const {cursor, size, params: {showCrossCursor}, attributes, style, equationWorkerOutput: {map, coordinates}, setTrackPoint} = props;
    const crossRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (showCrossCursor) {
            withCanvasContext(crossRef.current, context => {
                const trackPoint = calculateTrackPoint(cursor, coordinates, map);
                erasure(context, size);
                redrawCursor(context, trackPoint, size, 'rgba(0, 0, 0, 0.3)');
                redrawTrackPoint(context, trackPoint);
                setTrackPoint(trackPoint);
            });
        } else {
            setTrackPoint(cursor);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cursor[0], cursor[1], size[0], size[1], showCrossCursor]);

    useEffect(() => withCanvasContext(crossRef.current, context => erasure(context, size)), [size, showCrossCursor]);

    return <CursorCanvas ref={crossRef} {...attributes} {...{style}}/>;
};
