import {parse} from 'mathjs';
import {EquationWorkerInput, EquationWorkerOutput} from './workerPool';
import {Coordinate} from '../pages/Plotter';
import {equationToCanvas} from '../helpers';
import {ParametricEquation} from './ParametricEquation';

type CoordinateWithParametric = [number, number, number];

interface ParametricEquationWorkerInput extends EquationWorkerInput {
    equation: ParametricEquation;
}

function distributePoint(result: CoordinateWithParametric[], next: CoordinateWithParametric[], lastPoint: CoordinateWithParametric, currentPoint: CoordinateWithParametric, unit: number, input: ParametricEquationWorkerInput): void {
    const {origin, size, scale, isSmooth} = input;
    const z = ((currentPoint[0] - lastPoint[0]) ** 2 + (currentPoint[1] - lastPoint[1]) ** 2) ** .5;
    if (z < unit) {
        const [x, y] = equationToCanvas([lastPoint[0], lastPoint[1]], origin, size, scale);
        result.push(isSmooth ? [x, y, lastPoint[2]] : [Math.round(x) + .5, Math.round(y) + .5, lastPoint[2]]);
    } else {
        next.push(lastPoint);
    }
}

export function calculateParametricEquation(input: ParametricEquationWorkerInput): EquationWorkerOutput {
    const {scale, equation} = input;
    const {fx, fy, domain} = equation;
    const fnx = parse(fx).compile();
    const fny = parse(fy).compile();
    const unit = 1 / scale / 2;

    let level = 0;
    let dt = (domain[1] - domain[0]) / 2;
    let t: number = domain[0];

    const resultCoordinates: CoordinateWithParametric[] = [];
    let nextCoordinates: CoordinateWithParametric[] = [];

    while (level < 1024) {
        dt /= 2;
        if (level === 0) {
            let last: CoordinateWithParametric | null = null;
            while (t <= domain[1]) {
                const current: CoordinateWithParametric = [fnx.evaluate({t}), fny.evaluate({t}), t];
                if (last) {
                    distributePoint(resultCoordinates, nextCoordinates, last, current, unit, input);
                }
                last = current;
                t += dt;
            }
        } else {
            const nextNextCoordinates: CoordinateWithParametric[] = [];
            nextCoordinates.forEach(last => {
                const current: CoordinateWithParametric = [fnx.evaluate({t: last[2] + dt}), fny.evaluate({t: last[2] + dt}), last[2] + dt];
                distributePoint(resultCoordinates, nextNextCoordinates, last, current, unit, input);
                const z = (
                    (fnx.evaluate({t: current[2]}) - fnx.evaluate({t: current[2] + dt})) ** 2 +
                    (fny.evaluate({t: current[2]}) - fny.evaluate({t: current[2] + dt})) ** 2
                ) ** .5;
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
    const coordinates = resultCoordinates.sort((a, b) => a[0] - b[0]).map<Coordinate>(([x, y]) => [x, y]);
    return {mapping: [], coordinates};
}
