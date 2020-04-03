export interface Equation<Fn = unknown> {
    expression: string;
    color: string;
    displayed: boolean;

    serialization(): EquationSerial;

    compile(expression: string): Fn;
}

export type EquationSerial = [string, string, boolean]
