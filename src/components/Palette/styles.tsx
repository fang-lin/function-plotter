import styled from 'styled-components';
import {Size} from '../../pages/Plotter';
import {device} from '../../pages/Home/styles';

export const PaletteWrapper = styled.div<{
    size: Size;
}>`
  cursor: pointer;
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
  width: 320px;
  height: 160px;
  @media ${device.tablet} {
    width: 640px;
    height: 80px;
  }
`;

export const Color = styled.a`
  display: block;
  width: 10px;
  height: 10px;
  box-sizing: border-box;
  font-size: 0;
  line-height: 0;
  color: transparent;

  :hover {
    position: relative;
    width: 18px;
    height: 18px;
    margin: -4px;
    box-shadow: 0 2px 4px 0 rgb(0, 0, 0, .7);
    border: solid 1px #eee;
  }
`;
