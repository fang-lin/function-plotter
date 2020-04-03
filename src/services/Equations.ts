import {atou, utoa} from '../components/App.function';
import {Equation, EquationSerial} from './Equation';
import {FunctionEquation} from './FunctionEquation';
import {ParametricEquation} from './ParametricEquation';

const methods = [
    'abs',
    'acos',
    'acosh',
    'asin',
    'asinh',
    'atan',
    'atanh',
    'atan2',
    'ceil',
    'cbrt',
    'expm1',
    'clz32',
    'cos',
    'cosh',
    'exp',
    'floor',
    'fround',
    'hypot',
    'imul',
    'log',
    'log1p',
    'log2',
    'log10',
    'max',
    'min',
    'pow',
    'random',
    'round',
    'sign',
    'sin',
    'sinh',
    'sqrt',
    'tan',
    'tanh',
    'trunc',
    'E:',
    'LN10',
    'LN2',
    'LOG10E',
    'LOG2E',
    'PI',
    'SQRT1_2',
    'SQRT2'
];


export function crimp(expression: string): string {
    return expression.replace(/\s/g, '');
}

const symbols = [
    '=',
    '+',
    '-',
    '*',
    '/',
    '%',
    '**',
    '<<',
    '>>',
    '>>>',
    '&',
    '^',
    '|'
];

export class Equations<T extends Equation> extends Array<T> {
    constructor(...equations: Array<T>) {
        super(...equations);
        Object.setPrototypeOf(this, Equations.prototype);
    }

    serialization(): EquationSerial[] {
        return this.map(equation => equation.serialization());
    }

    stringify(): string {
        if (this.length === 0) {
            return '-';
        }
        return utoa(JSON.stringify(this.serialization()));
    }

    static parse(code: string): Equations<FunctionEquation | ParametricEquation> {
        if (code === '-') {
            return new Equations();
        }
        const equations: EquationSerial[] = JSON.parse(atou(code));
        return new Equations<FunctionEquation | ParametricEquation>(...equations.map(([expression, color, displayed]) => {

            const x = expression.replace(/\r/, '');
            if (true) {
                return new FunctionEquation([expression, color, displayed]);
            }

            return new FunctionEquation([expression, color, displayed]);
        }));
    }
}
