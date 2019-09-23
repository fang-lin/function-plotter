import React, {useEffect, useRef, useState} from 'react';
import debounce from 'lodash/debounce';
import {AppStyle, GlobalStyle} from './App.style';
import {PreloadImages} from './PreloadImages';
import {Stage} from './Stage';
import {StateBar} from './StateBar';
import {CrossLine} from './CrossLine';
import {ViewPanel} from './ViewPanel';
import {ZoomPanel} from './ZoomPanel';
import {
    Coordinate,
    dispatchEventListeners, DRAG_STATE,
    getCenteredOrigin,
    getStageSize,
    onDragEndHOF,
    onDraggingHOF,
    onDragStartHOF,
    onMovingHOF, Size
} from './App.function';


export const App = () => {
    const appRef: any = useRef<HTMLDivElement>();

    const [dragState, setDragState] = useState<DRAG_STATE>(DRAG_STATE.END);
    const [, setClient] = useState<Coordinate>([NaN, NaN]);
    const [transform, setTransform] = useState<Coordinate>([0, 0]);
    const [cursor, setCursor] = useState<Coordinate>([NaN, NaN]);
    const [size, setSize] = useState<Size>([0, 0]);
    const [origin, setOrigin] = useState<Coordinate>([0, 0]);
    const [showCoordinate, setShowCoordinate] = useState<boolean>(false);
    const [smooth, setSmooth] = useState<boolean>(true);
    const [redrawing, setRedrawing] = useState<boolean>(false);

    const [zoom, setZoom] = useState<number>(8);

    useEffect(() => {
        const onDragging = onDraggingHOF(
            setTransform,
            setDragState,
            setClient
        );

        const onDragStart = onDragStartHOF(
            setClient,
            setDragState,
            onDragging
        );

        const onDragEnd = onDragEndHOF(
            setTransform,
            setOrigin,
            setDragState,
            setClient,
            onDragging
        );

        const onMoving = onMovingHOF(
            setDragState,
            setCursor
        );

        const onResizing = debounce(() => setSize(getStageSize(appRef.current)), 200);

        const stageSize = getStageSize(appRef.current);
        setOrigin(getCenteredOrigin(stageSize));
        setSize(stageSize);

        dispatchEventListeners(
            onDragStart,
            onDragEnd,
            onMoving,
            onResizing
        )(false);

        return () => {
            dispatchEventListeners(
                onDragStart,
                onDragEnd,
                onMoving,
                onResizing
            )(true);
        };
    }, []);

    return <AppStyle {...{dragState}} ref={appRef}>
        <PreloadImages/>
        <Stage {...{size, transform, zoom, origin, setRedrawing, smooth}}/>
        {showCoordinate && dragState === DRAG_STATE.END && <CrossLine {...{cursor, size}}/>}
        <StateBar  {...{origin, zoom, cursor, redrawing}}/>
        <ViewPanel {...{
            getCenteredOrigin,
            setOrigin,
            size,
            smooth,
            setSmooth,
            showCoordinate,
            setShowCoordinate
        }}/>
        <ZoomPanel {...{setZoom, zoom}}/>
        <GlobalStyle/>
    </AppStyle>;
};




