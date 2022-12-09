import styled, {createGlobalStyle} from 'styled-components';
import compassIcon from '../../images/icons/compass.png';

export const DrawingWrapper = styled.div<{ redrawing: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: ${({redrawing}): string => redrawing ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: rgba(255, 255, 255, .3);
`;

export const DrawingBackground = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: white;
  box-shadow: 0 0 80px 80px white;
`;

export const KeyframesStyle = createGlobalStyle`
  @keyframes rotate-icon {
    50% {
      transform: rotateY(180deg);
    }
  }
`;

export const DrawingIcon = styled.div`
  height: 64px;
  width: 64px;
  background-size: contain;
  background-image: url(${compassIcon});
  animation: rotate-icon 2.8s infinite;
`;

export const Text = styled.p`
  height: 24px;
  font-size: 16px;
  margin: 10px 0 0 0;
  font-weight: bold;
  color: #333;
  user-select: none;
`;
