import {Equation, EquationSerial} from './Equation';

export interface ParametricEquationOptions {
    fx: string;
    fy: string;
    domain: [number, number];
    color: string;
    displayed: boolean;
    expression: string;
}

export class ParametricEquation implements Equation {
    public color: string;
    public expression: string;
    public fx: string;
    public fy: string;
    public domain: [number, number];
    public displayed: boolean;
    readonly type = 'ParametricEquation';

    constructor({fx, fy, domain, color, displayed, expression}: ParametricEquationOptions) {
        this.expression = expression;
        this.fx = fx;
        this.fy = fy;
        this.domain = domain;
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
