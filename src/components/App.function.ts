import {Dispatch, DOMAttributes, SetStateAction, SyntheticEvent} from 'react';
import {History} from 'history';
import range from 'lodash/range';
import isUndefined from 'lodash/isUndefined';
import {Equations} from "../services/Equations";
import {FlattenSimpleInterpolation} from "styled-components";

export type Coordinate = [number, number];
export type Size = [number, number];

export const deviceRatio: number = (() => window.devicePixelRatio || 1)();
export const ZoomUnit: number = 2 ** .5;
export const ZoomRange: number[] = range(deviceRatio * 2, deviceRatio * 2 + 16);

export function parseZoom(zoomIndex: number): number {
    return Math.pow(ZoomUnit, ZoomRange[zoomIndex]);
}

export function clone<T = any>(a: any): T {
    return JSON.parse(JSON.stringify(a));
}

function isTouchEvent(event: DragEvent): event is TouchEvent {
    return window.TouchEvent && event instanceof TouchEvent;
}

export function getClient(event: DragEvent): Coordinate {
    const {clientX, clientY} = isTouchEvent(event) ? event.changedTouches[0] : event;
    return [clientX, clientY];
}

export const isMobile: boolean = (() => {
    try {
        document.createEvent('TouchEvent');
        return true;
    } catch (e) {
        return false;
    }
})();

export function getDeviceRatio() {
    return window.devicePixelRatio || 1;
}

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

