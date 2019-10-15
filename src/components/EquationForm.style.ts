import styled from 'styled-components';
import cross from '../images/cross.png';
import crossHover from '../images/cross-hover.png';
import ok from '../images/ok.png';
import okHover from '../images/ok-hover.png';
import {IconButton} from './EquationPanel.style';
import {LargeIconButton} from './ZoomPanel.style';

export const EquationFormBackground = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,.3);
`;

export const EquationFormWrapper = styled.div`
    padding: 20px 0 0 0;
    background: #eee;
    border-radius: 8px;
    border: solid 1px #666;
    box-shadow: 0 10px 30px rgba(0,0,0,.7);
    cursor: auto;
`;

export const EquationFormInner = styled.div`
    width: 640px;
    padding: 30px;
`;

export const Title = styled.div`
    background-color: #ccc;
    border-width: 1px 0;
    border-style: solid;
    border-color: #666;
    color: #333;
    padding: 15px 30px;
    display: flex;
    font-size: 14px;
    justify-content: space-between;
    text-shadow: 0 1px 1px rgba(255,255,255,.7);
`;

export const Close = styled(IconButton)`
    background-image: url(${cross});
    :hover{
        background-image: url(${crossHover});
    }
`;

export const EquationTextarea = styled.textarea`
    display: block;
    resize: none;
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    border-width: 10px 1px 1px 1px;
    border-style: solid;
    font-family: monospace, consolas, courier;
    outline: none;
    padding: 5px 10px;
    font-size: 12px;
    line-height: 20px;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const AddButton = styled(LargeIconButton)`
    background-image: url(${ok});
    :hover{
        background-image: url(${okHover});
    }
`;
