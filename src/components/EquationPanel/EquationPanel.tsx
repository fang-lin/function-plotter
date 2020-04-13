import React, {FunctionComponent, SyntheticEvent} from 'react';
import {
    EquationPanelWrapper,
    ExpandToggle,
    EquationPanelTitleBar,
    EquationPanelInner,
    EquationsList,
    InfoButton, ButtonWrapper
} from './EquationPanel.style';
import {AddButton} from './EquationPanel.style';
import {Size, stopPropagation} from '../App/App.function';
import {Title} from '../Dialog/Dialog.style';
import {ParsedParams} from '../../helpers/params';
import {EquationItem} from './EquationItem/EquationItem';

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

    const {expandEquationPanel, equations} = params;

    const addEquation = (event: SyntheticEvent): void => {
        event.stopPropagation();
        setEditingEquationIndex(-1);
        pushToHistory({displayEquationDialog: true});
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
                equations.map((equation, index) => <EquationItem key={index} {...{
                    equation,
                    index,
                    setEditingEquationIndex,
                    params,
                    pushToHistory
                }}/>)
            }</EquationsList>
        </EquationPanelInner>
        <ExpandToggle expandEquationPanel={expandEquationPanel}
            onClick={(): void => pushToHistory({expandEquationPanel: !expandEquationPanel})}/>
    </EquationPanelWrapper>;
};