export const JSXDragEvents: Record<DragState, keyof DOMAttributes<any>> = isMobile ? {
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

export const getCenteredOrigin = (size: Size): Coordinate => {
    return [size[0] / 2, size[1] / 2]
};

export const onDragStartHOF = (
    {setClient, setDragState, onDragging}: {
        setClient: Dispatch<SetStateAction<Coordinate>>,
        setDragState: Dispatch<SetStateAction<DragState>>,
        onDragging: (event: DragEvent) => void
    }
) => (event: DragEvent): void => {
    setDragState(DragState.start);
    setClient(getClient(event));
    window.addEventListener(DragEvents[DragState.moving], onDragging);
};

export const onDraggingHOF = (
    {setTransform, setDragState, setClient}: {
        setTransform: Dispatch<SetStateAction<Coordinate>>,
        setDragState: Dispatch<SetStateAction<DragState>>,
        setClient: Dispatch<SetStateAction<Coordinate>>
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
        setTransform: Dispatch<SetStateAction<Coordinate>>,
        // setOrigin: Dispatch<SetStateAction<Coordinate>>,
        origin: Coordinate,
        toPath: (param: Partial<ParsedParams>) => string,
        history: History,
        setDragState: Dispatch<SetStateAction<DragState>>,
        setClient: Dispatch<SetStateAction<Coordinate>>,
        onDragging: (event: DragEvent) => void
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
) => (event: MouseEvent) => {
    setCursor(getClient(event));
};

export const addEventListeners = (
    {onDragStart, onDragEnd}: {
        onDragStart: (event: DragEvent) => void,
        onDragEnd: (event: DragEvent) => void,
    }
): void => {
    window.addEventListener(DragEvents[DragState.start], onDragStart);
    window.addEventListener(DragEvents[DragState.end], onDragEnd);
};

export const removeEventListeners = (
    {onDragStart, onDragEnd}: {
        onDragStart: (event: DragEvent) => void,
        onDragEnd: (event: DragEvent) => void,
    }
): void => {
    window.removeEventListener(DragEvents[DragState.start], onDragStart);
    window.removeEventListener(DragEvents[DragState.end], onDragEnd);

};

export const stopPropagation = {
    [JSXDragEvents[DragState.start]]: (event: Event) => event.stopPropagation(),
    [JSXDragEvents[DragState.moving]]: (event: Event) => event.stopPropagation(),
    [JSXDragEvents[DragState.end]]: (event: Event) => event.stopPropagation(),
    onClick: (event: SyntheticEvent) => event.stopPropagation()
};

export interface ParsedParams {
    zoomIndex: number;
    origin: Coordinate;
    showCrossCursor: boolean;
    isSmooth: boolean;
    isBold: boolean;
    equations: Equations;
    displayEquationDialog: boolean;
    expandEquationPanel: boolean;
    displayInfoDialog: boolean;
}

export type OriginalParams = {
    [key in keyof ParsedParams]: string;
}

export function parseParams(params: OriginalParams): ParsedParams {
    const {
        zoomIndex,
        origin,
        showCrossCursor,
        isSmooth,
        isBold,
        displayEquationDialog,
        expandEquationPanel,
        displayInfoDialog,
        equations
    } = params;

    return {
        zoomIndex: normalizeZoomIndex(parseInt(zoomIndex)),
        origin: origin.split('+').map<number>(parseFloat) as Coordinate,
        showCrossCursor: parseToggle(showCrossCursor),
        isSmooth: parseToggle(isSmooth),
        isBold: parseToggle(isBold),
        equations: Equations.parse(equations),
        displayEquationDialog: parseToggle(displayEquationDialog),
        expandEquationPanel: parseToggle(expandEquationPanel),
        displayInfoDialog: parseToggle(displayInfoDialog),
    };
}

export function stringifyParams(params: Partial<ParsedParams>): Partial<OriginalParams> {
    const returned: Partial<OriginalParams> = {};
    const {
        zoomIndex,
        origin,
        showCrossCursor,
        isSmooth,
        isBold,
        displayEquationDialog,
        expandEquationPanel,
        displayInfoDialog,
        equations
    } = params;
    if (!isUndefined(zoomIndex)) {
        returned.zoomIndex = zoomIndex.toString();
    }
    if (!isUndefined(origin)) {
        returned.origin = origin.join('+');
    }
    if (!isUndefined(showCrossCursor)) {
        returned.showCrossCursor = stringifyToggle(showCrossCursor);
    }
    if (!isUndefined(isSmooth)) {
        returned.isSmooth = stringifyToggle(isSmooth);
    }
    if (!isUndefined(isBold)) {
        returned.isBold = stringifyToggle(isBold);
    }
    if (!isUndefined(displayEquationDialog)) {
        returned.displayEquationDialog = stringifyToggle(displayEquationDialog);
    }
    if (!isUndefined(expandEquationPanel)) {
        returned.expandEquationPanel = stringifyToggle(expandEquationPanel);
    }
    if (!isUndefined(displayInfoDialog)) {
        returned.displayInfoDialog = stringifyToggle(displayInfoDialog);
    }
    if (!isUndefined(equations)) {
        returned.equations = equations.stringify();
    }
    return returned;
}

export function parseToggle(toggle: string): boolean {
    return toggle === '+';
}

export function stringifyToggle(toggle: boolean): string {
    return toggle ? '+' : '-';
}

export function combineURL(params: ParsedParams) {
    const {
        zoomIndex,
        origin,
        showCrossCursor,
        isSmooth,
        isBold,
        equations,
        displayEquationDialog,
        expandEquationPanel,
        displayInfoDialog
    } = params;
    return `/${zoomIndex}/${origin}/${showCrossCursor}/${isSmooth}/${isBold}/${displayEquationDialog}/${expandEquationPanel}/${displayInfoDialog}/${equations}`;
}

export function normalizeZoomIndex(zoomIndex: number, offset?: -1 | 1): number {
    if (isUndefined(offset)) {
        return ZoomRange[zoomIndex] ? zoomIndex : 7;
    }
    return ZoomRange[zoomIndex + offset] ? zoomIndex + offset : zoomIndex;
}

export function utoa(code: string): string {
    return window.btoa(unescape(encodeURIComponent(code)));
}

export function atou(code: string): string {
    return decodeURIComponent(escape(window.atob(code)));
}
