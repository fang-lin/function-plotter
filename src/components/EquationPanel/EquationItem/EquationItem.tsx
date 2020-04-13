import React, {FunctionComponent, SyntheticEvent} from 'react';
import {ParsedParams} from '../../../helpers/params';
import {FunctionEquation} from '../../../services/FunctionEquation';
import {Equation} from '../../../services/Equation';
import {
    DisplayEquationButton,
    EditButton,
    EditButtonWrapper,
    EquationItemWrapper,
    EquationText, RemoveButton
} from './EquationItem.style';

export interface EquationPanelProps {
    index: number;
    pushToHistory: (params: Partial<ParsedParams>) => void;
    params: ParsedParams;
    equation: Equation;
    setEditingEquationIndex: (index: number) => void;
}

export const EquationItem: FunctionComponent<EquationPanelProps> = (props) => {
    const {
        params: {equations, selectedEquationIndex},
        equation: {expression, displayed, color},
        index,
        pushToHistory,
        setEditingEquationIndex
    } = props;

    const toggleEquationDisplayed = (event: SyntheticEvent): void => {
        event.stopPropagation();
        const {expression, color, displayed} = equations[index];
        equations[index] = new FunctionEquation([expression, color, !displayed]);
        pushToHistory({equations});
    };

    const removeEquation = (event: SyntheticEvent): void => {
        event.stopPropagation();
        equations.splice(index, 1);
        const lastEquationIndex = equations.length - 1;
        pushToHistory({
            equations,
            selectedEquationIndex: selectedEquationIndex > lastEquationIndex ? lastEquationIndex : selectedEquationIndex
        });
    };

    const editEquation = (event: SyntheticEvent): void => {
        event.stopPropagation();
        setEditingEquationIndex(index);
        pushToHistory({displayEquationDialog: true});
    };

    const selectEquation = (event: SyntheticEvent): void => {
        event.stopPropagation();
        pushToHistory({selectedEquationIndex: selectedEquationIndex === index ? -1 : index});
    };

    const style = index > 0 ? {borderTop: `${color} solid 1px`} : {};

    return <EquationItemWrapper {...{style}} onClick={selectEquation} selected={selectedEquationIndex === index}>
        <DisplayEquationButton {...{displayed, color}} style={{backgroundColor: color}}
            onClick={toggleEquationDisplayed}/>
        <EquationText {...{displayed}}>{expression}</EquationText>
        <EditButtonWrapper>
            <EditButton onClick={editEquation}>Edit</EditButton>
            <RemoveButton onClick={removeEquation}>Remove</RemoveButton>
        </EditButtonWrapper>
    </EquationItemWrapper>;
};
