import React, { Component } from 'react';
import { observer } from 'mobx-react';
import values from 'lodash/values';
import { Pool } from 'threads';
import { stage_wrapper, grid, axis, equation_canvas } from './Stage.css';
import { deviceRatio } from '../utilities';

const pool = new Pool();

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

      this.erasure();
      this.drawGrid();
      this.drawAxis();

      equations.updateIsRedrawing(true);
      pool.run((input, done) => {
        const MIN_DELTA = 1e-7;
        const MAX_VALUE = 1e100;

        const MIN_CHORD = .9;
        const MAX_CHORD = 1.1;

        const MAX_ITERATION = 4294967296;
        const MAX_DELTA_RECOUNT = 1;


        function dxComputer(y, x, func, dx, zoom) {
          let count = 0;
          let lower = 0;
          let upper = NaN;
          // let k = dx % 2;
          let k = dx > 0 ? 1 : -1;
          do {
            const dy = func(x + dx) - y;
            const chord = (dx ** 2 + dy ** 2) ** 0.5;

            if (chord * zoom < MIN_CHORD) {
              lower = dx;
              if (isNaN(upper)) {
                dx *= 2;
              } else {
                dx += (upper - lower) / 2;
              }
            } else if (chord * zoom > MAX_CHORD) {
              upper = dx;
              dx -= (upper - lower) / 2;
            } else {
              break;
            }

            if (Math.abs(dx) < MIN_DELTA) {
              dx = k * MIN_DELTA;
              break;
            }

          } while (count++ < MAX_DELTA_RECOUNT);

          if (isNaN(dx)) {
            dx = k * MIN_DELTA;
          }

          return dx;
        }

        const parameterEquation = ({
                                     rangeX, rangeY, literal, offsetX,
                                     offsetY, zoom, isSmooth, VAR_X
                                   }) => {

          const MAX_DELTA = (MIN_CHORD + MAX_CHORD) / 2 / zoom;
          let px, py, matrix = [];

          const func = new Function(VAR_X, `return ${literal};`);

          let x = rangeX[0],
            y = func(x),
            dx = MAX_DELTA;

          let iterationTimes = 0,
            overflow = false,
            tx = NaN;

          do {
            if (isNaN(y) || Math.abs(y) >= MAX_VALUE || y < rangeY[0] || y > rangeY[1]) {

              if (!overflow && dx < 0) {
                // draw to negative direction
                x = tx;
                y = func(x);
                dx = dxComputer(y, x, func, dx, zoom);
                overflow = false;
              } else {
                dx = MAX_DELTA;
                overflow = true;
              }

              x += dx;
              y = func(x);

            } else {
              if (overflow) {
                // enter range first, reverse dx
                dx = -MAX_DELTA;
                // temporary recording x to tx
                tx = x;
              }
              overflow = false;

              px = offsetX + x * zoom;
              py = offsetY - y * zoom;

              const point = isSmooth ? [px, py] : [Math.round(px), Math.round(py)];
              point.time = Date.now();

              dx = dxComputer(y, x, func, dx, zoom);

              point.time = Date.now() - point.time;
              matrix.push(point);

              x += dx;
              y = func(x);
            }
          } while (x < rangeX[1] && iterationTimes++ < MAX_ITERATION);

          return matrix;
        };
        const result = parameterEquation(input);
        done(result);
      }).send(JSON.parse(JSON.stringify({
        rangeX,
        rangeY,
        literal: 'y=Math.sin(x)',
        offsetX: originX,
        offsetY: originY,
        zoom,
        isSmooth,
        VAR_X: 'x'
      }))).on('done', (result) => {
        equations.updateIsRedrawing(false);
        pushEquationsMatrix({
          id: 1,
          matrix: result
        });
        equationsMatrix.map(equation => {
          console.log(equation.id);
          if (this.equations[equation.id]) {
            const context = this.equations[equation.id].getContext('2d');
            this.drawEquation(context, equation.matrix);
          }
        });
      }).on('error', function (error) {
        console.error('Worker errored:', error);
      }).on('exit', function () {
        console.log('Worker has been terminated.');
      });


    };
  }

  erasure() {
    const { width, height } = this.props.stage;
    [this.refs.grid,
      this.refs.axis,
      ...values(this.equations)].map(dom => {
      dom.getContext('2d').clearRect(0, 0, width * deviceRatio, height * deviceRatio);
    });
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



