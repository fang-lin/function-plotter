import styled from 'styled-components';
import add from '../images/add.png';
import cross from '../images/cross.png';
import crossHover from '../images/cross-hover.png';
import addHover from '../images/add-hover.png';

export const EquationFormBackground = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
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

export const Close = styled.a`
    width: 16px;
    height: 16px;
    display: block;
    background-image: url(${cross});
    background-size: 16px 16px;
    cursor: pointer;
    &:hover{
        background-image: url(${crossHover});
    }
`;

export const Textarea = styled.textarea`
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
    font-size: 14px;
    line-height: 20px;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 0 -10px;
`;

export const Button = styled.button`
    margin: 0 10px;
    background-color: #ccc;
    color: #333;
    font-weight: bold;
    text-shadow: 0 1px 1px rgba(255,255,255,.7);
    font-family: monospace, consolas, courier;
    padding: 5px 20px;
    outline: none;
    line-height: 20px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    border: solid 1px #666;
    &:hover{
        color: #fff;
        background-color: #666;
        text-shadow: 0 1px 1px rgba(0,0,0,.7);
    }
`;

// export const AddButton = styled.button`
//
//     width: 16px;
//     height: 16px;
// `;
