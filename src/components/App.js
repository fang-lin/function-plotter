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
}
