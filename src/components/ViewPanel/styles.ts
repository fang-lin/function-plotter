import styled from 'styled-components';
import targetIcon from '../../images/icons/target.png';
import penIcon from '../../images/icons/pen.png';
import markerIcon from '../../images/icons/marker.png';
import focusPointIcon from '../../images/icons/focus-point.png';
import crosshairIcon from '../../images/icons/crosshair.png';
import pixelatedIcon from '../../images/icons/pixelated.png';
import imageIcon from '../../images/icons/image.png';
import {LargeIconButton} from '../Dialog/styles';

export const ViewPanelWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  gap: 10px;
`;

export const CenteredButton = styled(LargeIconButton)`
  background-image: url(${targetIcon});
`;

export const SmoothButton = styled(LargeIconButton)<{ isSmooth: boolean }>`
  background-image: url(${({isSmooth}): string => isSmooth ? imageIcon : pixelatedIcon});
`;

export const WeightButton = styled(LargeIconButton)<{ isBold: boolean }>`
  background-image: url(${({isBold}): string => isBold ? markerIcon : penIcon});
`;

export const CoordinateButton = styled(LargeIconButton)<{ showCoordinate: boolean }>`
  background-image: url(${({showCoordinate}): string => showCoordinate ? crosshairIcon : focusPointIcon});
`;
