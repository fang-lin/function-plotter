import React, {useCallback, useEffect, useRef, useState} from 'react';
import debounce from 'lodash/debounce';
import {useNavigate, useParams} from 'react-router-dom';
import {AppWrapper, FullScreenGlobalStyle} from './styles';
import {Coordinate, DragEvent, DragEvents, DragState, getClient, getStageSize, Size} from './functions';
import {PreloadImages} from '../../components/PreloadImages';
import {InfoDialog} from '../../components/InfoDialog';
import {EquationPanel} from '../../components/EquationPanel';
import {Stage} from '../../components/Stage';
import {EquationDialog} from '../../components/EquationDialog';
import {ZoomPanel} from '../../components/ZoomPanel';
import {ViewPanel} from '../../components/ViewPanel';
import {StateBar} from '../../components/StateBar';
import {Redrawing} from '../../components/Redrawing';
import {
    combinePathToURL,
    OriginalParams,
    ParsedParams,
    parseParams,
    stringifyParams
} from '../../helpers';

export * from './functions';

export const Plotter: React.FC = () => {
    const navigate = useNavigate();
    const routeParams = useParams() as unknown as OriginalParams;
    const appRef = useRef<HTMLDivElement>(null);
    const [dragState, setDragState] = useState<DragState>(DragState.end);
    const [size, setSize] = useState<Size>([0, 0]);
    const [redrawing, setRedrawing] = useState(false);
    const [transform, setTransform] = useState<Coordinate>([0, 0]);
    const [cursor, setCursor] = useState<Coordinate>([0, 0]);
    const [trackPoint, setTrackPoint] = useState<Coordinate>([0, 0]);
    const clientRef = useRef<Coordinate>([0, 0]);
    const paramsRef = useRef<OriginalParams>(routeParams);
    paramsRef.current = routeParams;

    const params = parseParams(routeParams);
    const {showCrossCursor} = params;

    const pushToHistory = useCallback((parsedParams: Partial<ParsedParams>): void => {
        const currentParams = parseParams(paramsRef.current);
        navigate(combinePathToURL(stringifyParams({...currentParams, ...parsedParams})));
    }, [navigate]);

    const resetSize = useCallback((): void => {
        setSize(getStageSize(appRef.current));
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onResizing = useCallback(debounce(() => {
        setSize(getStageSize(appRef.current));
    }, 200), []);

    const onMoving = useCallback((event: DragEvent): void => {
        setCursor(getClient(event));
    }, []);

    const onDragging = useCallback((event: DragEvent): void => {
        const instantaneousClient = getClient(event);
        const client = clientRef.current;
        setTransform([instantaneousClient[0] - client[0], instantaneousClient[1] - client[1]]);
        setDragState(DragState.moving);
    }, []);

    const onDragEnd = useCallback((event: DragEvent): void => {
        const instantaneousClient = getClient(event);
        const client = clientRef.current;
        const currentParams = parseParams(paramsRef.current);
        const {origin, scale} = currentParams;

        navigate(combinePathToURL(stringifyParams({
            ...currentParams,
            origin: [
                origin[0] + (instantaneousClient[0] - client[0]) / scale,
                origin[1] + (instantaneousClient[1] - client[1]) / scale
            ]
        })));

        setTransform([0, 0]);
        setDragState(DragState.end);
        clientRef.current = [0, 0];

        window.removeEventListener(DragEvents[DragState.moving], onDragging as EventListener);
        window.removeEventListener(DragEvents[DragState.end], onDragEnd as EventListener);
        window.addEventListener(DragEvents[DragState.moving], onMoving as EventListener);
    }, [navigate, onDragging, onMoving]);

    const onDragStart = useCallback((event: DragEvent): void => {
        clientRef.current = getClient(event);
        setDragState(DragState.start);
        window.addEventListener(DragEvents[DragState.moving], onDragging as EventListener);
        window.addEventListener(DragEvents[DragState.end], onDragEnd as EventListener);
        window.removeEventListener(DragEvents[DragState.moving], onMoving as EventListener);
    }, [onDragging, onDragEnd, onMoving]);

    useEffect(() => {
        resetSize();
        window.addEventListener('resize', onResizing);
        window.addEventListener(DragEvents[DragState.moving], onMoving as EventListener);
        window.addEventListener(DragEvents[DragState.start], onDragStart as EventListener);

        return () => {
            window.removeEventListener('resize', onResizing);
            window.removeEventListener(DragEvents[DragState.moving], onMoving as EventListener);
            window.removeEventListener(DragEvents[DragState.start], onDragStart as EventListener);
        };
    }, [resetSize, onResizing, onMoving, onDragStart]);

    return <AppWrapper {...{dragState, showCrossCursor}} ref={appRef}>
        <FullScreenGlobalStyle/>
        <PreloadImages/>
        <Stage {...{cursor, size, transform, setRedrawing, params, setTrackPoint}}/>
        <Redrawing {...{redrawing}}/>
        <StateBar {...{params, size, trackPoint, pushToHistory}}/>
        <EquationPanel {...{pushToHistory, params, size}}/>
        <ViewPanel {...{pushToHistory, params}}/>
        <ZoomPanel {...{pushToHistory, params}}/>
        <EquationDialog {...{pushToHistory, params}}/>
        <InfoDialog {...{pushToHistory, params}}/>
    </AppWrapper>;
};
