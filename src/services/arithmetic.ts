import {pool} from 'workerpool';
import {Coordinate, Size} from './utilities';

const workerPool = pool();

interface Fx {
    (x: number): number
}

export interface Input {
    rangeX: Size;
    rangeY: Size;
    offset: Coordinate;
    fx: string;
    zoom: number;
    isSmooth: boolean;
}

export interface DxInput {
    y: number;
    x: number;
    fx: (x: number) => number;
    dx: number;
    zoom: number;
}

interface DxOutput {
    dx: number;
    dy: number;
    dz: number;
    iterationCount: number
}


export function parameterEquation(input: Input): Coordinate[] {

    const MIN_DELTA: number = 1e-7;
    const MAX_VALUE: number = 1e100;

    const MIN_DELTA_Z: number = .9;
    const MAX_DELTA_Z: number = 1.1;

    const MAX_ITERATION: number = 4294967296;
    const MAX_DX_ITERATION_COUNT: number = 10;

    function dxComputer(fx: Fx, dx: number, y: number, x: number, zoom: number): number {
        let dz, dy;
        let dxIterationCount = 0;
        let lower = 0;
        let upper = NaN;
        do {
            dy = fx(x + dx) - y;
            dz = (dx ** 2 + dy ** 2) ** 0.5;

            if (dz * zoom < MIN_DELTA_Z) {
                lower = dx;
                if (isNaN(upper)) {
                    dx *= 2;
                } else {
                    dx += (upper - lower) / 2;
                }
            } else if (dz * zoom > MAX_DELTA_Z) {
                upper = dx;
                dx -= (upper - lower) / 2;
            } else {
                break;
            }

        } while (++dxIterationCount < MAX_DX_ITERATION_COUNT);

        return dx;
    }

    const {
        rangeX, rangeY, offset, zoom, isSmooth, fx
    } = input;

    const fn = <Fx>new Function('x', `return ${fx};`);

    const defaultDx = 1 / zoom;
    let px, py, matrix = [];

    let x = rangeX[0],
        y = fn(x),
        dx = defaultDx;

    let iterationTimes = 0,
        overflow = false,
        tx = NaN;

    do {
        if (isNaN(y) || Math.abs(y) >= MAX_VALUE || y < rangeY[0] || y > rangeY[1]) {
            if (!overflow && dx < 0) {
                // draw to negative direction
                x = tx;
                y = fn(x);
                dx = dxComputer(fn, dx, y, x, zoom);
                overflow = false;
            } else {
                dx = defaultDx;
                overflow = true;
            }
            x += dx;
            y = fn(x);

        } else {
            if (overflow) {
                // enter range first, reverse dx
                dx = -defaultDx;
                // temporary recording x to tx
                tx = x;
            }
            overflow = false;

            px = offset[0] + x * zoom;
            py = offset[1] - y * zoom;

            const point: Coordinate = isSmooth ? [px, py] : [Math.round(px), Math.round(py)];
            // point.time = Date.now();

            dx = dxComputer(fn, dx, y, x, zoom);

            // point.time = Date.now() - point.time;
            matrix.push(point);

            x += dx;
            y = fn(x);
        }
    } while (x < rangeX[1] && ++iterationTimes < MAX_ITERATION);

    return matrix;
}

export async function arithmetic(input: Input, callback: (result: Coordinate[]) => void) {
    try {
        const matrix = await workerPool.exec(parameterEquation, [input]);
        // console.log(matrix);
        callback(matrix);
    } catch (err) {
        console.error(err);
    }
}
