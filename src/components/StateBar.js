import React from 'react';
import { state_bar, title, draw_state, is_drawing } from './StateBar.css';
import { version } from '../../package.json';
import { observer } from 'mobx-react';

const StateBar = observer(({ equations: { isRedrawing } }) => {
  return (<h1 className={ state_bar }>
    <a className={ title } href="/">FuncDiagraph { version }</a>
    <span className={ `${draw_state} ${isRedrawing ? is_drawing : ''}` }>drawing...</span>
  </h1>)
});

export default StateBar;
