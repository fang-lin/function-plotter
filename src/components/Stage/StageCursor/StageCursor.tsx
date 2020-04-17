import React, {CSSProperties, Dispatch, FunctionComponent, SetStateAction, useEffect, useRef} from 'react';
import {erasure, withCanvasContext} from '../Stage.function';
import {CursorCanvas} from './StageCursor.style';
import {calculateTrackPoint, redrawCursor, redrawTrackPoint} from './StageCursor.function';
import {EquationWorkerOutput} from '../../../services/workerPool';
import {ParsedParams} from '../../../helpers/params';
import {Coordinate, Size} from '../../App/App.function';

interface StageCursorProps {
    cursor: Coordinate;
    equationWorkerOutput: Map<number, EquationWorkerOutput>;
    size: Size;
    attributes: {
        width: number;
        height: number;
    };
    style: CSSProperties;
    params: ParsedParams;
    setTrackPoint: Dispatch<SetStateAction<Coordinate>>;
}

export const StageCursor: FunctionComponent<StageCursorProps> = (props) => {
    const {cursor, size, params: {showCrossCursor, selectedEquationIndex, equations, isBold}, attributes, style, equationWorkerOutput, setTrackPoint} = props;
    const crossRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (showCrossCursor) {
            withCanvasContext(crossRef.current, context => {
                const output = equationWorkerOutput.get(selectedEquationIndex);
                const equation = equations[selectedEquationIndex];
                let trackPoint = cursor;
                let color = 'rgba(0, 0, 0, 0.3)';
                if (output && equation?.displayed) {
                    const {coordinates, mapping} = output;
                    color = equation.color;
                    trackPoint = calculateTrackPoint(cursor, coordinates, mapping);

                }
                erasure(context, size);
                redrawCursor(context, trackPoint, size, 'rgba(0, 0, 0, 0.3)');
                redrawTrackPoint(context, trackPoint, color, isBold ? 4 : 2);
                setTrackPoint(trackPoint);
            });
        } else {
            setTrackPoint(cursor);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cursor[0], cursor[1], size[0], size[1], showCrossCursor, selectedEquationIndex, isBold, equations.serialization().join()]);

    useEffect(() => withCanvasContext(crossRef.current, context => erasure(context, size)), [size, showCrossCursor]);

    return <CursorCanvas ref={crossRef} {...attributes} {...{style}}/>;
};
