import styled from 'styled-components';
import ok from '../images/ok.png';
import okHover from '../images/ok-hover.png';
import {LargeIconButton} from './Dialog.style';
import {device} from './App.style';

export const EquationTextarea = styled.textarea`
    display: block;
    resize: none;
    box-sizing: border-box;
    border-width: 10px 1px 1px 1px;
    border-style: solid;
    font-family: monospace, consolas, courier;
    outline: none;
    padding: 5px 10px;
    font-size: 12px;
    line-height: 20px;
    width: 320px;
    height: 100px;
    margin: 0 auto;
    @media ${device.tablet} { 
        width: 640px;
    }
`;

export const AddButton = styled(LargeIconButton)`
    background-image: url(${ok});
    :hover{
        background-image: url(${okHover});
    }
`;

export const ErrorLabel = styled.div`
    width: 290px;
    @media ${device.tablet} { 
        width: 610px;
    }
`;

export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 320px;
    margin: 0 auto;
    @media ${device.tablet} { 
        width: 640px;
    }
`;
