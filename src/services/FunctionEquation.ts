import {Equation, EquationSerial} from './Equation';

interface FunctionEquationOptions {
    fn: string;
    color: string;
    displayed: boolean;
    expression: string;
}

export class FunctionEquation implements Equation {
    public color: string;
    public expression: string;
    public fn: string;
    public displayed: boolean;
    readonly type = 'FunctionEquation';

    constructor({fn, color, displayed, expression}: FunctionEquationOptions) {
        this.expression = expression;
        this.fn = fn;
        this.color = color;
        this.displayed = displayed;
    }

    serialization(): EquationSerial {
        return [this.expression, this.color, this.displayed];
    }
}

export function isFunctionEquation(equation: Equation): equation is FunctionEquation {
    return equation.type === 'FunctionEquation';
}
