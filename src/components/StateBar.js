import React from 'react';
import { state_bar, title, draw_state } from './StateBar.css';
import { version } from '../../package.json';

const StateBar = props => (<h1 className={ state_bar }>
  <a className={ title } href="/">FuncDiagraph { version }</a>
  <span className={ draw_state }>drawing...</span>
</h1>);

export default StateBar;
