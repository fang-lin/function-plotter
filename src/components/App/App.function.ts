import {DOMAttributes, SyntheticEvent} from 'react';

export type Coordinate = [number, number];
export type Size = [number, number];

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

export const stopPropagation = {
    [JSXDragEvents[DragState.start]]: (event: Event): void => event.stopPropagation(),
    [JSXDragEvents[DragState.moving]]: (event: Event): void => event.stopPropagation(),
    [JSXDragEvents[DragState.end]]: (event: Event): void => event.stopPropagation(),
    onClick: (event: SyntheticEvent): void => event.stopPropagation()
};

