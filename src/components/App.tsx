import React, {
    Component,
    RefObject,
    createRef,
    useState,
    Dispatch,
    SetStateAction,
    useEffect,
    useRef,
    MutableRefObject
} from 'react';
import debounce from 'lodash/debounce';
import {GlobalStyle, AppStyle} from './App.style';
import {PreloadImages} from './PreloadImages';
import {Stage} from './Stage';
import {StateBar, StateBarProps} from './StateBar';
import {CrossLine} from './CrossLine';
import {ViewPanel} from './ViewPanel';
import {ZoomPanel} from './ZoomPanel';
import {getClient, DRAG_EVENTS, DRAG_STATE, Coordinate, DragEvent, getCoordinate, Size} from '../services/utilities';
import {Stage as StageStore} from '../stores/Stage';
import {Equations as EquationsStore} from '../stores/Equations';
import {AppTitle, IsDrawing, StateBarWrapper} from "./StateBar.style";
import {version} from "../../package.json";
import clamp from 'lodash/clamp';

export interface AppProps {
    stage: StageStore;
    equations: EquationsStore;
}

export interface AppState {
    dragState: DRAG_STATE;
    dragStartClient: Coordinate;
    refreshID: number
}

export const App = () => {
    const appRef: any = useRef<HTMLDivElement>();

    const [dragState, setDragState] = useState<DRAG_STATE>(DRAG_STATE.END);
    const [transform, setTransform] = useState<Coordinate>([0, 0]);
    const [cursor, setCursor] = useState<Coordinate>([NaN, NaN]);
    const [size, _setSize] = useState<Size>([0, 0]);
    const [origin, setOrigin] = useState<Coordinate>([0, 0]);
    const [range, _setRange] = useState<[Size, Size]>([[0, 0], [0, 0]]);
    const [showCoordinate, setShowCoordinate] = useState<boolean>(false);
    const [smooth, setSmooth] = useState<boolean>(true);
    const [redrawing, setRedrawing] = useState<boolean>(false);

    const [zoom, _setZoom] = useState<number>(8);

    useEffect(() => {
        let client: Coordinate = [NaN, NaN];

        function onDragStart(event: DragEvent) {
            setDragState(DRAG_STATE.START);
            client = getClient(event);
            window.addEventListener(DRAG_EVENTS[DRAG_STATE.MOVING], onDragging);
        }

        function onDragging(event: DragEvent) {
            const _client = getClient(event);
            setTransform([_client[0] - client[0], _client[1] - client[1]]);
            setDragState(DRAG_STATE.MOVING);
        }

        function onDragEnd(event: DragEvent) {
            window.removeEventListener(DRAG_EVENTS[DRAG_STATE.MOVING], onDragging);
            const _client = getClient(event);
            setTransform([0, 0]);
            setOrigin([
                origin[0] + (_client[0] - client[0]),
                origin[1] + (_client[1] - client[1])
            ]);
            client = [NaN, NaN];
            setDragState(DRAG_STATE.END);
        }

        function updateStageSize() {
            if (appRef.current) {
                const {width, height} = appRef.current.getBoundingClientRect();
                _setSize([width, height]);
                setRange();
            }
        }

        updateStageSize();
        setOriginInCenter();
        window.addEventListener(DRAG_EVENTS[DRAG_STATE.START], onDragStart);
        window.addEventListener(DRAG_EVENTS[DRAG_STATE.END], onDragEnd);
        window.addEventListener('mousemove', event => {
            if (dragState === DRAG_STATE.END) {
                setCursor(getClient(event));
            }
        });
        window.addEventListener('resize', debounce(updateStageSize, 200));
        return () => {
            window.removeEventListener(DRAG_EVENTS[DRAG_STATE.START], onDragStart);
            window.removeEventListener(DRAG_EVENTS[DRAG_STATE.END], onDragEnd);
            window.removeEventListener('resize');
            window.removeEventListener('mousemove');
        };
    }, []);

    function setRange() {
        _setRange([
            [-origin[0] / zoom, (size[0] - origin[0]) / zoom],
            [(origin[1] - size[1]) / zoom, origin[1] / zoom]
        ]);
    }

    function setZoom(action: (zoom: number) => number) {
        return _setZoom(zoom => clamp(action(zoom), 1, 16));
    }

    function setOriginInCenter() {
        setOrigin([size[0] / 2, size[1] / 2]);
        setRange();
    }

    function setSize(size: Size) {
        _setSize(size);
        setRange();
    }

    return <AppStyle {...{dragState}} ref={appRef}>
        <PreloadImages/>
        <Stage {...{size, transform}}/>
        {showCoordinate && dragState === DRAG_STATE.END && <CrossLine {...{cursor, size}}/>}
        <StateBar  {...{origin, zoom, cursor, redrawing}}/>
        <ViewPanel {...{setOriginInCenter, smooth, setSmooth, showCoordinate, setShowCoordinate}}/>
        <ZoomPanel {...{setZoom, zoom}}/>
        <GlobalStyle/>
    </AppStyle>;
};




