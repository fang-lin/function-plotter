import {Dispatch, DOMAttributes, SetStateAction} from 'react';
import range from 'lodash/range';

export type Coordinate = [number, number];
export type Size = [number, number];

export interface Equation {
    fx: string;
    color: string;
    display: boolean;
}

export const deviceRatio: number = (() => window.devicePixelRatio || 1)();
export const ZoomUnit: number = 2 ** .5;
export const ZoomRange: number[] = range(deviceRatio * 2, deviceRatio * 2 + 16);

export function parseZoom(zoomIndex: number): number {
    return Math.pow(ZoomUnit, ZoomRange[zoomIndex]);
}

export function getClient(event: DragEvent): Coordinate {
    const {clientX, clientY} = event instanceof TouchEvent ? event.changedTouches[0] : event;
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

export type DragEvent = TouchEvent | MouseEvent;

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


export const getStageSize = (content: Element): Size => {
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
    setClient: Dispatch<SetStateAction<Coordinate>>,
    setDragState: Dispatch<SetStateAction<DragState>>,
    onDragging: (event: DragEvent) => void
) => (event: DragEvent): void => {
    setDragState(DragState.start);
    setClient(getClient(event));
    window.addEventListener(DragEvents[DragState.moving], onDragging);
};

export const onDraggingHOF = (
    setTransform: Dispatch<SetStateAction<Coordinate>>,
    setDragState: Dispatch<SetStateAction<DragState>>,
    setClient: Dispatch<SetStateAction<Coordinate>>
) => (event: DragEvent): void => {
    const _client = getClient(event);
    setClient((client: Coordinate) => {
        setTransform([_client[0] - client[0], _client[1] - client[1]]);
        return client;
    });
    setDragState(DragState.moving);
};

export const onDragEndHOF = (
    setTransform: Dispatch<SetStateAction<Coordinate>>,
    setOrigin: Dispatch<SetStateAction<Coordinate>>,
    setDragState: Dispatch<SetStateAction<DragState>>,
    setClient: Dispatch<SetStateAction<Coordinate>>,
    onDragging: (event: DragEvent) => void
) => (event: DragEvent): void => {
    window.removeEventListener(DragEvents[DragState.moving], onDragging);
    const _client = getClient(event);
    setTransform([0, 0]);
    setClient((client: Coordinate) => {
        if (!isNaN(client[0]) && !isNaN(client[1])) {
            setOrigin((origin: Coordinate) => [
                origin[0] + (_client[0] - client[0]),
                origin[1] + (_client[1] - client[1])
            ]);
        }
        return [NaN, NaN];
    });
    setDragState(DragState.end);
};

export const onMovingHOF = (
    setDragState: Dispatch<SetStateAction<DragState>>,
    setCursor: Dispatch<SetStateAction<Coordinate>>
) => (event: MouseEvent) => {
    setDragState((dragState: DragState) => {
        if (dragState === DragState.end) {
            setCursor(getClient(event));
        }
        return dragState;
    });
};

export const addEventListeners = (
    onDragStart: (event: DragEvent) => void,
    onDragEnd: (event: DragEvent) => void,
    onMoving: (event: MouseEvent) => void,
    onResizing: () => void
): void => {
    window.addEventListener(DragEvents[DragState.start], onDragStart);
    window.addEventListener(DragEvents[DragState.end], onDragEnd);
    window.addEventListener('mousemove', onMoving);
    window.addEventListener('resize', onResizing);
};

export const removeEventListeners = (
    onDragStart: (event: DragEvent) => void,
    onDragEnd: (event: DragEvent) => void,
    onMoving: (event: MouseEvent) => void,
    onResizing: () => void
): void => {
    window.removeEventListener(DragEvents[DragState.start], onDragStart);
    window.removeEventListener(DragEvents[DragState.end], onDragEnd);
    window.removeEventListener('mousemove', onMoving);
    window.removeEventListener('resize', onResizing);
};

export const stopPropagation = {
    [JSXDragEvents[DragState.start]]: (event: Event) => event.stopPropagation(),
    [JSXDragEvents[DragState.moving]]: (event: Event) => event.stopPropagation(),
    [JSXDragEvents[DragState.end]]: (event: Event) => event.stopPropagation(),
    onClick: (event: Event) => event.stopPropagation()
};
