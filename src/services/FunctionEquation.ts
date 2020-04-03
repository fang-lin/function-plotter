import {Equation, EquationSerial} from './Equation';
import {parseToggle, stringifyToggle} from '../components/App.function';

export class FunctionEquation implements Equation<string> {
    public color: string;
    public expression: string;
    public fn: string;
    public displayed: boolean;

    constructor([expression, color, displayed]: EquationSerial) {
        this.expression = expression;
        this.fn = this.compile(expression);
        this.color = color;
        this.displayed = displayed;
    }

    serialization(): EquationSerial {
        return [this.expression, this.color, this.displayed];
    }

    compile(expression: string): string {
        const x = expression.replace(/\r/, '');
        console.log(x);
        return x;
    }
}

export function isFunctionEquation(equation: Equation): equation is FunctionEquation {
    return equation instanceof FunctionEquation;
}
