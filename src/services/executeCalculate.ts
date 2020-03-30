import {pool} from 'workerpool';
import {Coordinate, Size} from '../components/App.function';

const workerPool = pool();

export interface Fn {
    (x: number): number;
}

export interface Input {
    range: [Size, Size];
    origin: Coordinate;
    func: string;
    scale: number;
    isSmooth: boolean;
}

export function calculate(input: Input): Coordinate[] {
    const {range, origin, scale, func, isSmooth} = input;

    function transformer(point: Coordinate): Coordinate {
        const x = origin[0] + point[0] * scale;
        const y = origin[1] - point[1] * scale;
        return isSmooth ? [Math.round(x), Math.round(y)] : [x, y];
    }

    function calculateFinalPoints(): Coordinate[] {
        const fn = (new Function('x', `return ${func};`)) as Fn;

        const unit = 1 / scale / 2;
        let level = 0;
        let dx = unit;
        let x: number = range[0][0];

        const finalPoints: Coordinate[] = [];
        let nextLevelPoints: Coordinate[] = [];

        while (level < 16) {
            dx /= 2;
            if (level === 0) {
                let last: Coordinate | null = null;
                while (x < range[0][1]) {
                    x += dx;
                    const current: Coordinate = [x, fn(x)];
                    if (last) {
                        const z = (dx ** 2 + (current[1] - last[1]) ** 2) ** .5;
                        if (z < unit) {
                            finalPoints.push(transformer(last));
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
                        finalPoints.push(transformer(last));
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

    return calculateFinalPoints();
}

export async function executeCalculate(input: Input): Promise<Coordinate[]> {
    // return new Promise(resolve => resolve(parameterEquation(input)));
    // await workerPool.terminate();
    return await workerPool.exec(calculate, [input]);
}

export async function terminateCalculate(): Promise<unknown> {
    return (await workerPool.terminate()) as unknown;
}


