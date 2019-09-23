import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import debounce from 'lodash/debounce';
import {AppStyle, GlobalStyle} from './App.style';
import {PreloadImages} from './PreloadImages';
import {Stage} from './Stage';
import {StateBar} from './StateBar';
import {CrossLine} from './CrossLine';
import {ViewPanel} from './ViewPanel';
import {ZoomPanel} from './ZoomPanel';
import {Coordinate, DRAG_EVENTS, DRAG_STATE, DragEvent, getClient, Size} from '../services/utilities';

const getStageSize = (content: Element): Size => {
    if (content) {
        const {width, height} = content.getBoundingClientRect();
        return [width, height];
    }
    return [0, 0];
};

const getCenteredOrigin = (size: Size): Coordinate => {
    return [size[0] / 2, size[1] / 2]
};

const onDragStartHOF = (
    setClient: Dispatch<SetStateAction<Coordinate>>,
    setDragState: Dispatch<SetStateAction<DRAG_STATE>>,
    onDragging: (event: DragEvent) => void
) => (event: DragEvent): void => {
    setDragState(DRAG_STATE.START);
    setClient(getClient(event));
    window.addEventListener(DRAG_EVENTS[DRAG_STATE.MOVING], onDragging);
};

const onDraggingHOF = (
    setTransform: Dispatch<SetStateAction<Coordinate>>,
    setDragState: Dispatch<SetStateAction<DRAG_STATE>>,
    setClient: Dispatch<SetStateAction<Coordinate>>
) => (event: DragEvent): void => {
    const _client = getClient(event);
    setClient((client: Coordinate) => {
        setTransform([_client[0] - client[0], _client[1] - client[1]]);
        return client;
    });
    setDragState(DRAG_STATE.MOVING);
};

const onDragEndHOF = (
    setTransform: Dispatch<SetStateAction<Coordinate>>,
    setOrigin: Dispatch<SetStateAction<Coordinate>>,
    setDragState: Dispatch<SetStateAction<DRAG_STATE>>,
    setClient: Dispatch<SetStateAction<Coordinate>>,
    onDragging: (event: DragEvent) => void
) => (event: DragEvent): void => {
    window.removeEventListener(DRAG_EVENTS[DRAG_STATE.MOVING], onDragging);
    const _client = getClient(event);
    setTransform([0, 0]);
    setClient((client: Coordinate) => {
        setOrigin((origin: Coordinate) => [
            origin[0] + (_client[0] - client[0]),
            origin[1] + (_client[1] - client[1])
        ]);
        return [NaN, NaN];
    });
    setDragState(DRAG_STATE.END);
};

const onMovingHOF = (
    setDragState: Dispatch<SetStateAction<DRAG_STATE>>,
    setCursor: Dispatch<SetStateAction<Coordinate>>
) => (event: MouseEvent) => {
    setDragState((dragState: DRAG_STATE) => {
        if (dragState === DRAG_STATE.END) {
            setCursor(getClient(event));
        }
        return dragState;
    });
};


const dispatchEventListeners = (
    onDragStart: (event: DragEvent) => void,
    onDragEnd: (event: DragEvent) => void,
    onMoving: (event: MouseEvent) => void,
    onResizing: () => void
) => (remove: boolean) => {
    const dispatch = remove ? window.removeEventListener : window.addEventListener;
    dispatch(DRAG_EVENTS[DRAG_STATE.START], onDragStart);
    dispatch(DRAG_EVENTS[DRAG_STATE.END], onDragEnd);
    dispatch('mousemove', onMoving);
    dispatch('resize', onResizing);
};

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




