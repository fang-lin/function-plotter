export const ZOOM_UNIT = 2 ** .5;

export const deviceRatio = window.devicePixelRatio || 1;

export const parseZoom = (zoomLevel) => Math.pow(ZOOM_UNIT, zoomLevel) * deviceRatio;

export const getClientXY = (event) => {
  const { clientX, clientY } = event.changedTouches ? event.changedTouches[0] : event;
  return { clientX, clientY };
};

export const isMobile = (() => {
  try {
    document.createEvent('TouchEvent');
    return true;
  } catch (e) {
    return false;
  }
})();

export const DRAG_EVENTS = {
  START: isMobile ? 'touchstart' : 'mousedown',
  MOVE: isMobile ? 'touchmove' : 'mousemove',
  END: isMobile ? 'touchend' : 'mouseup'
};

const stopPropagation = event => event.stopPropagation();

export const STOP_DRAG = isMobile ? {
  onTouchStart: stopPropagation,
  onTouchEnd: stopPropagation
} : {
  onMouseDown: stopPropagation,
  onMouseUp: stopPropagation
};

