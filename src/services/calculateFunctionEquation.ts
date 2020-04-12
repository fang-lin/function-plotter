import {parse} from 'mathjs';
import {FunctionEquation} from './FunctionEquation';
import {EquationWorkerInput, EquationWorkerOutput} from './workerPool';
import {Coordinate, Size} from '../components/App/App.function';
import {equationToCanvas} from '../helpers/coordinateTransform';

interface FunctionEquationWorkerInput extends EquationWorkerInput {
    equation: FunctionEquation;
}

function isPointInRange(point: Coordinate, range: [Size, Size]): boolean {
    return point[1] > range[1][0] && point[1] < range[1][1];
}

function getRange(input: FunctionEquationWorkerInput): [Size, Size] {
    const {scale, size, origin} = input;
    const x = -size[0] / 2 - origin[0];
    const y = -size[1] / 2 + origin[1];
    return [[x / scale, (x + size[0]) / scale], [y / scale, (y + size[1]) / scale]];
}

function distributePoint(result: Coordinate[], next: Coordinate[], lastPoint: Coordinate, currentPoint: Coordinate, dx: number, unit: number, range: [Size, Size], input: FunctionEquationWorkerInput): void {
    const {origin, size, scale, isSmooth} = input;
    const z = (dx ** 2 + (currentPoint[1] - lastPoint[1]) ** 2) ** .5;
    if (isPointInRange(lastPoint, range) || !isPointInRange(lastPoint, range) && isPointInRange(currentPoint, range)) {
        if (z < unit) {
            const [x, y] = equationToCanvas(lastPoint, origin, size, scale);
            result.push(isSmooth ? [x, y] : [Math.round(x) + .5, Math.round(y) + .5]);
            result.push(lastPoint);
        } else {
            next.push(lastPoint);
        }
    }
}

export function calculateFunctionEquation(input: FunctionEquationWorkerInput): EquationWorkerOutput {
    const {scale, equation} = input;
    const {fn} = equation;
    const func = parse(fn).compile();
    const unit = 1 / scale / 2;
    const range = getRange(input);

    let level = 0;
    let dx = unit;
    let x: number = range[0][0];

    const resultCoordinates: Coordinate[] = [];
    let nextCoordinates: Coordinate[] = [];

    while (level < 16) {
        dx /= 2;
        if (level === 0) {
            let last: Coordinate | null = null;
            while (x < range[0][1]) {
                x += dx;
                const current: Coordinate = [x, func.evaluate({x})];
                if (last) {
                    distributePoint(resultCoordinates, nextCoordinates, last, current, dx, unit, range, input);
                }
                last = current;
            }
        } else {
            const nextNextCoordinates: Coordinate[] = [];
            nextCoordinates.forEach(last => {
                const current: Coordinate = [last[0] + dx, func.evaluate({x: last[0] + dx})];
                distributePoint(resultCoordinates, nextNextCoordinates, last, current, dx, unit, range, input);
                const z = (dx ** 2 + (current[1] - func.evaluate({x: current[0] + dx})) ** 2) ** .5;
                if (z > unit) {
                    nextNextCoordinates.push(current);
                }
            });
            if (nextCoordinates.length === 0) {
                break;
            }
            nextCoordinates = nextNextCoordinates;
        }
        level++;
    }

    const coordinates = resultCoordinates.sort((a, b) => a[0] - b[0]);
    const map = new Map<number, number>();
    coordinates.forEach(([x,], index) => {
        if (map.get(Math.floor(x)) === undefined) {
            map.set(Math.floor(x), index);
        }
    });
    return {map, coordinates};
}
