import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { stage_wrapper, grid, axis, equation_canvas } from './Stage.css';
import arithmetic from '../services/arithmetic';
import { deviceRatio } from '../services/utilities';

export default observer(class Stage extends Component {

  constructor(props) {
    super(props);
    this.deviceRatio = Stage.getDeviceRatio();
    this.equations = {};

    this.props.equations.redraw = () => {
      const { stage, equations } = this.props;
      const { pushEquationsMatrix, equationsMatrix } = equations;
      const { isSmooth } = this.props.states;
      const { zoom, rangeX, rangeY, originX, originY } = stage;

      this.erasure(this.refs.grid.getContext('2d'));
      this.erasure(this.refs.axis.getContext('2d'));

      this.drawGrid();
      this.drawAxis();

      equations.updateIsRedrawing(true);
      arithmetic({
        rangeX,
        rangeY,
        literal: 'y=Math.sin(x)',
        offsetX: originX,
        offsetY: originY,
        zoom,
        isSmooth,
        VAR_X: 'x'
      }, result => {
        equations.updateIsRedrawing(false);
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
      });
    };
  }

  erasure(context) {
    const { width, height } = this.props.stage;
    context.clearRect(0, 0, width * deviceRatio, height * deviceRatio);
  }


  drawGrid() {
    const context = this.refs.grid.getContext('2d');
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

  drawAxis() {
    const context = this.refs.axis.getContext('2d');
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



