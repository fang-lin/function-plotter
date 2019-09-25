import styled from 'styled-components';

export const PaletteWrapper = styled.div`
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    z-index: 1000;
    width: 640px;
    top: 0;
    a{
        width: 10px;
        height: 10px;
        font-size: 0;
        line-height: 0;
        cursor: pointer;
        &:hover{
            border: solid 1px #fff;
            width: 8px;
            height: 8px;
        }
    }
`;
