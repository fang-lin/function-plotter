interface Equation {
    matrix: any;
    id: number;
}

export interface RedrawFn {
    (): void
}

export interface Redraw {
    redraw: RedrawFn;
    setRedraw: (redraw: RedrawFn) => void;
}

export class Equations implements Redraw {
    equationsMatrix: Equation[] = [];
    isRedrawing: boolean = false;
    redraw = () => {
        console.log('init redraw');
    };

    setRedraw = (redraw: RedrawFn) => {
        this.redraw = redraw;
    };

    updateIsRedrawing = (is: boolean) => {
        this.isRedrawing = is;
    };

    pushEquationsMatrix = (equation: Equation) => {
        if (this.equationsMatrix[0]) {
            this.equationsMatrix[0].matrix = equation.matrix;
        } else {
            this.equationsMatrix[0] = equation;
        }
    };

    updateEquationsMatrix = (equations: Equation[]) => {
        equations.map(equation => {

        });
    };
}
