import styled from 'styled-components';
import expandTr from '../../images/expand-tr.png';
import expandTrHover from '../../images/expand-tr-hover.png';
import expandBl from '../../images/expand-bl.png';
import expandBlHover from '../../images/expand-bl-hover.png';
import add from '../../images/add.png';
import addHover from '../../images/add-hover.png';
import edit from '../../images/edit.png';
import editHover from '../../images/edit-hover.png';
import cross from '../../images/cross.png';
import crossHover from '../../images/cross-hover.png';
import eyeOpened from '../../images/eye-opened.png';
import eyeClosed from '../../images/eye-closed.png';
import info from '../../images/info.png';
import infoHover from '../../images/info-hover.png';
import {SmallIconButton, TitleBar} from '../Dialog/Dialog.style';

const width = 320;

export const EquationPanelWrapper = styled.div<{
    expandEquationPanel: boolean;
}>`
    cursor: auto;
    position: absolute;
    top: 0;
    right: 0;
    width: ${width}px;
    padding: 20px 0 0 0;
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
    padding: 30px 0;
`;

export const EquationPanelTitleBar = styled(TitleBar)`
    padding: 15px 15px 15px 30px;
`;

const LeftIconButton = styled(SmallIconButton)`
    border-radius: 4px 0 0 4px;
`;

const RightIconButton = styled(SmallIconButton)`
    border-radius: 0 4px 4px 0;
    margin: 0 0 0 -1px;
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

export const ButtonWrapper = styled.div`
    display: flex;
    flex: none;
    padding: 0;
`;

export const EditButtonWrapper = styled(ButtonWrapper)`
    border-radius: 6px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .3);
`;

export const DisplayEquationButton = styled.button<{
    displayed: boolean;
}>`
    cursor: pointer;
    font-size: 0;
    line-height: 0;
    display: block;
    border: medium none;
    outline: none;
    padding: 0;
    align-self: stretch;
    flex: none;
    width: 36px;
    background-size: 16px 16px;
    background-image: url(${({displayed}): string => displayed ? eyeOpened : eyeClosed});
    background-repeat: no-repeat;
    background-position: 50% 50%;
   
`;

export const InfoButton = styled(SmallIconButton)`
    border-radius: 8px;
    margin: 0 10px 0 0;
    background-image: url(${info});
    :hover{
        background-image: url(${infoHover});
    }
`;

export const AddButton = styled(SmallIconButton)`
    border-radius: 8px;
    background-image: url(${add});
    :hover{
        background-image: url(${addHover});
    }
`;

export const EditButton = styled(LeftIconButton)`
    box-shadow: none;
    background-image: url(${edit});
    :hover{
        background-image: url(${editHover});
    }
`;

export const RemoveButton = styled(RightIconButton)`
    box-shadow: none;
    background-image: url(${cross});
    :hover{
        background-image: url(${crossHover});
    }
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

export const EquationItem = styled.li<{ selected: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px 0 0;
    background-color: ${({selected}): string => selected ? '#ddd' : '#fff'};
`;
export const EquationText = styled.div<{ displayed: boolean }>`
    flex: auto;
    font-size: 12px;
    padding: 15px;
    ${({displayed}): string => displayed ? '' : 'text-decoration:line-through;'}
`;
