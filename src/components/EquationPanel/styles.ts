import styled from 'styled-components';
import expandTr from '../../images/expand-tr.png';
import expandTrHover from '../../images/expand-tr-hover.png';
import expandBl from '../../images/expand-bl.png';
import expandBlHover from '../../images/expand-bl-hover.png';
import addIcon from '../../images/icons/add.png';
import questionIcon from '../../images/icons/question.png';
import {BaseButton, SmallIconButton, TitleBar} from '../Dialog/styles';

const width = 320;

export const EquationPanelWrapper = styled.div<{
    expandEquationPanel: boolean;
}>`
    cursor: auto;
    position: absolute;
    top: 0;
    right: 0;
    width: ${width}px;
    max-height: calc(100% - 88px);
    padding: 20px 0 0 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: #eee;
    border-radius: 0 0 0 4px;
    border-style: solid;
    border-color: #666;
    border-width: 0 0 1px 1px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, .7);
    overflow: hidden;
    background-color: #eee;
    transition: all .2s ease-in-out;
    ${({expandEquationPanel}): string => expandEquationPanel ? '' :
        'transform: translateX(100%) translateX(-24px) translateY(-100%) translateY(24px);'}
`;

export const EquationPanelInner = styled.div`
    padding: 20px 0 30px 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

export const EquationPanelTitleBar = styled(TitleBar)`
    padding: 15px 15px 15px 30px;
`;


export const ExpandToggle = styled(SmallIconButton)<{
    expandEquationPanel: boolean;
}>`
    position: absolute;
    left: 0;
    bottom: 0;
    border-radius: 0 4px 0 0;
    border-width: 1px 1px 0 0;
    background-position: 0 -1px;
    background-image: url(${({expandEquationPanel}): string => expandEquationPanel ? expandTr : expandBl});
    :hover{
        background-image: url(${({expandEquationPanel}): string => expandEquationPanel ? expandTrHover : expandBlHover});
    }
`;


export const InfoButton = styled(SmallIconButton)`
    margin: 0 10px 0 0;
    background-image: url(${questionIcon});
`;

export const AddButton = styled(SmallIconButton)`
    border-radius: 8px;
    background-image: url(${addIcon});
`;

export const AddNewButton = styled(BaseButton)`
    font-weight: bold;
    width: fill-available;
    margin: 0 20px;
`;

export const EquationsList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    overflow: auto;
    border-style: solid;
    border-color: #666;
    border-width: 1px 0;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    flex: none;
    padding: 0;
`;
