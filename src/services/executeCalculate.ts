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
    const fn = (new Function('x', `return ${func};`)) as Fn;
    const unit = 1 / scale / 2;

    function transformer(point: Coordinate): Coordinate {
        const x = origin[0] + point[0] * scale;
        const y = origin[1] - point[1] * scale;
        return isSmooth ? [x, y] : [Math.round(x), Math.round(y)];
    }


    function isPointInRange(point: Coordinate): boolean {
        return point[1] > range[1][0] && point[1] < range[1][1];
    }

    function distributePoint(result: Coordinate[], next: Coordinate[], lastPoint: Coordinate, currentPoint: Coordinate, dx: number): void {
        const z = (dx ** 2 + (currentPoint[1] - lastPoint[1]) ** 2) ** .5;
        if (isPointInRange(lastPoint) || !isPointInRange(lastPoint) && isPointInRange(currentPoint)) {
            if (z < unit) {
                result.push(transformer(lastPoint));
            } else {
                next.push(lastPoint);
            }
        }
    }

    function calculateFinalPoints(): Coordinate[] {
        let level = 0;
        let dx = unit;
        let x: number = range[0][0];

        const resultPoints: Coordinate[] = [];
        let nextPoints: Coordinate[] = [];

        while (level < 16) {
            dx /= 2;
            if (level === 0) {
                let last: Coordinate | null = null;
                while (x < range[0][1]) {
                    x += dx;
                    const current: Coordinate = [x, fn(x)];
                    if (last) {
                        distributePoint(resultPoints, nextPoints, last, current, dx);
                    }
                    last = current;
                }
            } else {
                const nextNextPoints: Coordinate[] = [];
                nextPoints.forEach(last => {
                    const current: Coordinate = [last[0] + dx, fn(last[0] + dx)];
                    distributePoint(resultPoints, nextNextPoints, last, current, dx);
                    const z = (dx ** 2 + (current[1] - fn(current[0] + dx)) ** 2) ** .5;
                    if (z > unit) {
                        nextNextPoints.push(current);
                    }
                });
                if (nextPoints.length === 0) {
                    break;
                }
                nextPoints = nextNextPoints;
            }
            level++;
        }
        return resultPoints;
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


