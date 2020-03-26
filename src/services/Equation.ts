import {parseToggle, stringifyToggle} from '../components/App.function';

export interface IEquation {
    fx: string;
    color: string;
    displayed: boolean;
}

export class Equation implements IEquation {
    public color: string;
    public fx: string;
    public displayed: boolean;

    constructor(value: IEquation) {
        this.fx = value.fx;
        this.color = value.color;
        this.displayed = value.displayed;
    }

    stringify(): string {
        return `${this.fx},${this.color},${stringifyToggle(this.displayed)}`;
    }

    static parse(equation: string): Equation {
        const items = equation.split(',');
        return new Equation({
            fx: items[0],
            color: items[1],
            displayed: parseToggle(items[2])
        });
    }
}
