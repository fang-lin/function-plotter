import {Equation, EquationSerial} from './Equation';
import {parseToggle, stringifyToggle} from '../components/App.function';

export interface Fxy {
    fx: string;
    fy: string;
}

export class ParametricEquation implements Equation<Fxy> {
    public color: string;
    public expression: string;
    public fx: string;
    public fy: string;
    public displayed: boolean;

    constructor([expression, color, displayed]: EquationSerial) {
        this.expression = expression;
        const {fx, fy} = this.compile(expression);
        this.fx = fx;
        this.fy = fy;
        this.color = color;
        this.displayed = parseToggle(displayed);
    }

    serialization(): EquationSerial {
        return [this.expression, this.color, stringifyToggle(this.displayed)];
    }

    compile(expression: string): Fxy {
        return {
            fx: expression,
            fy: expression
        };
    }
}

export function isParametricEquation(equation: Equation): equation is ParametricEquation {
    return equation instanceof ParametricEquation;
}
