import styled from 'styled-components';
import eyeOpened from '../../../images/eye-opened.png';
import eyeClosed from '../../../images/eye-closed.png';
import edit from '../../../images/edit.png';
import editHover from '../../../images/edit-hover.png';
import cross from '../../../images/cross.png';
import crossHover from '../../../images/cross-hover.png';
import {SmallIconButton} from '../../Dialog/styles';
import {ButtonWrapper} from '../styles';

const LeftIconButton = styled(SmallIconButton)`
    border-radius: 4px 0 0 4px;
`;

const RightIconButton = styled(SmallIconButton)`
    border-radius: 0 4px 4px 0;
    margin: 0 0 0 -1px;
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

export const EquationItemWrapper = styled.li<{ selected: boolean }>`
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
    word-break: break-all;
    ${({displayed}): string => displayed ? '' : 'text-decoration: line-through;'}
`;
