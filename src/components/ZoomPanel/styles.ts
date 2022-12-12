import styled from 'styled-components';
import zoomInIcon from '../../images/icons/zoom-in.png';
import zoomOutIcon from '../../images/icons/zoom-out.png';
import {LargeIconButton} from '../Dialog/styles';
import n1 from '../../images/icons/1.png';
import n2 from '../../images/icons/2.png';
import n3 from '../../images/icons/3.png';
import n4 from '../../images/icons/4.png';
import n5 from '../../images/icons/5.png';
import n6 from '../../images/icons/6.png';
import n7 from '../../images/icons/7.png';
import n8 from '../../images/icons/8.png';
import n9 from '../../images/icons/9.png';
import n10 from '../../images/icons/10.png';
import n11 from '../../images/icons/11.png';
import n12 from '../../images/icons/12.png';
import n13 from '../../images/icons/13.png';
import n14 from '../../images/icons/14.png';
import n15 from '../../images/icons/15.png';
import n16 from '../../images/icons/16.png';
import n17 from '../../images/icons/17.png';
import n18 from '../../images/icons/18.png';
import n19 from '../../images/icons/19.png';
import n20 from '../../images/icons/20.png';
import n21 from '../../images/icons/21.png';
import n22 from '../../images/icons/22.png';
import n23 from '../../images/icons/23.png';
import n24 from '../../images/icons/24.png';

const levels = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12, n13, n14, n15, n16, n17, n18, n19, n20, n21, n22, n23, n24];

export const ZoomPanelWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const ZoomInButton = styled(LargeIconButton)`
  background-image: url(${zoomInIcon});
`;

export const ZoomOutButton = styled(LargeIconButton)`
  background-image: url(${zoomOutIcon});
`;

export const ZoomLevelButton = styled(LargeIconButton)<{ scaleLevel: number }>`
  background-image: url(${({scaleLevel}): string => levels[scaleLevel - 1]});
`;
