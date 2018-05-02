import React, { Component, createRef } from 'react';
import { app } from './App.css';
import Stage from './Stage';
import StateBar from './StateBar';
import ViewPanel from './ViewPanel';
import ZoomPanel from './ZoomPanel';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.app = createRef();
  }

  updateStageRect() {
    this.props.stage.updateStageRect(this.app.current.getBoundingClientRect());
  }

  onDragStart = event => {
    this.client = App.getClientXY(event);
    window.addEventListener(App.DRAG_EVENTS.move, this.onDragging);
  };

  onDragging = event => {
    const { clientX, clientY } = App.getClientXY(event);
    this.props.stage.updateTransform(clientX - this.client.clientX, clientY - this.client.clientY);
  };

  onDragEnd = event => {
    window.removeEventListener(App.DRAG_EVENTS.move, this.onDragging);
    this.props.stage.updateTransform(0, 0);
  };

  componentDidMount() {
    this.updateStageRect();
    window.addEventListener('resize', () => this.updateStageRect());
    window.addEventListener(App.DRAG_EVENTS.start, this.onDragStart);
    window.addEventListener(App.DRAG_EVENTS.end, this.onDragEnd);
  }

  render() {
    const { states, stage } = this.props;
    return <div id={ app } ref={ this.app }>
      <Stage { ...{ stage } }/>
      <StateBar/>
      <ViewPanel { ...{ states } }/>
      <ZoomPanel/>
    </div>
  }

  static getClientXY(event) {
    const { clientX, clientY } = event.changedTouches ? event.changedTouches[0] : event;
    return { clientX, clientY };
  }

  static isMobile() {
    try {
      document.createEvent('TouchEvent');
      return true;
    } catch (e) {
      return false;
    }
  }

  static DRAG_EVENTS = App.isMobile() ? {
    start: 'touchstart',
    move: 'touchmove',
    end: 'touchend'
  } : {
    start: 'mousedown',
    move: 'mousemove',
    end: 'mouseup'
  };
}
