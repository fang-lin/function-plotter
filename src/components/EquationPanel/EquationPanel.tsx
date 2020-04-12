import React, {FunctionComponent, SyntheticEvent} from 'react';
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
import {AddButton} from './EquationPanel.style';
import {FunctionEquation} from '../../services/FunctionEquation';
import {Size, stopPropagation} from '../App/App.function';
import {Title} from '../Dialog/Dialog.style';
import {ParsedParams} from '../../helpers/params';

export interface EquationPanelProps {
    pushToHistory: (params: Partial<ParsedParams>) => void;
    params: ParsedParams;
    size: Size;
    setEditingEquationIndex: (index: number) => void;
}

export const EquationPanel: FunctionComponent<EquationPanelProps> = (props) => {
    const {
        params,
        size,
        pushToHistory,
        setEditingEquationIndex
    } = props;

    const {expandEquationPanel, equations, selectedEquationIndex} = params;

    const toggleEquationDisplayed = (index: number) => (): void => {
        const {expression, color, displayed} = equations[index];
        equations[index] = new FunctionEquation([expression, color, !displayed]);
        pushToHistory({equations});
    };

    const removeEquation = (index: number) => (event: SyntheticEvent): void => {
        event.stopPropagation();
        equations.splice(index, 1);
        const lastEquationIndex = equations.length - 1;
        pushToHistory({
            equations,
            selectedEquationIndex: selectedEquationIndex > lastEquationIndex ? lastEquationIndex : selectedEquationIndex
        });
    };

    const editEquation = (index: number) => (event: SyntheticEvent): void => {
        event.stopPropagation();
        setEditingEquationIndex(index);
        pushToHistory({displayEquationDialog: true});
    };

    const addEquation = (event: SyntheticEvent): void => {
        event.stopPropagation();
        setEditingEquationIndex(-1);
        pushToHistory({displayEquationDialog: true});
    };

    const selectEquation = (index: number) => (event: SyntheticEvent): void => {
        event.stopPropagation();
        pushToHistory({selectedEquationIndex: selectedEquationIndex === index ? -1 : index});
    };

    return <EquationPanelWrapper {...stopPropagation} {...{expandEquationPanel}}>
        <EquationPanelTitleBar>
            <Title>Equations</Title>
            <ButtonWrapper>
                <InfoButton onClick={(): void => pushToHistory({displayInfoDialog: true})}>Info</InfoButton>
                <AddButton onClick={addEquation}>Add</AddButton>
            </ButtonWrapper>
        </EquationPanelTitleBar>
        <EquationPanelInner>
            <EquationsList style={{maxHeight: `${size[1] - 200}px`}}>{
                equations.map(({displayed, expression, color}, index) => {
                    const style = index > 0 ? {borderTop: `${color} solid 1px`} : {};
                    return <EquationItem key={index} {...{style}} onClick={selectEquation(index)}
                        selected={selectedEquationIndex === index}>
                        <DisplayEquationButton {...{displayed, color}} style={{backgroundColor: color}}
                            onClick={toggleEquationDisplayed(index)}/>
                        <EquationText {...{displayed}}>{expression}</EquationText>
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
