import React, {Dispatch, SetStateAction} from 'react';
import {EquationPanelWrapper} from './EquationPanel.style';
import {Coordinate, Equation} from "./App.function";

export interface EquationPanelProps {
    equations: Equation[];
    setEquations: Dispatch<SetStateAction<Equation[]>>;
    setDisplayEquationForm: Dispatch<SetStateAction<boolean>>;
}

export const EquationPanel = (props: EquationPanelProps) => {
    const {
        equations,
        setDisplayEquationForm
    } = props;
    return <EquationPanelWrapper>
        <ul>{
            equations.map((equation, index) => <li key={index}>
                <span>{equation.fx}</span>
            </li>)
        }</ul>
        <button onClick={() => setDisplayEquationForm(true)}>Add</button>
    </EquationPanelWrapper>;
};
