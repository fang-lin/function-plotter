import styled  from 'styled-components';
import ok from '../images/ok.png';
import okHover from '../images/ok-hover.png';
import {LargeIconButton} from './Dialog.style';

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

export const AddButton = styled(LargeIconButton)`
    background-image: url(${ok});
    :hover{
        background-image: url(${okHover});
    }
`;
