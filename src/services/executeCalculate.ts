import {pool} from 'workerpool';
import {parse} from 'mathjs';
import {Coordinate, Size} from '../components/App.function';
import {FunctionEquation, isFunctionEquation} from './FunctionEquation';
import {Equation} from './Equation';
import {isParametricEquation, ParametricEquation} from './ParametricEquation';

const workerPool = pool();

export interface Fn {
    (x: number): number;
}

interface Input {
    range: [Size, Size];
    origin: Coordinate;
    scale: number;
    isSmooth: boolean;
}

function calculateFunctionEquation(equation: FunctionEquation, input: Input): Coordinate[] {
    const {range, origin, scale, isSmooth} = input;
    const {fn} = equation;
    // const func = (new Function('x', `return ${fn};`)) as Fn;
    const s = parse(fn).compile();
    const func = (x: number): number => s.evaluate({x});
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

    function main(): Coordinate[] {
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
                        distributePoint(resultPoints, nextPoints, last, current, dx);
                    }
                    last = current;
                }
            } else {
                const nextNextPoints: Coordinate[] = [];
                nextPoints.forEach(last => {
                    const current: Coordinate = [last[0] + dx, func(last[0] + dx)];
                    distributePoint(resultPoints, nextNextPoints, last, current, dx);
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

    return main();
}

function calculateParametricEquation(equation: ParametricEquation, input: Input): Coordinate[] {
    // const {range, origin, scale, fx, fy, isSmooth} = input;
    // const fn = (new Function('x', `return ${fn};`)) as Fn;
    // const unit = 1 / scale / 2;

    function main(): Coordinate[] {
        return [];
    }

    return main();
}

export async function executeCalculate<T extends Equation>(equation: T, input: Input): Promise<Coordinate[]> {
    if (isFunctionEquation(equation)) {
        return new Promise(resolve => resolve(calculateFunctionEquation(equation, input)));
    }

    // await workerPool.terminate();
    // const p = parse('y=x+2').compile();
    // // console.log(p.evaluate({x: 3}));
    // if (isFunctionEquation(equation)) {
    //     return await workerPool.exec(calculateFunctionEquation, [equation, input, p]);
    // }
    // if (isParametricEquation((equation))) {
    //     return await workerPool.exec(calculateParametricEquation, [equation, input]);
    // }
    return await new Promise(() => []);
}

export async function terminateCalculate(): Promise<unknown> {
    return (await workerPool.terminate()) as unknown;
}


