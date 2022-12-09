import styled from 'styled-components';
import forbiddenIcon from '../../../images/icons/forbidden.png';
import eyesIcon from '../../../images/icons/eyes.png';
import pencilIcon from '../../../images/icons/pencil.png';
import cancelIcon from '../../../images/icons/cancel.png';
import {SmallIconButton} from '../../Dialog/styles';

export const DisplayEquationButton = styled.button<{
    displayed: boolean;
}>`
  margin: -4px 0;
  cursor: pointer;
  font-size: 0;
  line-height: 0;
  display: block;
  border: medium none;
  outline: none;
  padding: 0;
  align-self: stretch;
  flex: none;
  width: 36px;
  background-size: 24px 24px;
  background-image: url(${({displayed}): string => displayed ? eyesIcon : forbiddenIcon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
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
  padding: 4px 4px 4px 0;
  background-color: ${({selected}): string => selected ? '#ddd' : '#fff'};
  border-top: #666 solid 1px;
  &:hover ${EditButtonWrapper} {
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
