import React, { Component, createRef } from 'react';
import { observer } from 'mobx-react';
import { stage_wrapper, grid, axis, equation_canvas } from './Stage.css';
import { deviceRatio, parameterEquation } from '../utilities';

console.log('deviceRatio', deviceRatio);

export default observer(class Stage extends Component {

  constructor(props) {
    super(props);
    this.deviceRatio = Stage.getDeviceRatio();
    this.equations = {};

    this.props.equations.redraw = () => {
      console.log('redraw >>>>>>>>>');
      const { stage, equations } = this.props;
      const { pushEquationsMatrix, equationsMatrix } = equations;
      const { isSmooth } = this.props.states;
      const { zoom, rangeX, rangeY, originX, originY } = stage;

      const gridContext = this.refs.grid.getContext('2d');
      const axisContext = this.refs.axis.getContext('2d');

      this.erasure(gridContext);
      this.erasure(axisContext);

      this.drawGrid(gridContext);
      this.drawAxis(axisContext);

      const result = parameterEquation({
        rangeX,
        rangeY,
        literal: 'y=Math.sin(x)',
        offsetX: originX,
        offsetY: originY,
        zoom,
        isSmooth,
        VAR_X: 'x'
      });
      pushEquationsMatrix({
        id: 1,
        matrix: result
      });

      equationsMatrix.map(equation => {
        if (this.equations[equation.id]) {
          const context = this.equations[equation.id].getContext('2d');
          this.erasure(context);
          this.drawEquation(context, equation.matrix);
        }
      });
    };
  }

  componentDidMount() {
    // this.props.equations.redraw();
  }

  componentWillReceiveProps(props) {
    // const { stage, equations } = props;
    // console.log('componentWillReceiveProps', stage.zoom, this.props.stage.zoom);
    // if (stage.zoom !== this.props.stage.zoom) {
    //   this.props.equations.triggerRedraw();
    // }
  }

  componentDidUpdate() {

    // console.log('componentDidUpdate');
  }

  erasure(context) {
    const { width, height } = this.props.stage;
    context.clearRect(0, 0, width * deviceRatio, height * deviceRatio);
  }

  drawGrid(context) {
    const { originX, originY, width, height, zoom } = this.props.stage;

    context.beginPath();
    let x = originX * deviceRatio % zoom - zoom;
    let y = originY * deviceRatio % zoom - zoom;
    while (x < width * deviceRatio) {
      x += zoom;
      context.moveTo(x + 0.5, 0);
      context.lineTo(x + 0.5, height * deviceRatio);
    }
    while (y < height * deviceRatio) {
      y += zoom;
      context.moveTo(0, y + 0.5);
      context.lineTo(width * deviceRatio, y + 0.5);
    }
    context.strokeStyle = Stage.GRID_COLOR;
    context.stroke();
  }

  drawAxis(context) {
    const { originX, originY, width, height } = this.props.stage;

    context.beginPath();
    context.moveTo(0, Math.floor(originY * deviceRatio) + 0.5);
    context.lineTo(width * deviceRatio, Math.floor(originY * deviceRatio) + 0.5);
    context.moveTo(Math.floor(originX * deviceRatio) + 0.5, 0);
    context.lineTo(Math.floor(originX * deviceRatio) + 0.5, height * deviceRatio);

    context.strokeStyle = Stage.AXIS_COLOR;
    context.stroke();
  }

  drawEquation(context, matrix) {
    context.fillStyle = '#0f0';
    matrix.map(point => {
      context.fillRect(point[0] * deviceRatio, point[1] * deviceRatio, deviceRatio, deviceRatio);
    });
  }

  render() {
    const { stage, equations } = this.props;
    const { width, height, transformX, transformY, originX, originY, zoom } = stage;
    const { equationsMatrix } = equations;
    const style = { width: `${width}px`, height: `${height}px` };
    const transform = { transform: `translate(${transformX}px, ${transformY}px)` };

    return <div className={ stage_wrapper } style={ transform } data-zoom={ zoom } data-origin={ `[${originX},${originY}]` }>
      <canvas ref="grid" className={ grid } { ...{ style, width: width * deviceRatio, height: height * deviceRatio } }/>
      <canvas ref="axis" className={ axis } { ...{ style, width: width * deviceRatio, height: height * deviceRatio } }/>
      {
        equationsMatrix.map(equation => <canvas key={ equation.id } ref={ ele => this.equations[equation.id] = ele } className={ equation_canvas } { ...{ style, width: width * deviceRatio, height: height * deviceRatio } }/>)
      }
    </div>
  }

  static GRID_COLOR = '#ddd';
  static AXIS_COLOR = '#000';

  static getDeviceRatio() {
    return window.devicePixelRatio || 1;
  }
});



