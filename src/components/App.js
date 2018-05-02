import React, { Component, createRef } from 'react';
import { observer } from "mobx-react"
import { app } from './App.css';
import Canvas from './Canvas';
import StateBar from './StateBar';
import ViewPanel from './ViewPanel';
import ZoomPanel from './ZoomPanel';
import { axis, canvases, grid } from "./Canvas.css";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.app = createRef();
  }

  updateStageRect() {
    this.props.stage.updateStageRect(this.app.current.getBoundingClientRect());
  }

  componentDidMount() {
    this.updateStageRect();
    window.addEventListener('resize', () => this.updateStageRect());
    window.addEventListener(App.DRAG_EVENTS.start, () => {
      console.log('mousedown')
    });
    window.addEventListener(App.DRAG_EVENTS.move, () => {
      console.log('mousemove')
    });
    window.addEventListener(App.DRAG_EVENTS.end, () => {
      console.log('mouseup')
    });
  }

  render() {
    const { states, stage } = this.props;
    return <div id={ app } ref={ this.app }>
      <Canvas { ...{ stage } }/>
      <StateBar/>
      <ViewPanel { ...{ states } }/>
      <ZoomPanel/>
    </div>
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
