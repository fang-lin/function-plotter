import React from 'react';
import { zoom_panel, zoom_in, zoom_out, zoom_level } from './ZoomPanel.css';
import { version } from '../../package.json';

const ZoomPanel = props => (
  <div className={ zoom_panel }>
    <button className={ zoom_in } title="Zoom In">Zoom In</button>
    <button className={ zoom_out } title="Zoom Out">Zoom Out</button>
    <button className={ zoom_level } title="x7">x7</button>
  </div>
);

export default ZoomPanel;
