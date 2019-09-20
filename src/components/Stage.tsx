import React, {Component, createRef, RefObject} from 'react';
import {pick} from 'lodash';
import {arithmetic} from '../services/arithmetic';
import {Coordinate, deviceRatio, getDeviceRatio} from '../services/utilities';
import {Equations as StoreEquations} from '../stores/Equations';
import {Stage as StoreStage} from '../stores/Stage';
import {
    StageWrapper,
    Canvas
} from './Stage.style';

interface StageProps {
    stage: StoreStage;
    equations: StoreEquations;
}

interface StageState {

}

export class Stage extends Component<StageProps, StageState> {
    gridRef: RefObject<HTMLCanvasElement> = createRef();
    axisRef: RefObject<HTMLCanvasElement> = createRef();
    equationRefs: RefObject<HTMLCanvasElement>[] = [];

    deviceRatio: number = getDeviceRatio();

    constructor(props: StageProps) {
        super(props);
        // this.equations = {};

        this.equationRefs.push(createRef());

        const {equations, stage} = this.props;
        this.props.stage.updateOriginInCenter();

        this.props.stage.setRedraw(() => {
            this.redrawGrid();
            this.redrawAxis();
        });

        this.props.equations.setRedraw(() => {
            const {rangeX, rangeY, origin, zoom, isSmooth} = stage;
            equations.updateIsRedrawing(true);
            arithmetic({
                rangeX,
                rangeY,
                fx: 'x',
                offset: origin,
                zoom,
                isSmooth,
            }, (matrix: Coordinate[]) => {
                equations.updateIsRedrawing(false);

                if (this.equationRefs[0].current) {
                    this.drawEquation(0, matrix);
                }
            });
        });
    }

    erasure(context: CanvasRenderingContext2D | null): void {
        if (context) {
            const {size} = this.props.stage;
            context.clearRect(0, 0, size[0] * deviceRatio, size[1] * deviceRatio);
        }
    }

    redrawGrid(): void {
        if (this.gridRef.current) {
            const context = this.gridRef.current.getContext('2d');
            if (context) {
                this.erasure(context);
                const {origin, size, zoom} = this.props.stage;

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

    redrawAxis(): void {
        if (this.axisRef.current) {
            const context = this.axisRef.current.getContext('2d');
            if (context) {
                this.erasure(context);
                const {origin, size} = this.props.stage;

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

    drawEquation(id: number, matrix: Coordinate[]): void {
        const current = this.equationRefs[id].current;
        if (current) {
            const context = current.getContext('2d');
            if (context) {
                this.erasure(context);
                context.fillStyle = '#0f0';
                matrix.map(point => {
                    context.fillRect(point[0] * deviceRatio, point[1] * deviceRatio, deviceRatio, deviceRatio);
                });
            }
        }

    }

    render() {
        const {stage, equations} = this.props;
        const {size, transform, origin} = stage;
        const {equationsMatrix} = equations;
        const sizingAttr = {
            width: size[0] * deviceRatio,
            height: size[1] * deviceRatio
        };
        const sizing = {
            width: `${size[0]}px`,
            height: `${size[1]}px`,
        };
        const moving = {transform: `translate(${transform[0]}px, ${transform[1]}px)`};

        return <StageWrapper style={moving}>
            <Canvas ref={this.gridRef} style={sizing} {...sizingAttr}/>
            <Canvas ref={this.axisRef} style={sizing} {...sizingAttr}/>
            {
                this.equationRefs.map((equationRef, index) => (
                    <Canvas
                        key={index}
                        ref={equationRef}
                        style={sizing} {...sizingAttr}/>
                ))
            }
        </StageWrapper>;
    }

    static GRID_COLOR = '#ddd';
    static AXIS_COLOR = '#000';
}


