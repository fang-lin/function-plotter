import {action, observable} from 'mobx';

interface Equation {
    matrix: any;
    id: number;
}

export class Equations {
    @observable equationsMatrix: Equation[] = [];
    @observable isRedrawing: boolean = false;
    @observable redraw: () => void;

    @action
    updateIsRedrawing = (is: boolean) => {
        this.isRedrawing = is;
    };

    @action
    pushEquationsMatrix = (equation: Equation) => {
        if (this.equationsMatrix[0]) {
            this.equationsMatrix[0].matrix = equation.matrix;
        } else {
            this.equationsMatrix[0] = equation;
        }
    };

    @action
    updateEquationsMatrix = (equations: Equation[]) => {
        equations.map(equation => {

        });
    };
}
