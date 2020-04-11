import {Coordinate, Size} from '../App/App.function';
import {deviceRatio} from '../../helpers/deviceRatio';

export const gridColor = 'rgba(0, 0, 0, .3)';
export const axisColor = 'rgb(0, 0, 0)';

export function withCanvasContext<T = void>(canvas: HTMLCanvasElement | null, withContext: (context: CanvasRenderingContext2D) => T): T | void {
    const context = canvas?.getContext('2d');
    if (context) {
        return withContext(context);
    }
}

export const erasure = (context: CanvasRenderingContext2D, size: Size): void => {
    context.clearRect(0, 0, size[0] * deviceRatio, size[1] * deviceRatio);
};

export const drawEquation = (context: CanvasRenderingContext2D, matrix: Coordinate[], isBold: boolean, color: string): void => {
    context.fillStyle = color;
    if (isBold) {
        matrix.map(point => {
            context.fillRect(
                point[0] * deviceRatio - deviceRatio,
                point[1] * deviceRatio - deviceRatio,
                deviceRatio * 2,
                deviceRatio * 2
            );
        });
    } else {
        matrix.map(point => {
            context.fillRect(point[0] * deviceRatio, point[1] * deviceRatio, deviceRatio, deviceRatio);
        });
    }
    context.stroke();
};
