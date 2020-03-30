import React, {FunctionComponent} from 'react';
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
    InfoButton, EditButtonWrapper
} from './EquationPanel.style';
import {ParsedParams, stopPropagation} from './App.function';
import {AddButton} from './EquationPanel.style';
import {Title} from './Dialog.style';
import {Equation} from '../services/Equation';

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

    const toggleEquationDisplayed = (index: number) => (): void => {
        const equation = equations[index];
        equations[index] = new Equation({...equation, ...{displayed: !equation.displayed}});
        pushToHistory({equations});
    };

    const removeEquation = (index: number) => (): void => {
        equations.splice(index, 1);
        pushToHistory({equations});
    };

    const editEquation = (index: number) => (): void => {
        setEditingEquationIndex(index);
        pushToHistory({displayEquationDialog: true});
    };

    const addEquation = (): void => {
        setEditingEquationIndex(-1);
        pushToHistory({displayEquationDialog: true});
    };

    return <EquationPanelWrapper  {...stopPropagation} displayEquationPanel={expandEquationPanel}>
        <EquationPanelTitleBar>
            <Title>Equations</Title>
            <ButtonWrapper>
                <InfoButton onClick={(): void => pushToHistory({displayInfoDialog: true})}>Info</InfoButton>
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
                        <EditButtonWrapper>
                            <EditButton onClick={editEquation(index)}>Edit</EditButton>
                            <RemoveButton onClick={removeEquation(index)}>Remove</RemoveButton>
                        </EditButtonWrapper>
                    </EquationItem>;
                })
            }</EquationsList>
        </EquationPanelInner>
        <ExpandToggle expandEquationPanel={expandEquationPanel}
            onClick={(): void => pushToHistory({expandEquationPanel: !expandEquationPanel})}/>
    </EquationPanelWrapper>;
};
