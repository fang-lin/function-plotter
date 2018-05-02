import React from 'react';
import { observer } from 'mobx-react';
import { view_panel, centered, smooth, smooth_off, coord, coord_off } from './ViewPanel.css';

const ViewPanel = observer(props => {
  const { states } = props;
  const { isSmooth, showCoord, switchSmooth, switchCoord } = states;
  const smoothText = `Smooth: ${isSmooth ? 'On' : 'Off'}`;
  const coordText = `Coord: ${showCoord ? 'On' : 'Off'}`;

  return <div className={ view_panel }>
    <button className={ centered } title="Centered">Centered</button>
    <button className={ isSmooth ? smooth : smooth_off } title={ smoothText } onClick={ switchSmooth }>{ smoothText }</button>
    <button className={ showCoord ? coord : coord_off } title={ coordText } onClick={ switchCoord }>{ coordText }</button>
  </div>
});

export default ViewPanel;
