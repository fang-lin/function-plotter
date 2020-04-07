import {parse} from 'mathjs';
import {Coordinate, Size} from '../components/App.function';
import {FunctionEquation} from './FunctionEquation';
import {CalculateOptions} from './workerPool';

function transformer(point: Coordinate, opitions: CalculateOptions): Coordinate {
    const {origin, scale, isSmooth, size} = opitions;
    const x = size[0] / 2 + origin[0] + point[0] * scale;
    const y = size[1] / 2 + origin[1] - point[1] * scale;
    return isSmooth ? [x, y] : [Math.round(x) + .5, Math.round(y) + .5];
}

function isPointInRange(point: Coordinate, range: [Size, Size]): boolean {
    return point[1] > range[1][0] && point[1] < range[1][1];
}

function getRange(options: CalculateOptions): [Size, Size] {
    const {scale, size, origin} = options;
    const x = -size[0] / 2 - origin[0];
    const y = -size[1] / 2 + origin[1];
    return [[x / scale, (x + size[0]) / scale], [y / scale, (y + size[1]) / scale]];
}

function distributePoint(result: Coordinate[], next: Coordinate[], lastPoint: Coordinate, currentPoint: Coordinate, dx: number, unit: number, range: [Size, Size], options: CalculateOptions): void {
    const z = (dx ** 2 + (currentPoint[1] - lastPoint[1]) ** 2) ** .5;
    if (isPointInRange(lastPoint, range) || !isPointInRange(lastPoint, range) && isPointInRange(currentPoint, range)) {
        if (z < unit) {
            result.push(transformer(lastPoint, options));
        } else {
            next.push(lastPoint);
        }
    }
}

export function calculateFunctionEquation(equation: FunctionEquation, options: CalculateOptions): Coordinate[] {
    const {scale} = options;
    const {fn} = equation;
    const func = parse(fn).compile();
    const unit = 1 / scale / 2;
    const range = getRange(options);

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
                const current: Coordinate = [x, func.evaluate({x})];
                if (last) {
                    distributePoint(resultPoints, nextPoints, last, current, dx, unit, range, options);
                }
                last = current;
            }
        } else {
            const nextNextPoints: Coordinate[] = [];
            nextPoints.forEach(last => {
                const current: Coordinate = [last[0] + dx, func.evaluate({x: last[0] + dx})];
                distributePoint(resultPoints, nextNextPoints, last, current, dx, unit, range, options);
                const z = (dx ** 2 + (current[1] - func.evaluate({x: current[0] + dx})) ** 2) ** .5;
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
