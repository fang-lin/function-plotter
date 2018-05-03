import React from 'react';
import { observer } from 'mobx-react';
import { zoom_panel, zoom_in, zoom_out, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12, x13, x14, x15, x16 } from './ZoomPanel.css';
import { version } from '../../package.json';

const zoomLevels = [x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12, x13, x14, x15, x16];

const ZoomPanel = observer(props => {
  const { updateZoom, zoomLevel } = props.stage;
  return (
    <div className={ zoom_panel }>
      <button className={ zoom_in } title="Zoom In" onClick={ () => updateZoom(zoomLevel + 1) }>Zoom In</button>
      <button className={ zoom_out } title="Zoom Out" onClick={ () => updateZoom(zoomLevel - 1) }>Zoom Out</button>
      <button className={ zoomLevels[zoomLevel - 1] } title={ `x${zoomLevel}` }>{ `x${zoomLevel}` }</button>
    </div>
  );
});

export default ZoomPanel;
