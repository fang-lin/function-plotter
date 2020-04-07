import {Dispatch, DOMAttributes, SetStateAction, SyntheticEvent} from 'react';
import {History} from 'history';
import range from 'lodash/range';
import {Equations} from '../services/Equations';
import {FunctionEquation} from '../services/FunctionEquation';
import {ParametricEquation} from '../services/ParametricEquation';

export type Coordinate = [number, number];
export type Size = [number, number];

export interface ParsedParams {
    scale: number;
    origin: Coordinate;
    equations: Equations<FunctionEquation | ParametricEquation>;
    displayEquationDialog: boolean;
    expandEquationPanel: boolean;
    expandStateBar: boolean;
    displayInfoDialog: boolean;
    showCrossCursor: boolean;
    isSmooth: boolean;
    isBold: boolean;
}

export type OriginalParams = {
    scaleLevel: string;
    originX: string;
    originY: string;
    equations: string;
    toggles: string;
}

export const deviceRatio: number = ((): number => window.devicePixelRatio || 1)();
export const scaleRange: number[] = range(2, 26).map(scale => 1.4142135623730951 ** scale);

export function parseScale(scaleLevel: number): number {
    return scaleRange[scaleLevel - 1];
}

export function getScaleLevel(scale: number): number {
    return scaleRange.indexOf(scale) + 1;
}

function isTouchEvent(event: DragEvent): event is TouchEvent {
    return window.TouchEvent && event instanceof TouchEvent;
}

export function getClient(event: DragEvent): Coordinate {
    const {clientX, clientY} = isTouchEvent(event) ? event.changedTouches[0] : event;
    return [clientX, clientY];
}

export const isMobile: boolean = ((): boolean => {
    try {
        document.createEvent('TouchEvent');
        return true;
    } catch (e) {
        return false;
    }
})();

export enum DragState {
    start,
    moving,
    end
}

export type DragEvent = MouseEvent | TouchEvent;

export const DragEvents: Record<DragState, keyof WindowEventMap> = isMobile ? {
    [DragState.start]: 'touchstart',
    [DragState.moving]: 'touchmove',
    [DragState.end]: 'touchend',
} : {
    [DragState.start]: 'mousedown',
    [DragState.moving]: 'mousemove',
    [DragState.end]: 'mouseup',
};

export const JSXDragEvents: Record<DragState, keyof DOMAttributes<Element>> = isMobile ? {
    [DragState.start]: 'onTouchStart',
    [DragState.moving]: 'onTouchMove',
    [DragState.end]: 'onTouchEnd',
} : {
    [DragState.start]: 'onMouseDown',
    [DragState.moving]: 'onMouseMove',
    [DragState.end]: 'onMouseUp',
};


export const getStageSize = (content: Element | null): Size => {
    if (content) {
        const {width, height} = content.getBoundingClientRect();
        return [width, height];
    }
    return [0, 0];
};

export const onDragStartHOF = (
    {setClient, setDragState, onDragging}: {
        setClient: Dispatch<SetStateAction<Coordinate>>;
        setDragState: Dispatch<SetStateAction<DragState>>;
        onDragging: (event: DragEvent) => void;
    }
) => (event: DragEvent): void => {
    setDragState(DragState.start);
    setClient(getClient(event));
    window.addEventListener(DragEvents[DragState.moving], onDragging);
};

export const onDraggingHOF = (
    {setTransform, setDragState, setClient}: {
        setTransform: Dispatch<SetStateAction<Coordinate>>;
        setDragState: Dispatch<SetStateAction<DragState>>;
        setClient: Dispatch<SetStateAction<Coordinate>>;
    }
) => (event: DragEvent): void => {
    const _client = getClient(event);
    setClient((client: Coordinate) => {
        setTransform([_client[0] - client[0], _client[1] - client[1]]);
        return client;
    });
    setDragState(DragState.moving);
};

