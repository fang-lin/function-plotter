import styled from 'styled-components';
import cancelIcon from '../../images/icons/cancel.png';
import {transitionDuration} from './index';
import {device} from '../../pages/Home/styles';

export const DialogMask = styled.div<{ appearance: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .3);
  transition: all ${transitionDuration}ms;
  opacity: ${({appearance}): string => appearance ? '1' : '0'};
`;

export const DialogBackground = styled.div`
  cursor: auto;
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  overflow: auto;
`;

export const DialogWrapper = styled.div<{ appearance: boolean }>`
  padding: 20px 0 0 0;
  background: #eee;
  border-radius: 8px;
  border: solid 1px #666;
  box-shadow: 0 10px 30px rgba(0, 0, 0, .7);
  opacity: ${({appearance}): string => appearance ? '1' : '0'};
  transition: opacity ${transitionDuration}ms ease-in-out, transform ${transitionDuration}ms cubic-bezier(0.5, 0, 0.27, 1.55);
  transform: ${({appearance}): string => appearance ? 'scale(1)' : 'scale(.5)'};
  cursor: auto;
  width: 100%;
  box-sizing: border-box;
  @media ${device.tablet} {
    width: auto;
  }
`;

export const DialogInner = styled.div`
  font-size: 12px;
  line-height: 18px;
  padding: 30px 0;
  @media ${device.tablet} {
    padding: 30px;
  }
`;

export const TitleBar = styled.div`
  background-color: #ccc;
  border-width: 1px 0;
  border-style: solid;
  border-color: #666;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.h3`
  color: #333;
  font-size: 14px;
  line-height: 14px;
  text-shadow: 0 1px 1px rgba(255, 255, 255, .7);
  margin: 0 15px 0 0;
  padding: 0;
`;

const BaseIconButton = styled.button`
  font-size: 0;
  line-height: 0;
  padding: 0;
  cursor: pointer;
  color: transparent;
  outline: none;
  background-color: transparent;
  background-size: contain;
  background-repeat: no-repeat;
  border: medium none;
  transition: all .1s ease;
  &:hover {
    transform: scale(1.1);
    filter: brightness(1.1) drop-shadow(0 1px 1px rgba(0, 0, 0, .5));
  }
`;

export const BaseButton = styled.button`
  cursor: pointer;
  font-family: 'Fira Code', monospace, consolas, courier;
  outline: none;
  border: solid 1px #666;
  background-position: -1px -1px;
  background-color: #ccc;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .3);
  border-radius: 4px;
  color: #333;
  font-size: 14px;
  line-height: 14px;
  text-shadow: 0 1px 1px rgba(255, 255, 255, .7);
  padding: 10px 20px;

  :hover {
    background-color: #666;
    color: #fff;
    text-shadow: 0 1px 1px rgba(0, 0, 0, .7);
  }
`;

export const SmallIconButton = styled(BaseIconButton)`
  height: 24px;
  width: 24px;
`;

export const LargeIconButton = styled(BaseIconButton)`
  width: 32px;
  height: 32px;
  margin: 5px;
`;

export const Close = styled(SmallIconButton)`
  background-image: url(${cancelIcon});
`;
