import React, { Component, createRef } from 'react';
import { observer } from 'mobx-react';
import { app } from './App.css';
import PreloadImages from './PreloadImages';
import Stage from './Stage';
import StateBar from './StateBar';
import CrossLine from './CrossLine';
import ViewPanel from './ViewPanel';
import ZoomPanel from './ZoomPanel';
import { deviceRatio, DRAG_EVENTS, getClientXY } from '../utilities';

export default observer(class App extends Component {

  constructor(props) {
    super(props);
    this.app = createRef();
  }

  updateStageRect() {
    this.props.stage.updateStageRect(this.app.current.getBoundingClientRect());
  }

  onDragStart = event => {
    this.client = getClientXY(event);
    window.addEventListener(DRAG_EVENTS.MOVE, this.onDragging);
  };

  onDragging = event => {
    const { clientX, clientY } = getClientXY(event);
    this.props.stage.updateTransform(clientX - this.client.clientX, clientY - this.client.clientY);
  };

  onDragEnd = event => {
    window.removeEventListener(DRAG_EVENTS.MOVE, this.onDragging);
    const { originX, originY } = this.props.stage;
    const { clientX, clientY } = getClientXY(event);
    this.props.stage.updateOrigin(
      originX + (clientX - this.client.clientX) * deviceRatio,
      originY + (clientY - this.client.clientY) * deviceRatio
    );
    this.props.stage.updateTransform(0, 0);
  };

  componentDidMount() {
    this.updateStageRect();

    const { originX, originY, updateOriginInCenter } = this.props.stage;
    const { updateCursor } = this.props.states;
    isNaN(originX) && isNaN(originY) && updateOriginInCenter();

    window.addEventListener('resize', () => this.updateStageRect());
    window.addEventListener(DRAG_EVENTS.START, this.onDragStart);
    window.addEventListener(DRAG_EVENTS.END, this.onDragEnd);

    window.addEventListener('mousemove', event => {
      const { clientX, clientY } = getClientXY(event);
      updateCursor(clientX, clientY);
    });
  }

  render() {
    const { states, stage } = this.props;
    const { showCoord } = states;
    return <div id={ app } ref={ this.app }>
      <PreloadImages/>
      <Stage { ...{ stage } }/>
      { showCoord && <CrossLine { ...{ states, stage } }/> }
      <StateBar/>
      <ViewPanel { ...{ states, stage } }/>
      <ZoomPanel { ...{ stage } }/>
    </div>
  }
});
