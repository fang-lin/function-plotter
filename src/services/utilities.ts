import {Coordinate} from '../components/App';

export type DragEventNames = 'START' | 'MOVING' | 'END';

export type DragEvent = TouchEvent | MouseEvent;

export const ZOOM_UNIT: number = 2 ** .5;

export const deviceRatio: number = (() => window.devicePixelRatio || 1)();

export function parseZoom(zoomLevel: number): number {
    return Math.pow(ZOOM_UNIT, zoomLevel) * deviceRatio;
}

export function getClientCoordinate(event: DragEvent): Coordinate {
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


export const DRAG_EVENTS: Record<DragEventNames, keyof WindowEventMap> = isMobile ? {
    START: 'touchstart',
    MOVING: 'touchmove',
    END: 'touchend',
} : {
    START: 'mousedown',
    MOVING: 'mousemove',
    END: 'mouseup',
};

export function getDeviceRatio() {
    return window.devicePixelRatio || 1;
}
