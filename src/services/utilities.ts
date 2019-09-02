import {Coordinate} from "../components/App";

export const ZOOM_UNIT: number = 2 ** .5;

export const deviceRatio: number = window.devicePixelRatio || 1;

export function parseZoom(zoomLevel: number): number {
    return Math.pow(ZOOM_UNIT, zoomLevel) * deviceRatio;
}

export function getClientXY(event: MouseEvent | TouchEvent): Coordinate {
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

type DraggingTypes = 'start' | 'moving' | 'end';
type DraggingEvent = Record<DraggingTypes, keyof WindowEventMap> ;

export const draggingEvents: DraggingEvent = isMobile ? {
    start: 'touchstart',
    moving: 'touchmove',
    end: 'touchend',
} : {
    start: 'mousedown',
    moving: 'mousemove',
    end: 'mouseup',
};

// export function stopPropagation =  => event.stopPropagation();
//
// export const STOP_DRAG = isMobile ? {
//     onTouchStart: stopPropagation,
//     onTouchEnd: stopPropagation
// } : {
//     onMouseDown: stopPropagation,
//     onMouseUp: stopPropagation
// };