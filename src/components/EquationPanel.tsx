import React, {Dispatch, SetStateAction} from 'react';
import {EquationPanelWrapper} from './EquationPanel.style';
import {Coordinate, Equation} from "./App.function";

export interface EquationPanelProps {
    equations: Equation[];
    setEquations: Dispatch<SetStateAction<Equation[]>>;
}

export const EquationPanel = (props: EquationPanelProps) => {
    const {equations} = props;
    return <EquationPanelWrapper>
        <ul>{
            equations.map((equation, index) => <li key={index}>
                <span>{equation.fx}</span>
            </li>)
        } </ul>
    </EquationPanelWrapper>;
};
