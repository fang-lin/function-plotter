export type Coordinate = [number, number];
export type Size = [number, number];

export enum DRAG_STATE {
    START,
    MOVING,
    END
}

export type DragEvent = TouchEvent | MouseEvent;

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

export const DRAG_EVENTS: Record<DRAG_STATE, keyof WindowEventMap> = isMobile ? {
    [DRAG_STATE.START]: 'touchstart',
    [DRAG_STATE.MOVING]: 'touchmove',
    [DRAG_STATE.END]: 'touchend',
} : {
    [DRAG_STATE.START]: 'mousedown',
    [DRAG_STATE.MOVING]: 'mousemove',
    [DRAG_STATE.END]: 'mouseup',
};

export function getDeviceRatio() {
    return window.devicePixelRatio || 1;
}

export function getCoordinate(cursor: number, origin: number, zoom: number): string {
    return isNaN(cursor) ? '--' : ((cursor - origin) / zoom * deviceRatio).toFixed(2);
}
