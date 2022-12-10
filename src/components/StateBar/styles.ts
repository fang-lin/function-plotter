import styled from 'styled-components';
import minimizeIcon from '../../images/icons/minimize.png';
import maximizeIcon from '../../images/icons/maximize.png';
import {SmallIconButton} from '../Dialog/styles';

export const StateBarWrapper = styled.div<{
    expandStateBar: boolean;
}>`
  cursor: auto;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 12px;
  font-weight: normal;
  margin: 0;
  padding: 10px 20px;
  background-color: #eee;
  border-radius: 0 0 4px 0;
  border-style: solid;
  border-color: #666;
  border-width: 0 1px 1px 0;
  box-shadow: 0 5px 20px rgba(0, 0, 0, .7);
  transition: all .2s ease-in-out;
  ${({expandStateBar}): string => expandStateBar ? '' :
        'transform: translateX(-100%) translateX(24px) translateY(-100%) translateY(24px);'}
`;
export const AppTitle = styled.h1`
  margin: 5px 0;
  font-size: 14px;
  line-height: 14px;

  a {
    text-decoration: none;
    color: #333;
    text-shadow: 0 1px 1px rgba(255, 255, 255, .7);
  }
`;
export const CoordinateLabel = styled.div`
  margin: 5px 0;
`;

export const IsDrawing = styled.div<{ redrawing: boolean }>`
  margin: 5px 0;
  transition: all .3s;
  opacity: ${({redrawing}): string => redrawing ? '1' : '0'};
`;

export const ExpandToggle = styled(SmallIconButton)<{
    expandStateBar: boolean;
}>`
  position: absolute;
  right: -6px;
  bottom: -6px;
  background-image: url(${({expandStateBar}): string => expandStateBar ? minimizeIcon : maximizeIcon});
`;
