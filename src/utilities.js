export const ZOOM_UNIT = 2 ** .5;
export const MIN_DELTA = 1e-7;
export const DEFAULT_DELTA = 1 / ZOOM_UNIT;
export const MAX_DELTA = 1;
export const MAX_VALUE = 1e100;

export const MIN_CHORD = .9;
export const MAX_CHORD = 1.1;

export const MAX_ITERATION = 4294967296;
export const MAX_DELTA_RECOUNT = 1;

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

export const monadicEquation = () => {

};

function dxComputer(y, x, func, dx, zoom) {
  let count = 0;
  let lower = 0;
  let upper = NaN;
  // let k = dx % 2;
  let k = dx > 0 ? 1 : -1;
  do {
    const dy = func(x + dx) - y;
    const chord = (dx ** 2 + dy ** 2) ** 0.5;

    if (chord * zoom < MIN_CHORD) {
      lower = dx;
      if (isNaN(upper)) {
        dx *= 2;
      } else {
        dx += (upper - lower) / 2;
      }
    } else if (chord * zoom > MAX_CHORD) {
      upper = dx;
      dx -= (upper - lower) / 2;
    } else {
      break;
    }

    if (Math.abs(dx) < MIN_DELTA) {
      dx = k * MIN_DELTA;
      break;
    }

  } while (count++ < MAX_DELTA_RECOUNT);

  if (isNaN(dx)) {
    dx = k * MIN_DELTA;
  }

  return dx;
}

function dxComputer2(y, x, func, zoom) {
  let count = 0;
  let lower = 0;
  let upper = 1;
  let k = dx % 2;

  let dx = DEFAULT_DELTA;

  do {
    const dy = func(x + dx) - y;
    const chord = (dx ** 2 + dy ** 2) ** 0.5;

    if (chord * zoom < MIN_CHORD) {
      lower = dx;
      dx = (upper - lower) / 2;
    } else if (chord * zoom > MAX_CHORD) {
      upper = dx;
      dx = (upper - lower) / 2;
    } else {
      return dx;
    }


    // if (Math.abs(dx) < MIN_DELTA) {
    //   dx = k * MIN_DELTA;
    //   break;
    // }

  } while (count++ < MAX_DELTA_RECOUNT);

  // if (isNaN(dx)) {
  //   dx = k * MIN_DELTA;
  // }

  return dx;
}


export const parameterEquation = ({
                                    rangeX, rangeY, literal, offsetX,
                                    offsetY, zoom, isSmooth, VAR_X
                                  }) => {

  console.log('parameterEquation');

  const MAX_DELTA = (MIN_CHORD + MAX_CHORD) / 2 / zoom;
  let px, py, matrix = [];

  const func = new Function(VAR_X, `return ${literal};`);

  let x = rangeX[0],
    y = func(x),
    dx = MAX_DELTA;

  let iterationTimes = 0,
    overflow = false,
    tx = NaN;

  do {
    if (isNaN(y) || Math.abs(y) >= MAX_VALUE || y < rangeY[0] || y > rangeY[1]) {

      if (!overflow && dx < 0) {
        // draw to negative direction
        x = tx;
        y = func(x);
        dx = dxComputer(y, x, func, dx, zoom);
        overflow = false;
      } else {
        dx = MAX_DELTA;
        overflow = true;
      }

      x += dx;
      y = func(x);

    } else {

      if (overflow) {
        // enter range first, reverse dx
        dx = -MAX_DELTA;
        // temporary recording x to tx
        tx = x;
      }
      overflow = false;

      px = offsetX + x * zoom;
      py = offsetY - y * zoom;

      const point = isSmooth ? [px, py] : [Math.round(px), Math.round(py)];
      point.time = Date.now();

      dx = dxComputer(y, x, func, dx, zoom);

      point.time = Date.now() - point.time;
      matrix.push(point);

      x += dx;
      y = func(x);
    }

  } while (x < rangeX[1] && iterationTimes++ < MAX_ITERATION);

  // console.log(matrix);
  return matrix;
};

