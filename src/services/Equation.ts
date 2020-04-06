export interface Equation {
    expression: string;
    color: string;
    displayed: boolean;
    type: string;

    serialization(): EquationSerial;
}

export type EquationSerial = [string, string, boolean]
