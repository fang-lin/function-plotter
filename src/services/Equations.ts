import {atou, utoa} from '../components/App.function';
import {Equation, EquationSerial} from './Equation';


export class Equations extends Array<Equation> {
    constructor(...equations: Equation[]) {
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

    static parse(code: string): Equations {
        if (code === '-') {
            return new Equations();
        }
        const equations: EquationSerial[] = JSON.parse(atou(code));
        return new Equations(...equations.map(item => Equation.parse(item)));
    }
}
