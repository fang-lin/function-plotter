import React, { Component, createRef } from 'react';
import { observer } from 'mobx-react';
import { stage, grid, axis } from './Stage.css';

export default observer(class Stage extends Component {

  constructor(props) {
    super(props);
    this.deviceRatio = Stage.getDeviceRatio();
    this.grid = createRef();
    this.axis = createRef();
  }

  componentDidUpdate() {

    this.props.stage.setOriginInCenter();
    this.drawGrid(this.grid.current.getContext('2d'));
    this.drawAxis(this.axis.current.getContext('2d'));
  }

  drawGrid(context) {
    const { originX, originY, deviceRatioWidth, deviceRatioHeight } = this.props.stage;

    const zoom = 64;

    context.beginPath();
    let x = originX % zoom - zoom;
    let y = originY % zoom - zoom;
    while (x < deviceRatioWidth) {
      x += zoom;
      context.moveTo(x + 0.5, 0);
      context.lineTo(x + 0.5, deviceRatioHeight);
    }
    while (y < deviceRatioHeight) {
      y += zoom;
      context.moveTo(0, y + 0.5);
      context.lineTo(deviceRatioWidth, y + 0.5);
    }
    context.strokeStyle = Stage.GRID_COLOR;
    context.stroke();
  }

  drawAxis(context) {
    const { originX, originY, deviceRatioWidth, deviceRatioHeight } = this.props.stage;

    context.beginPath();
    context.moveTo(0, Math.floor(originY) + 0.5);
    context.lineTo(deviceRatioWidth, Math.floor(originY) + 0.5);
    context.moveTo(Math.floor(originX) + 0.5, 0);
    context.lineTo(Math.floor(originX) + 0.5, deviceRatioHeight);

    context.strokeStyle = Stage.AXIS_COLOR;
    context.stroke();
  }

  render() {
    const { width, height, deviceRatioWidth, deviceRatioHeight, transformX, transformY } = this.props.stage;
    const style = { width: `${width}px`, height: `${height}px` };
    const transform = { transform: `translate(${transformX}px, ${transformY}px)` };

    return <div className={ stage } style={ transform }>
      <canvas ref={ this.grid } className={ grid } { ...{ style, width: deviceRatioWidth, height: deviceRatioHeight } }/>
      <canvas ref={ this.axis } className={ axis } { ...{ style, width: deviceRatioWidth, height: deviceRatioHeight } }/>
    </div>
  }


  static GRID_COLOR = '#ddd';
  static AXIS_COLOR = '#000';

  static getDeviceRatio() {
    return window.devicePixelRatio || 1;
  }
});
