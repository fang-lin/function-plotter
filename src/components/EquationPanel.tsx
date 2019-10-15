import React, {Dispatch, SetStateAction} from 'react';
import {
    EquationPanelWrapper,
    ExpandToggle,
    EquationPanelTitle,
    EquationPanelInner,
    EquationsList,
    EquationItem,
    EquationText,
    EditButton,
    RemoveButton,
    ButtonWrapper,
    DisplayEquationButton,
    InfoButton
} from './EquationPanel.style';
import {clone, Equation, stopPropagation} from './App.function';
import {AddButton} from "./EquationPanel.style";

export interface EquationPanelProps {
    equations: Equation[];
    setEquations: Dispatch<SetStateAction<Equation[]>>;
    setEquationEditorDisplay: Dispatch<SetStateAction<boolean>>;
    expandEquationPanel: boolean;
    setExpandEquationPanel: Dispatch<SetStateAction<boolean>>;
}

export const EquationPanel = (props: EquationPanelProps) => {
    const {
        equations,
        setEquations,
        setEquationEditorDisplay,
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
        <EquationPanelTitle>
            Equations
            <ButtonWrapper>
                <InfoButton>Info</InfoButton>
                <AddButton onClick={() => setEquationEditorDisplay(true)}>Add</AddButton>
            </ButtonWrapper>
        </EquationPanelTitle>
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
