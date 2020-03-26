import React, {Dispatch, FunctionComponent, SetStateAction} from 'react';
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
import {ParsedParams, stopPropagation} from './App.function';
import {AddButton} from './EquationPanel.style';
import {Title} from './Dialog.style';
import {Equation} from "../services/Equation";

export interface EquationPanelProps {
    pushToHistory: (params: Partial<ParsedParams>) => void;
    params: ParsedParams;
    setEditingEquationIndex: (index: number) => void;
}

export const EquationPanel: FunctionComponent<EquationPanelProps> = (props) => {
    const {
        params,
        pushToHistory,
        setEditingEquationIndex
    } = props;

    const {expandEquationPanel, equations} = params;

    const toggleEquationDisplayed = (index: number) => () => {
        const equation = equations[index];
        equations[index] = new Equation({...equation, ...{displayed: !equation.displayed}});
        pushToHistory({equations});
    };

    const removeEquation = (index: number) => () => {
        equations.splice(index, 1);
        pushToHistory({equations});
    };

    const editEquation = (index: number) => () => {
        setEditingEquationIndex(index);
        pushToHistory({displayEquationDialog: true});
    };

    const addEquation = () => {
        setEditingEquationIndex(-1);
        pushToHistory({displayEquationDialog: true});
    };

    return <EquationPanelWrapper  {...stopPropagation} displayEquationPanel={expandEquationPanel}>
        <EquationPanelTitleBar>
            <Title>Equations</Title>
            <ButtonWrapper>
                <InfoButton onClick={() => pushToHistory({displayInfoDialog: true})}>Info</InfoButton>
                <AddButton onClick={addEquation}>Add</AddButton>
            </ButtonWrapper>
        </EquationPanelTitleBar>
        <EquationPanelInner>
            <EquationsList>{
                equations.map(({displayed, fx, color}, index) => {
                    return <EquationItem key={index} style={{borderTop: `${color} solid 1px`}}>
                        <DisplayEquationButton {...{displayed, color}} style={{backgroundColor: color}}
                                               onClick={toggleEquationDisplayed(index)}/>
                        <EquationText {...{displayed}}>{fx}</EquationText>
                        <ButtonWrapper>
                            <EditButton onClick={editEquation(index)}>Edit</EditButton>
                            <RemoveButton onClick={removeEquation(index)}>Remove</RemoveButton>
                        </ButtonWrapper>
                    </EquationItem>;
                })
            }</EquationsList>
        </EquationPanelInner>
        <ExpandToggle expandEquationPanel={expandEquationPanel}
                      onClick={() => pushToHistory({expandEquationPanel: !expandEquationPanel})}/>
    </EquationPanelWrapper>;
};
