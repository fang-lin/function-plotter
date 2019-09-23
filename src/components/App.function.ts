import {Dispatch, SetStateAction} from 'react';

export type Coordinate = [number, number];
export type Size = [number, number];

export const ZOOM_UNIT: number = 2 ** .5;

export const deviceRatio: number = (() => window.devicePixelRatio || 1)();

export function parseZoom(zoomLevel: number): number {
    return Math.pow(ZOOM_UNIT, zoomLevel) * deviceRatio;
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

export function getCoordinate(cursor: number, origin: number, zoom: number): string {
    return isNaN(cursor) ? '--' : ((cursor - origin) / zoom * deviceRatio).toFixed(2);
}

export enum DRAG_STATE {
    START,
    MOVING,
    END
}

export type DragEvent = TouchEvent | MouseEvent;

export const DRAG_EVENTS: Record<DRAG_STATE, keyof WindowEventMap> = isMobile ? {
    [DRAG_STATE.START]: 'touchstart',
    [DRAG_STATE.MOVING]: 'touchmove',
    [DRAG_STATE.END]: 'touchend',
} : {
    [DRAG_STATE.START]: 'mousedown',
    [DRAG_STATE.MOVING]: 'mousemove',
    [DRAG_STATE.END]: 'mouseup',
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
    setDragState: Dispatch<SetStateAction<DRAG_STATE>>,
    onDragging: (event: DragEvent) => void
) => (event: DragEvent): void => {
    setDragState(DRAG_STATE.START);
    setClient(getClient(event));
    window.addEventListener(DRAG_EVENTS[DRAG_STATE.MOVING], onDragging);
};

export const onDraggingHOF = (
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

export const onDragEndHOF = (
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

export const onMovingHOF = (
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

export const dispatchEventListeners = (
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
