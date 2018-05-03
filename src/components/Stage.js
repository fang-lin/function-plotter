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

    const gridContext = this.grid.current.getContext('2d');
    const axisContext = this.axis.current.getContext('2d');

    this.erasure(gridContext);
    this.erasure(axisContext);

    this.drawGrid(gridContext);
    this.drawAxis(axisContext);
  }

  erasure(context) {
    const { deviceRatioWidth, deviceRatioHeight } = this.props.stage;
    context.clearRect(0, 0, deviceRatioWidth, deviceRatioHeight);
  }

  drawGrid(context) {
    const { originX, originY, deviceRatioWidth, deviceRatioHeight, zoom } = this.props.stage;
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
    const { width, height, deviceRatioWidth, deviceRatioHeight, transformX, transformY, originX, originY, zoom } = this.props.stage;
    const style = { width: `${width}px`, height: `${height}px` };
    const transform = { transform: `translate(${transformX}px, ${transformY}px)` };

    return <div className={ stage } style={ transform } data-zoom={ zoom } data-origin={ `[${originX},${originY}]` }>
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



