import {Equation, EquationSerial} from './Equation';
import {FunctionEquation} from './FunctionEquation';
import {ParametricEquation} from './ParametricEquation';
import {atou, utoa} from '../helpers/params';

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
            return new FunctionEquation({fn: expression, expression, color, displayed});
        }));
    }
}
