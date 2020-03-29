import {pool} from 'workerpool';
import {Coordinate, Size} from "../components/App.function";

const workerPool = pool();

export interface Fn {
    (x: number): number
}

export interface Input {
    range: [Size, Size];
    origin: Coordinate;
    func: string;
    scale: number;
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

export function parameterEquation2(input: Input): Coordinate[] {

    const MIN_DELTA: number = 1e-7;
    const MAX_VALUE: number = 1e100;

    const MIN_DELTA_Z: number = .9;
    const MAX_DELTA_Z: number = 1.1;

    const MAX_ITERATION: number = 4294967296;
    const MAX_DX_ITERATION_COUNT: number = 32;

    function dxComputer(fx: Fn, dx: number, y: number, x: number, zoom: number): number {
        let dz, dy;
        let dxIterationCount = 0;
        let lower = 0;
        let upper = NaN;
        const k = dx > 0 ? 1 : -1;
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

            if (Math.abs(dx) < MIN_DELTA) {
                dx = k * MIN_DELTA;
                break;
            }

        } while (dxIterationCount++ < MAX_DX_ITERATION_COUNT);

        if (isNaN(dx)) {
            dx = k * MIN_DELTA;
        }

        return dx;
    }

    const {
        range, origin, scale, isSmooth, func
    } = input;

    const fn = <Fn>new Function('x', `return ${func};`);

    const defaultDx = 1 / scale;
    let px, py, matrix = [];

    let x = range[0][0],
        y = fn(x),
        dx = defaultDx;

    let iterationTimes = 0,
        overflow = false,
        tx = NaN;

    do {
        if (isNaN(y) || Math.abs(y) >= MAX_VALUE || y < range[1][0] || y > range[1][1]) {
            if (!overflow && dx < 0) {
                // draw to negative direction
                x = tx;
                y = fn(x);
                dx = defaultDx;
                dx = dxComputer(fn, dx, y, x, scale);
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

            px = origin[0] + x * scale;
            py = origin[1] - y * scale;

            const point: Coordinate = isSmooth ? [px, py] : [Math.round(px), Math.round(py)];
            // point.time = Date.now();

            dx = dxComputer(fn, dx, y, x, scale);

            // point.time = Date.now() - point.time;
            matrix.push(point);

            x += dx;
            y = fn(x);
        }
    } while (x < range[0][1] && ++iterationTimes < MAX_ITERATION);

    return matrix;
}

export function parameterEquation(input: Input): Coordinate[] {

    const {
        range, scale, func
    } = input;

    const fn = <Fn>new Function('x', `return ${func};`);

    const unit = 1 / scale / 2;
    let level = 0;
    let dx = unit;
    let x: number = range[0][0];

    let finalPoints: Coordinate[] = [];
    let nextLevelPoints: Coordinate[] = [];

    while (level < 19) {
        dx /= 2;
        if (level === 0) {
            let last: Coordinate | null = null;
            while (x < range[0][1]) {
                x += dx;
                const current: Coordinate = [x, fn(x)];
                if (last) {
                    const z = (dx ** 2 + (current[1] - last[1]) ** 2) ** .5;
                    if (z < unit) {
                        finalPoints.push(last);
                    } else {
                        nextLevelPoints.push(last);
                    }
                }
                last = current;
            }
        } else {
            const newPoints: Coordinate[] = [];
            nextLevelPoints.forEach(last => {
                const current: Coordinate = [last[0] + dx, fn(last[0] + dx)];
                const lastToCurrent = (dx ** 2 + (current[1] - last[1]) ** 2) ** .5;
                if (lastToCurrent < unit) {
                    finalPoints.push(last);
                } else {
                    newPoints.push(last);
                }
                const currentToNext = (dx ** 2 + (current[1] - fn(current[0] + dx)) ** 2) ** .5;
                if (currentToNext > unit) {
                    newPoints.push(current);
                }
            });
            if (nextLevelPoints.length === 0) {
                break;
            }
            nextLevelPoints = newPoints;
        }
        level++;
    }
    return finalPoints;
}

export const transformer = (origin: Coordinate, zoom: number) => (point: Coordinate): Coordinate => {
    return [
        origin[0] + point[0] * zoom,
        origin[1] - point[1] * zoom
    ];
};

export async function arithmetic(input: Input): Promise<Coordinate[]> {
    try {
        // return new Promise(resolve => {
        //     return resolve(parameterEquation(input));
        // });
        return await workerPool.exec(parameterEquation, [input]);
    } catch (err) {
        throw err;
    }
}
