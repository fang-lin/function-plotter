import React, {Dispatch, SetStateAction} from 'react';
import {EquationPanelWrapper, DisplayToggle, Title, EquationPanelInner} from './EquationPanel.style';
import {Coordinate, Equation} from './App.function';

export interface EquationPanelProps {
    equations: Equation[];
    setEquations: Dispatch<SetStateAction<Equation[]>>;
    setDisplayEquationForm: Dispatch<SetStateAction<boolean>>;
    displayEquationPanel: boolean;
    setDisplayEquationPanel: Dispatch<SetStateAction<boolean>>;
}

export const EquationPanel = (props: EquationPanelProps) => {
    const {
        equations,
        setDisplayEquationForm,
        displayEquationPanel,
        setDisplayEquationPanel
    } = props;
    return <EquationPanelWrapper displayEquationPanel={displayEquationPanel}>
        <Title>
            List
        </Title>
        <EquationPanelInner>
            <ul>{
                equations.map((equation, index) => <li key={index}>
                    <span>{equation.fx}</span>
                </li>)
            }</ul>
            <button onClick={() => setDisplayEquationForm(true)}>Add</button>
        </EquationPanelInner>
        <DisplayToggle displayEquationPanel={displayEquationPanel}
                       onClick={() => setDisplayEquationPanel(_ => !_)}/>
    </EquationPanelWrapper>;
};
