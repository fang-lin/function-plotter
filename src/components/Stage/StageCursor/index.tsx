import React, {CSSProperties, Dispatch, FunctionComponent, SetStateAction, useEffect, useRef} from 'react';
import {erasure, withCanvasContext} from '../functions';
import {CursorCanvas} from './styles';
import {calculateTrackPoint, redrawCursor, redrawTrackPoint} from './functions';
import {EquationWorkerOutput} from '../../../services/workerPool';
import {ParsedParams} from '../../../helpers';
import {Coordinate, Size} from '../../../pages/Plotter';

export * from './functions';

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
                let point = cursor;
                let color = 'rgba(0, 0, 0, 0.3)';
                if (output && equation?.displayed) {
                    const {coordinates, mapping} = output;
                    const trackPoint = calculateTrackPoint(cursor, coordinates, mapping);
                    if (trackPoint) {
                        point = trackPoint;
                        color = equation.color;
                    }
                }
                erasure(context, size);
                redrawCursor(context, point, size, 'rgba(0, 0, 0, 0.3)');
                redrawTrackPoint(context, point, color, isBold ? 4 : 2);
                setTrackPoint(point);
            });
        } else {
            setTrackPoint(cursor);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cursor[0], cursor[1], size[0], size[1], showCrossCursor, selectedEquationIndex, isBold, equations.serialization().join()]);

    useEffect(() => withCanvasContext(crossRef.current, context => erasure(context, size)), [size, showCrossCursor]);

    return <CursorCanvas ref={crossRef} {...attributes} {...{style}}/>;
};