export const onDragEndHOF = (
    {setTransform, origin, toPath, history, setDragState, setClient, onDragging}: {
        setTransform: Dispatch<SetStateAction<Coordinate>>;
        // setOrigin: Dispatch<SetStateAction<Coordinate>>,
        origin: Coordinate;
        toPath: (param: Partial<ParsedParams>) => string;
        history: History;
        setDragState: Dispatch<SetStateAction<DragState>>;
        setClient: Dispatch<SetStateAction<Coordinate>>;
        onDragging: (event: DragEvent) => void;
    }
) => (event: DragEvent): void => {
    window.removeEventListener(DragEvents[DragState.moving], onDragging);
    const _client = getClient(event);
    setTransform([0, 0]);
    setDragState(DragState.end);

    setClient((client: Coordinate) => {
        history.push(toPath({
            origin: [
                origin[0] + _client[0] - client[0],
                origin[1] + _client[1] - client[1]
            ]
        }));
        return [NaN, NaN];
    });
};

export const onMoving = (
    setCursor: Dispatch<SetStateAction<Coordinate>>
) => (event: MouseEvent): void => {
    setCursor(getClient(event));
};

export const addEventListeners = (
    {onDragStart, onDragEnd}: {
        onDragStart: (event: DragEvent) => void;
        onDragEnd: (event: DragEvent) => void;
    }
): void => {
    window.addEventListener(DragEvents[DragState.start], onDragStart);
    window.addEventListener(DragEvents[DragState.end], onDragEnd);
};

export const removeEventListeners = (
    {onDragStart, onDragEnd}: {
        onDragStart: (event: DragEvent) => void;
        onDragEnd: (event: DragEvent) => void;
    }
): void => {
    window.removeEventListener(DragEvents[DragState.start], onDragStart);
    window.removeEventListener(DragEvents[DragState.end], onDragEnd);

};

export const stopPropagation = {
    [JSXDragEvents[DragState.start]]: (event: Event): void => event.stopPropagation(),
    [JSXDragEvents[DragState.moving]]: (event: Event): void => event.stopPropagation(),
    [JSXDragEvents[DragState.end]]: (event: Event): void => event.stopPropagation(),
    onClick: (event: SyntheticEvent): void => event.stopPropagation()
};

export function parseToggle(toggle: string): boolean {
    return toggle === '1';
}

export function stringifyToggle(toggle: boolean): string {
    return toggle ? '1' : '0';
}

export function utoa(code: string): string {
    return window.btoa(unescape(encodeURIComponent(code)));
}

export function atou(code: string): string {
    return decodeURIComponent(escape(window.atob(code)));
}

export function parseParams(params: OriginalParams): ParsedParams {
    const {
        scaleLevel,
        originX,
        originY,
        equations,
        toggles
    } = params;

    const [
        displayEquationDialog,
        expandEquationPanel,
        expandStateBar,
        displayInfoDialog,
        showCrossCursor,
        isSmooth,
        isBold
    ] = toggles.split('');

    return {
        scale: parseScale(parseInt(scaleLevel)),
        origin: [parseFloat(originX), parseFloat(originY)],
        showCrossCursor: parseToggle(showCrossCursor),
        isSmooth: parseToggle(isSmooth),
        isBold: parseToggle(isBold),
        equations: Equations.parse(equations),
        displayEquationDialog: parseToggle(displayEquationDialog),
        expandEquationPanel: parseToggle(expandEquationPanel),
        expandStateBar: parseToggle(expandStateBar),
        displayInfoDialog: parseToggle(displayInfoDialog),
    };
}

export function stringifyParams(params: ParsedParams): OriginalParams {
    const {
        scale,
        origin,
        showCrossCursor,
        isSmooth,
        isBold,
        displayEquationDialog,
        expandEquationPanel,
        expandStateBar,
        displayInfoDialog,
        equations
    } = params;

    return {
        scaleLevel: getScaleLevel(scale).toString(),
        originX: origin[0].toString(),
        originY: origin[1].toString(),
        equations: equations.stringify(),
        toggles: [
            displayEquationDialog,
            expandEquationPanel,
            expandStateBar,
            displayInfoDialog,
            showCrossCursor,
            isSmooth,
            isBold
        ].map(stringifyToggle).join('')
    };
}

export function combineURL(params: OriginalParams, partialParams: Partial<ParsedParams>): string {
    const {
        scaleLevel,
        originX,
        originY,
        equations,
        toggles
    } = stringifyParams({...parseParams(params), ...partialParams});

    return `/${scaleLevel}/${originX}/${originY}/${toggles}/${equations}`;
}
