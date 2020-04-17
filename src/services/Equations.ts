import {Equation, EquationSerial} from './Equation';
import {FunctionEquation} from './FunctionEquation';
import {ParametricEquation} from './ParametricEquation';
import {atou, utoa} from '../helpers/params';
import {parse} from 'mathjs';

export function equationFactory(expression: string, color: string, displayed: boolean): FunctionEquation | ParametricEquation {
    const trimmedExpression = expression.replace(/[\s\uFEFF\xA0\n\r]/g, '');
    const splitExpression = trimmedExpression.split(';');

    if (splitExpression.length === 3) {
        parse(splitExpression[0]).compile().evaluate({t: 0});
        parse(splitExpression[1]).compile().evaluate({t: 0});
        const domain: [number, number] = parse(splitExpression[2]).compile().evaluate().toArray();

        const options = {
            fx: splitExpression[0],
            fy: splitExpression[1],
            domain,
            color,
            expression: trimmedExpression,
            displayed
        };

        return new ParametricEquation(options);
    } else {
        parse(trimmedExpression).compile().evaluate({x: 0});
        const options = {
            expression: trimmedExpression,
            color,
            fn: trimmedExpression,
            displayed
        };

        return new FunctionEquation(options);
    }
}

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
            return equationFactory(expression, color, displayed);
        }));
    }
}

