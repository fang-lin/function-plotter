import React, {Component, createRef, RefObject} from 'react';
// @ts-ignore
import arithmetic from '../services/arithmetic';
import {deviceRatio, getDeviceRatio} from '../services/utilities';
import {Equations as StoreEquations} from "../stores/Equations";
import {Stage as StoreStage} from "../stores/Stage";
import {Preferences as StorePreferences} from "../stores/Preferences";
import {Coordinate, InjectedAppProps} from "./App";
import {
    StageWrapper,
    GridCanvas,
    AxisCanvas,
    EquationCanvas
} from './Stage.style';
import {inject, observer} from "mobx-react";

interface StageProps {
    stage: StoreStage;
    equations: StoreEquations;
    preferences: StorePreferences;
}

interface StageState {

}

@inject('stage', 'preferences', 'equations')
@observer
export class Stage extends Component<{}, StageState> {
    gridRef: RefObject<HTMLCanvasElement> = createRef();
    axisRef: RefObject<HTMLCanvasElement> = createRef();

    deviceRatio: number;
    equations: any;

    constructor(props: {}) {
        super(props);
        this.deviceRatio = getDeviceRatio();
        this.equations = {};

        this.store.equations.redraw = () => {
            const {stage, equations} = this.store;
            const {pushEquationsMatrix, equationsMatrix} = equations;
            const {isSmooth} = this.store.preferences;
            const {zoom, rangeX, rangeY, origin} = stage;
            if (this.gridRef.current) {
                this.erasure(this.gridRef.current.getContext('2d'));
            }
            if (this.axisRef.current) {
                this.erasure(this.axisRef.current.getContext('2d'));
            }

            this.drawGrid();
            this.drawAxis();

            equations.updateIsRedrawing(true);
            arithmetic({
                rangeX,
                rangeY,
                literal: 'y=Math.sin(x)',
                offsetX: origin[0],
                offsetY: origin[1],
                zoom,
                isSmooth,
                VAR_X: 'x'
            }, (result: Coordinate[]) => {
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

    get store() {
        return this.props as StageProps;
    }

    erasure(context: CanvasRenderingContext2D | null): void {
        if (context) {
            const {size} = this.store.stage;
            context.clearRect(0, 0, size[0] * deviceRatio, size[1] * deviceRatio);
        }
    }

    drawGrid(): void {
        if (this.gridRef.current) {
            const context = this.gridRef.current.getContext('2d');
            if (context) {
                const {origin, size, zoom} = this.store.stage;

                context.beginPath();
                let x = origin[0] * deviceRatio % zoom - zoom;
                let y = origin[1] * deviceRatio % zoom - zoom;
                while (x < size[0] * deviceRatio) {
                    x += zoom;
                    context.moveTo(x + 0.5, 0);
                    context.lineTo(x + 0.5, size[1] * deviceRatio);
                }
                while (y < size[1] * deviceRatio) {
                    y += zoom;
                    context.moveTo(0, y + 0.5);
                    context.lineTo(size[0] * deviceRatio, y + 0.5);
                }
                context.strokeStyle = Stage.GRID_COLOR;
                context.stroke();
            }
        }
    }

    drawAxis(): void {
        if (this.axisRef.current) {
            const context = this.axisRef.current.getContext('2d');
            if (context) {
                const {origin, size} = this.store.stage;

                context.beginPath();
                context.moveTo(0, Math.floor(origin[1] * deviceRatio) + 0.5);
                context.lineTo(size[0] * deviceRatio, Math.floor(origin[1] * deviceRatio) + 0.5);
                context.moveTo(Math.floor(origin[0] * deviceRatio) + 0.5, 0);
                context.lineTo(Math.floor(origin[0] * deviceRatio) + 0.5, size[1] * deviceRatio);

                context.strokeStyle = Stage.AXIS_COLOR;
                context.stroke();
            }
        }
    }

    drawEquation(context: CanvasRenderingContext2D | null, matrix: Coordinate[]): void {
        if (context) {
            context.fillStyle = '#0f0';
            matrix.map(point => {
                context.fillRect(point[0] * deviceRatio, point[1] * deviceRatio, deviceRatio, deviceRatio);
            });
        }
    }

    render() {
        const {stage, equations} = this.store;
        const {size, transform} = stage;
        const {equationsMatrix} = equations;
        const sizing = {
            width: size[0] * deviceRatio,
            height: size[1] * deviceRatio
        };

        return <StageWrapper transform={transform}>
            <GridCanvas ref={this.gridRef} size={size} {...sizing}/>
            <AxisCanvas ref={this.axisRef} size={size} {...sizing}/>
            {
                equationsMatrix.map(equation => (
                    <EquationCanvas key={equation.id} ref={ele => this.equations[equation.id] = ele}
                                    size={size} {...sizing}/>
                ))
            }
        </StageWrapper>;
    }

    static GRID_COLOR = '#ddd';
    static AXIS_COLOR = '#000';
}


