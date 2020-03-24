import React, {Dispatch, SetStateAction} from 'react';
import {
    EquationPanelWrapper,
    ExpandToggle,
    EquationPanelTitleBar,
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
import {clone, ConvertedParams, Equation, stopPropagation} from './App.function';
import {AddButton} from './EquationPanel.style';
import {Title} from './Base.style';

export interface EquationPanelProps {
    equations: Equation[];
    setEquations: Dispatch<SetStateAction<Equation[]>>;
    pushToHistory: (params: Partial<ConvertedParams>) => void;
    params: ConvertedParams;
}

export const EquationPanel = (props: EquationPanelProps) => {
    const {
        equations,
        setEquations,
        params,
        pushToHistory
    } = props;

    const {EXPAND_EQUATION_PANEL, INFO_DIALOG_DISPLAY, EQUATION_DIALOG_DISPLAY} = params;

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

    return <EquationPanelWrapper  {...stopPropagation} displayEquationPanel={EXPAND_EQUATION_PANEL}>
        <EquationPanelTitleBar>
            <Title>Equations</Title>
            <ButtonWrapper>
                <InfoButton onClick={() => pushToHistory({INFO_DIALOG_DISPLAY: true})}>Info</InfoButton>
                <AddButton onClick={() => pushToHistory({EQUATION_DIALOG_DISPLAY: true})}>Add</AddButton>
            </ButtonWrapper>
        </EquationPanelTitleBar>
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
        <ExpandToggle expandEquationPanel={EXPAND_EQUATION_PANEL}
                      onClick={() => pushToHistory({EXPAND_EQUATION_PANEL: !EXPAND_EQUATION_PANEL})}/>
    </EquationPanelWrapper>;
};
