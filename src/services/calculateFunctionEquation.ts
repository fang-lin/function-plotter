import {EvalFunction, parse} from 'mathjs';
import {Coordinate, Size} from '../components/App.function';
import {CalculateOptions, FunctionEquation} from './FunctionEquation';

function transformer(point: Coordinate, opitions: CalculateOptions): Coordinate {
    const {origin, scale, isSmooth} = opitions;
    const x = origin[0] + point[0] * scale;
    const y = origin[1] - point[1] * scale;
    return isSmooth ? [x, y] : [Math.round(x), Math.round(y)];
}

function isPointInRange(point: Coordinate, range: [Size, Size]): boolean {
    return point[1] > range[1][0] && point[1] < range[1][1];
}

function distributePoint(result: Coordinate[], next: Coordinate[], lastPoint: Coordinate, currentPoint: Coordinate, dx: number, unit: number, opitions: CalculateOptions): void {
    const {range} = opitions;
    const z = (dx ** 2 + (currentPoint[1] - lastPoint[1]) ** 2) ** .5;
    if (isPointInRange(lastPoint, range) || !isPointInRange(lastPoint, range) && isPointInRange(currentPoint, range)) {
        if (z < unit) {
            result.push(transformer(lastPoint, opitions));
        } else {
            next.push(lastPoint);
        }
    }
}

export function calculateFunctionEquation(equation: FunctionEquation, options: CalculateOptions): Coordinate[] {
    const {range, scale} = options;
    const {fn} = equation;
    let s: EvalFunction;
    try {
        s = parse(fn).compile();
    } catch (e) {
        return [];
    }
    const func = (x: number): number => s.evaluate({x});
    const unit = 1 / scale / 2;

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
                const current: Coordinate = [x, func(x)];
                if (last) {
                    distributePoint(resultPoints, nextPoints, last, current, dx, unit, options);
                }
                last = current;
            }
        } else {
            const nextNextPoints: Coordinate[] = [];
            nextPoints.forEach(last => {
                const current: Coordinate = [last[0] + dx, func(last[0] + dx)];
                distributePoint(resultPoints, nextNextPoints, last, current, dx, unit, options);
                const z = (dx ** 2 + (current[1] - func(current[0] + dx)) ** 2) ** .5;
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
