import {atou, utoa} from '../components/App.function';
import {Equation} from './Equation';

export class Equations extends Array<Equation> {
    constructor(...equations: Equation[]) {
        super(...equations);
        Object.setPrototypeOf(this, Equations.prototype);
    }

    stringify(): string {
        if (this.length === 0) {
            return '-';
        }
        return utoa(this.map(equation => equation.stringify()).join(';'));
    }

    static parse(equations: string): Equations {
        if (equations === '-') {
            return new Equations();
        }
        return new Equations(...atou(equations).split(';').map(item => Equation.parse(item)));
    }
}
