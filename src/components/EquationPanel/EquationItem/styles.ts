import styled from 'styled-components';
import forbiddenIcon from '../../../images/forbidden.png';
import eyesIcon from '../../../images/eyes.png';
import pencilIcon from '../../../images/pencil.png';
import cancelIcon from '../../../images/cancel.png';
import {SmallIconButton} from '../../Dialog/styles';

export const DisplayEquationIcon = styled.span<{
    displayed: boolean;
}>`
  display: block;
  height: 24px;
  width: 24px;
  background-size: contain;
  background-image: url(${({displayed}): string => displayed ? eyesIcon : forbiddenIcon});
  background-repeat: no-repeat;
  transition: all .1s ease;
`;

export const DisplayEquationButton = styled.button<{
    displayed: boolean;
}>`
  margin: 0;
  padding: 4px 6px;
  cursor: pointer;
  border: medium none;
  outline: none;
  align-self: stretch;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover ${DisplayEquationIcon} {
    transform: scale(1.1);
    filter: brightness(1.1) drop-shadow(0 1px 1px rgba(0, 0, 0, .5));
  }
`;

export const EditButton = styled(SmallIconButton)`
  background-image: url(${pencilIcon});
`;

export const RemoveButton = styled(SmallIconButton)`
  background-image: url(${cancelIcon});
`;

export const EditButtonWrapper = styled.div`
  gap: 4px;
  position: absolute;
  right: 0;
  top: 0;
  display: none;
  align-items: center;
  background-color: #eee;
  padding: 4px;
  border-width: 0 0 1px 1px;
  border-color: #666;
  border-style: solid;
  border-radius: 0 0 0 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .3);
`;

export const EquationItemWrapper = styled.li<{ selected: boolean }>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  background-color: ${({selected}): string => selected ? '#ddd' : '#fff'};

  :hover ${EditButtonWrapper} {
    display: flex;
  }
`;

export const EquationTextWrapper = styled.div<{ displayed: boolean }>`
  flex: auto;
  font-size: 12px;
  line-height: 16px;
  padding: 0 10px;
  word-break: break-all;

  ${({displayed}): string => displayed ? '' : 'text-decoration: line-through;'}
  p {
    margin: 5px 0;
  }
`;
