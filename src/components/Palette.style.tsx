import styled from 'styled-components';
import {Size} from './App.function';

export const PaletteWrapper = styled.div<{
    size: Size;
}>`
    cursor: pointer;
    margin: 20px 0;
    width: 640px;
    height: 80px;
    display: flex;
    flex-wrap: wrap;
`;

export const Color = styled.a`
    display: block;
    width: 10px;
    height: 10px;
    box-sizing: border-box;
    font-size: 0;
    line-height: 0;
    color: transparent;
    :hover{
        position: relative;
        width: 16px;
        height: 16px;
        margin: -3px;
        box-shadow: 0 3px 7px 1px rgba(0, 0, 0, .7);
    }
`;
