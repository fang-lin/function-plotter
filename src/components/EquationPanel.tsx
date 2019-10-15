import React, {Dispatch, SetStateAction} from 'react';
import {
    EquationPanelWrapper,
    ExpandToggle,
    Title,
    EquationPanelInner,
    EquationsList,
    EquationItem,
    EquationText,
    EditButton,
    RemoveButton,
    ButtonWrapper,
    DisplayEquationButton, InfoButton
} from './EquationPanel.style';
import {clone, Equation, stopPropagation} from './App.function';
import {AddButton} from "./EquationPanel.style";

export interface EquationPanelProps {
    equations: Equation[];
    setEquations: Dispatch<SetStateAction<Equation[]>>;
    setDisplayEquationForm: Dispatch<SetStateAction<boolean>>;
    expandEquationPanel: boolean;
    setExpandEquationPanel: Dispatch<SetStateAction<boolean>>;
}

export const EquationPanel = (props: EquationPanelProps) => {
    const {
        equations,
        setEquations,
        setDisplayEquationForm,
        expandEquationPanel,
        setExpandEquationPanel
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

    return <EquationPanelWrapper  {...stopPropagation} displayEquationPanel={expandEquationPanel}>
        <Title>
            Equations
            <ButtonWrapper>
                <InfoButton>Info</InfoButton>
                <AddButton onClick={() => setDisplayEquationForm(true)}>Add</AddButton>
            </ButtonWrapper>
        </Title>
        <EquationPanelInner>
            <EquationsList>{
                equations.map(({displayed, fx, color}, index) => {
                    return <EquationItem key={index} style={{borderTop: `${color} solid 1px`}}>
                        <DisplayEquationButton {...{displayed, color}} style={{backgroundColor: color}}
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
        <ExpandToggle expandEquationPanel={expandEquationPanel}
                      onClick={() => setExpandEquationPanel(_ => !_)}/>
    </EquationPanelWrapper>;
};
