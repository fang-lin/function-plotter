import React, {useEffect, useRef, useState} from 'react';
import debounce from 'lodash/debounce';
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
    Size, Equation
} from './App.function';
import {EquationPanel} from './EquationPanel';
import {EquationForm} from "./EquationForm";

export const App = () => {
    const appRef: any = useRef<HTMLDivElement>();

    const [dragState, setDragState] = useState<DragState>(DragState.end);
    const [, setClient] = useState<Coordinate>([NaN, NaN]);
    const [transform, setTransform] = useState<Coordinate>([0, 0]);
    const [cursor, setCursor] = useState<Coordinate>([NaN, NaN]);
    const [size, setSize] = useState<Size>([0, 0]);
    const [origin, setOrigin] = useState<Coordinate>([0, 0]);
    const [showCoordinate, setShowCoordinate] = useState<boolean>(false);
    const [smooth, setSmooth] = useState<boolean>(true);
    const [isBold, setIsBold] = useState<boolean>(false);
    const [redrawing, setRedrawing] = useState<boolean>(false);

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
        color: '#829',
        displayed: true
    }]);

    const equation = {fx: 'Math.sin(x)', color: '#062', displayed: true};


    const [displayEquationForm, setDisplayEquationForm] = useState<boolean>(false);
    const [expandEquationPanel, setExpandEquationPanel] = useState<boolean>(true);

    const [zoomIndex, setZoomIndex] = useState<number>(7);

    useEffect(() => {
        const onDragging = onDraggingHOF(setTransform, setDragState, setClient);
        const onDragStart = onDragStartHOF(setClient, setDragState, onDragging);
        const onDragEnd = onDragEndHOF(setTransform, setOrigin, setDragState, setClient, onDragging);
        const onMoving = onMovingHOF(setDragState, setCursor);

        const onResizing = debounce(() => setSize(getStageSize(appRef.current)), 200);
        const stageSize = getStageSize(appRef.current);

        setOrigin(getCenteredOrigin(stageSize));
        setSize(stageSize);

        addEventListeners(onDragStart, onDragEnd, onMoving, onResizing);

        return () => {
            removeEventListeners(onDragStart, onDragEnd, onMoving, onResizing);
        };
    }, []);

    return <AppWrapper {...{dragState}} ref={appRef}>
        <PreloadImages/>
        <Stage {...{size, transform, zoomIndex, origin, setRedrawing, smooth, isBold}}/>
        {showCoordinate && dragState === DragState.end && <CrossLine {...{cursor, size}}/>}
        <StateBar  {...{origin, zoomIndex, cursor, redrawing}}/>
        <EquationPanel {...{
            equations,
            setEquations,
            setDisplayEquationForm,
            expandEquationPanel,
            setExpandEquationPanel
        }}/>
        <ViewPanel {...{
            getCenteredOrigin,
            setOrigin,
            size,
            smooth,
            setSmooth,
            showCoordinate,
            setShowCoordinate,
            isBold,
            setIsBold
        }}/>
        <ZoomPanel {...{zoomIndex, setZoomIndex}}/>
        <EquationForm {...{equation, setEquations, displayEquationForm, setDisplayEquationForm}}/>
        <GlobalStyle/>
    </AppWrapper>;
};




