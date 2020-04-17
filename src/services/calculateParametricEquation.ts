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
        } else {
            next.push(lastPoint);
        }
    }
}

function createMapping(sortedCoordinates: Coordinate[], length: number): number[] {
    return [];
}

export function calculateParametricEquation(input: FunctionEquationWorkerInput): EquationWorkerOutput {
    return {mapping: [], coordinates: []};
}
