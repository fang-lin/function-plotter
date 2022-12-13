import styled from 'styled-components';
import checkedIcon from '../../images/checked.png';
import {device} from '../../pages/Home/styles';
import {BaseButton, BaseButtonIcon} from '../Dialog/styles';

export const EquationTextarea = styled.textarea`
  display: block;
  resize: none;
  box-sizing: border-box;
  border-width: 10px 1px 1px 1px;
  border-style: solid;
  font-family: 'Fira Code', monospace, consolas, courier;
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

export const AddButtonIcon = styled(BaseButtonIcon)`
  background-image: url(${checkedIcon});
`;

export const AddButton = styled(BaseButton)`
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
