import React, {FunctionComponent, SyntheticEvent} from 'react';
import {
    AddButton, AddNewButton, AddNewButtonIcon,
    ButtonWrapper,
    EquationPanelInner,
    EquationPanelTitleBar,
    EquationPanelWrapper,
    EquationsList,
    ExpandToggle,
    InfoButton,
} from './styles';
import {Size, stopPropagation} from '../../pages/Plotter';
import {Title, TitleIcon} from '../Dialog/styles';
import mathsIcon from '../../images/maths.png';
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
        pushToHistory
    } = props;

    const {expandEquationPanel, equations} = params;

    const addEquation = (event: SyntheticEvent): void => {
        event.stopPropagation();
        pushToHistory({editingEquationIndex: -1});
    };

    return <EquationPanelWrapper {...stopPropagation} {...{expandEquationPanel}}>
        <EquationPanelTitleBar>
            <TitleIcon src={mathsIcon}/>
            <Title>Equations</Title>
            <ButtonWrapper>
                <InfoButton onClick={(): void => pushToHistory({displayInfoDialog: true})}>Info</InfoButton>
                <AddButton onClick={addEquation}>Add</AddButton>
            </ButtonWrapper>
        </EquationPanelTitleBar>
        <EquationPanelInner>
            {equations.length ? <EquationsList>{
                equations.map((equation, index) => <EquationItem key={index} {...{
                    equation,
                    index,
                    params,
                    pushToHistory
                }}/>)
            }</EquationsList> : <AddNewButton onClick={addEquation}><AddNewButtonIcon/>Add New Equation</AddNewButton>}
        </EquationPanelInner>
        <ExpandToggle expandEquationPanel={expandEquationPanel}
            onClick={(): void => pushToHistory({expandEquationPanel: !expandEquationPanel})}/>
    </EquationPanelWrapper>;
};
