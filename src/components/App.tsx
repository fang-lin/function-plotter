import React, {useEffect, useRef, useState} from 'react';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import {AppWrapper, GlobalStyle} from './AppWrapper';
import {PreloadImages} from './PreloadImages';
import {Stage} from './Stage';
import {StateBar} from './StateBar';
import {CrossLine} from './CrossLine';
import {ViewPanel} from './ViewPanel';
import {ZoomPanel} from './ZoomPanel';
import {
    Coordinate,
    addEventListeners,
    DragState,
    removeEventListeners,
    getCenteredOrigin,
    getStageSize,
    onDragEndHOF,
    onDraggingHOF,
    onDragStartHOF,
    onMovingHOF,
    Size, Equation, decodeParams, Params, paramsToURL
} from './App.function';
import {EquationPanel} from './EquationPanel';
import {EquationDialog} from './EquationDialog';
import {InfoDialog} from './InfoDialog';
import {useHistory, useParams} from "react-router";


export const App = (props: any) => {
    const appRef: any = useRef<HTMLDivElement>();

    const {ZOOM_INDEX, ORIGIN, SHOW_COORDINATE, EQUATIONS, IS_BOLD, SMOOTH} = decodeParams(useParams<Params>());
    const toURL = paramsToURL(useParams<Params>());
    const history = useHistory();

    const [dragState, setDragState] = useState<DragState>(DragState.end);
    const [, setClient] = useState<Coordinate>([NaN, NaN]);
    const [transform, setTransform] = useState<Coordinate>([0, 0]);
    const [cursor, setCursor] = useState<Coordinate>([NaN, NaN]);
    const [size, setSize] = useState<Size>([0, 0]);
    const [origin, setOrigin] = useState<Coordinate>(ORIGIN);
    const [showCoordinate, setShowCoordinate] = useState<boolean>(SHOW_COORDINATE);
    const [smooth, setSmooth] = useState<boolean>(SMOOTH);
    const [isBold, setIsBold] = useState<boolean>(IS_BOLD);
    const [redrawing, setRedrawing] = useState<boolean>(false);
    const [zoomIndex, setZoomIndex] = useState<number>(ZOOM_INDEX);

    const [equations, setEquations] = useState<Equation[]>([{
        fx: 'y = asd 3 jdsjdhg sdj hsd fjh ds7 8 234 56 @ # $ %^ & * asd 3 jdsjdhg sdj hsd fjh ds7 8 234 56 @ # $ %^ & * asd 3 jdsjdhg sdj hsd fjh ds7 8 234 56 @ # $ %^ & * ',
        color: '#f90',
        displayed: true
    }, {
        fx: 'Math.sin(x)',
        color: '#009',
        displayed: true
    }, {
        fx: 'Math.sin(x)',
        color: '#859',
        displayed: true
    }, {
        fx: 'Math.sin(x)',
        color: '#899',
        displayed: true
    }]);

    const equation = {fx: 'Math.sin(x)', color: '#062', displayed: true};

    const [equationDialogDisplay, setEquationDialogDisplay] = useState<boolean>(false);
    const [infoDialogDisplay, setInfoDialogDisplay] = useState<boolean>(false);
    const [expandEquationPanel, setExpandEquationPanel] = useState<boolean>(true);

    let ori: Coordinate;


    useEffect(() => {
        const onDragging = onDraggingHOF(setTransform, setDragState, setClient);
        const onDragStart = onDragStartHOF(setClient, setDragState, onDragging);
        const onDragEnd = onDragEndHOF(setTransform, (cb: any) => {
            console.log('ori', ori);
            cb(ori);
        }, toURL, history, setDragState, setClient, onDragging);
        const onMoving = onMovingHOF(setDragState, setCursor);

        const onResizing = debounce(() => setSize(getStageSize(appRef.current)), 200);
        const stageSize = getStageSize(appRef.current);

        setSize(stageSize);

        addEventListeners(onDragStart, onDragEnd, onMoving, onResizing);

        return () => {
            removeEventListeners(onDragStart, onDragEnd, onMoving, onResizing);
        };
    }, []);

    useEffect(() => setZoomIndex(ZOOM_INDEX), [ZOOM_INDEX]);
    useEffect(() => {
        ori = ORIGIN;
        setOrigin(origin => isEqual(origin, ORIGIN) ? origin : ORIGIN);
    }, [ORIGIN]);
    useEffect(() => setSmooth(SMOOTH), [SMOOTH]);
    useEffect(() => setShowCoordinate(SHOW_COORDINATE), [SHOW_COORDINATE]);
    useEffect(() => setIsBold(IS_BOLD), [IS_BOLD]);


    return <AppWrapper {...{dragState}} ref={appRef}>
        <PreloadImages/>
        <Stage {...{size, transform, zoomIndex, origin, setRedrawing, smooth, isBold}}/>
        {showCoordinate && dragState === DragState.end && <CrossLine {...{cursor, size}}/>}
        <StateBar  {...{origin, zoomIndex, cursor, redrawing}}/>
        <EquationPanel {...{
            equations,
            setEquations,
            setEquationDialogDisplay,
            expandEquationPanel,
            setExpandEquationPanel,
            setInfoDialogDisplay
        }}/>
        <ViewPanel {...{
            getCenteredOrigin,
            setOrigin,
            size
        }}/>
        <ZoomPanel/>
        <EquationDialog {...{equation, setEquations, equationDialogDisplay, setEquationDialogDisplay}}/>
        <InfoDialog {...{infoDialogDisplay, setInfoDialogDisplay}}/>
        <GlobalStyle/>
    </AppWrapper>;
};




