import React, {Dispatch, SetStateAction} from 'react';
import {
    EquationPanelWrapper,
    DisplayToggle,
    Title,
    EquationPanelInner,
    EquationsList,
    EquationItem,
    EquationText,
    EditButton,
    RemoveButton, ButtonWrapper, DisplayButton
} from './EquationPanel.style';
import {clone, Equation, stopPropagation} from './App.function';
import {AddButton} from "./EquationPanel.style";

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
        setEquations,
        setDisplayEquationForm,
        displayEquationPanel,
        setDisplayEquationPanel
    } = props;


    const toggleEquationDisplayed = (index: number) => () => {
        setEquations((equations) => {
            equations[index].displayed = !equations[index].displayed;
            return clone(equations);
        })
    };

    const removeEquation = (index: number) => () => {
        setEquations((equations) => {
            equations.splice(index, 1);
            return clone(equations);
        })
    };

    return <EquationPanelWrapper  {...stopPropagation} displayEquationPanel={displayEquationPanel}>
        <Title>
            List
            <AddButton onClick={() => setDisplayEquationForm(true)}>Add</AddButton>
        </Title>
        <EquationPanelInner>
            <EquationsList>{
                equations.map(({displayed, fx, color}, index) => {
                    return <EquationItem key={index} style={{borderTop: `${color} solid 1px`}}>
                        <DisplayButton {...{displayed, color}} style={{backgroundColor: color}}
                                       onClick={toggleEquationDisplayed(index)}/>
                        <EquationText>{fx}</EquationText>
                        <ButtonWrapper>
                            <EditButton>Edit</EditButton>
                            <RemoveButton onClick={removeEquation(index)}>Edit</RemoveButton>
                        </ButtonWrapper>
                    </EquationItem>;
                })
            }</EquationsList>
        </EquationPanelInner>
        <DisplayToggle displayEquationPanel={displayEquationPanel}
                       onClick={() => setDisplayEquationPanel(_ => !_)}/>
    </EquationPanelWrapper>;
};
