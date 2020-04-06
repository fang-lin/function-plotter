import {Equation, EquationSerial} from './Equation';

export interface Fxy {
    fx: string;
    fy: string;
}

export class ParametricEquation implements Equation {
    public color: string;
    public expression: string;
    public fx: string;
    public fy: string;
    public displayed: boolean;
    readonly type = 'ParametricEquation';

    constructor([expression, color, displayed]: EquationSerial) {
        this.expression = expression;
        this.fx = expression;
        this.fy = expression;
        this.color = color;
        this.displayed = displayed;
    }

    serialization(): EquationSerial {
        return [this.expression, this.color, this.displayed];
    }
}

export function isParametricEquation(equation: Equation): equation is ParametricEquation {
    return equation.type === 'ParametricEquation';
}
