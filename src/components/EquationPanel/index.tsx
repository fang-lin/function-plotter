import React, {FunctionComponent, SyntheticEvent} from 'react';
import {
    AddButton, AddNewButton,
    ButtonWrapper,
    EquationPanelInner,
    EquationPanelTitleBar,
    EquationPanelWrapper,
    EquationsList,
    ExpandToggle,
    InfoButton
} from './styles';
import {Size, stopPropagation} from '../../pages/Diagraph';
import {Title} from '../Dialog/styles';
import {ParsedParams} from '../../helpers';
import {EquationItem} from './EquationItem';

export interface EquationPanelProps {
    pushToHistory: (params: Partial<ParsedParams>) => void;
    params: ParsedParams;
    size: Size;
}

export const EquationPanel: FunctionComponent<EquationPanelProps> = (props) => {
    const {
        params,
        size,
        pushToHistory
    } = props;

    const {expandEquationPanel, equations} = params;

    const addEquation = (event: SyntheticEvent): void => {
        event.stopPropagation();
        pushToHistory({editingEquationIndex: -1});
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
            {equations.length ? <EquationsList style={{maxHeight: `${size[1] - 200}px`}}>{
                equations.map((equation, index) => <EquationItem key={index} {...{
                    equation,
                    index,
                    params,
                    pushToHistory
                }}/>)
            }</EquationsList> : <AddNewButton onClick={addEquation}>Add New Equation</AddNewButton>}
        </EquationPanelInner>
        <ExpandToggle expandEquationPanel={expandEquationPanel}
            onClick={(): void => pushToHistory({expandEquationPanel: !expandEquationPanel})}/>
    </EquationPanelWrapper>;
};
