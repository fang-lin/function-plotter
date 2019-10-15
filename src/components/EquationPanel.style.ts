import styled from 'styled-components';
import cornerOff from '../images/corner-off.png';
import cornerOffHover from '../images/corner-off-hover.png';
import cornerOn from '../images/corner-on.png';
import cornerOnHover from '../images/corner-on-hover.png';
import add from '../images/add.png';
import addHover from '../images/add-hover.png';
import edit from '../images/edit.png';
import editHover from '../images/edit-hover.png';
import remove from '../images/remove.png';
import removeHover from '../images/remove-hover.png';
import eyeOpened from '../images/eye-opened.png';
import eyeClosed from '../images/eye-closed.png';

const width = 320;

export const EquationPanelWrapper = styled.div<{
    displayEquationPanel: boolean
}>`
    cursor: auto;
    position: absolute;
    ${({displayEquationPanel}) => displayEquationPanel ? 'top: 0' : 'bottom: calc(100% - 24px)'};
    right: ${({displayEquationPanel}) => displayEquationPanel ? 0 : 24 - width}px;
    width: ${width}px;
    padding: 20px 0 0 0;
    background: #eee;
    border-radius: 0 0 0 4px;
    border-style: solid;
    border-color: #666;
    border-width: 0 0 1px 1px;
    box-shadow: 0 5px 20px rgba(0,0,0,.7);
    overflow: hidden;
    background-color: #eee;
`;

export const EquationPanelInner = styled.div`
    padding: 30px 0;
`;

export const Title = styled.div`
    background-color: #ccc;
    border-width: 1px 0;
    border-style: solid;
    border-color: #666;
    color: #333;
    padding: 15px 15px 15px 30px;
    display: flex;
    font-size: 14px;
    justify-content: space-between;
    text-shadow: 0 1px 1px rgba(255,255,255,.7);
`;

export const DisplayToggle = styled.button<{
    displayEquationPanel: boolean
}>`
    position: absolute;
    left: 0;
    bottom: 0;
    border: medium none;
    height: 16px;
    width: 16px;
    outline: none;
    background-image: url(${({displayEquationPanel}) => displayEquationPanel ? cornerOn : cornerOff});
    background-size: 16px 16px;
    :hover{
        background-image: url(${({displayEquationPanel}) => displayEquationPanel ? cornerOnHover : cornerOffHover});
    }
`;

export const ButtonWrapper = styled.div`
    display: flex;
    flex: none;
    padding: 0 15px 0 0;
`;

const BaseButton = styled.button`
    cursor: pointer;
    font-size: 0;
    line-height: 0;
    display: block;
    border: medium none;
    outline: none;
    background-color: transparent;
`;

const IconButton = styled(BaseButton)`
    background-size: 16px 16px;
    height: 16px;
    width: 16px;
`;

export const DisplayButton = styled(BaseButton)<{
    displayed: boolean;
}>`
    padding: 0;
    align-self: stretch;
    flex: none;
    width: 36px;
    background-size: 16px 16px;
    background-image: url(${({displayed}) => displayed ? eyeOpened : eyeClosed});
    background-repeat: no-repeat;
    background-position: 50% 50%;
   
`;

export const AddButton = styled(IconButton)`
    background-image: url(${add});
    :hover{
        background-image: url(${addHover});
    }
`;

export const EditButton = styled(IconButton)`
    background-image: url(${edit});
    :hover{
        background-image: url(${editHover});
    }
`;

export const RemoveButton = styled(IconButton)`
    margin: 0 0 0 -1px;
    background-image: url(${remove});
    :hover{
        background-image: url(${removeHover});
    }
`;

export const EquationsList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`;

export const EquationItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    :last-child{
        border-bottom: #666 solid 1px;
    }
`;
export const EquationText = styled.div`
    flex: auto;
    font-size: 12px;
    padding: 15px;
`;
