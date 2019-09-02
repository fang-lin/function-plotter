import React from 'react';
import { state_bar, title, draw_state, is_drawing, coordinate } from './StateBar.css';
import { version } from '../../package.json';
import { observer } from 'mobx-react';
import { deviceRatio } from '../services/utilities';

const StateBar = observer(({ equations: { isRedrawing }, stage: { originX, originY, zoom }, states: { cursorX, cursorY } }) => {
    const x = cursorX ? ((cursorX - originX) / zoom * deviceRatio).toFixed(2) : '--';
    const y = cursorY ? ((cursorY - originY) / zoom * deviceRatio).toFixed(2) : '--';
    return (<h1 className={ state_bar }>
        <div>
            <a className={ title } href="/">FuncDiagraph { version }</a>
            <span className={ `${draw_state} ${isRedrawing ? is_drawing : ''}` }>drawing...</span>
        </div>
        <div className={ coordinate }>
            { x }, { y }
        </div>
    </h1>);
});

export default StateBar;
