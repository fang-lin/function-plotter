import React from 'react';
import { observer } from 'mobx-react';
import { STOP_DRAG } from '../utilities';
import { view_panel, centered, smooth, smooth_off, coord, coord_off } from './ViewPanel.css';

const ViewPanel = observer(({ states, stage }) => {

  const { isSmooth, showCoord, switchSmooth, switchCoord } = states;
  const { updateOriginInCenter } = stage;
  const smoothText = `Smooth: ${isSmooth ? 'On' : 'Off'}`;
  const coordText = `Coord: ${showCoord ? 'On' : 'Off'}`;

  return <div className={ view_panel }>
    <button className={ centered }
            title="Centered"
            onClick={ updateOriginInCenter }
            { ...STOP_DRAG }>
      Centered
    </button>
    <button className={ isSmooth ? smooth : smooth_off }
            title={ smoothText }
            onClick={ switchSmooth }
            { ...STOP_DRAG }>
      { smoothText }
    </button>
    <button className={ showCoord ? coord : coord_off }
            title={ coordText }
            onClick={ switchCoord }
            { ...STOP_DRAG }>
      { coordText }
    </button>
  </div>
});

export default ViewPanel;
