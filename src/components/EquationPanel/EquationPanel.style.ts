import styled from 'styled-components';
import expandTr from '../../images/expand-tr.png';
import expandTrHover from '../../images/expand-tr-hover.png';
import expandBl from '../../images/expand-bl.png';
import expandBlHover from '../../images/expand-bl-hover.png';
import add from '../../images/add.png';
import addHover from '../../images/add-hover.png';

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
