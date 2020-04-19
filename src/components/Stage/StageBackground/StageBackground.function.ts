import {Coordinate, Size} from '../../App/App.function';
import {deviceRatio} from '../../../helpers/deviceRatio';

export function redrawAxis(context: CanvasRenderingContext2D, origin: Coordinate, size: Size, scale: number, color: string): void {
    const x = Math.floor((size[0] / 2 + origin[0] * scale) * deviceRatio) - 1;
    const y = Math.floor((size[1] / 2 + origin[1] * scale) * deviceRatio) - 1;
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(size[0] * deviceRatio, y);
    context.moveTo(x, 0);
    context.lineTo(x, size[1] * deviceRatio);
    context.lineWidth = 2;
    context.strokeStyle = color;
    context.stroke();
    context.closePath();
}

export function redrawGrid(context: CanvasRenderingContext2D, origin: Coordinate, size: Size, scale: number, color: string): void {
    context.beginPath();
    let x = (size[0] / 2 + origin[0] * scale) % scale;
    let y = (size[1] / 2 + origin[1] * scale) % scale;
    while (x < size[0] * deviceRatio) {
        context.moveTo(x * deviceRatio, 0);
        context.lineTo(x * deviceRatio, size[1] * deviceRatio);
        x += scale;
    }
    while (y < size[1] * deviceRatio) {
        context.moveTo(0, y * deviceRatio);
        context.lineTo(size[0] * deviceRatio, y * deviceRatio);
        y += scale;
    }
    context.lineWidth = 1;
    context.strokeStyle = color;
    context.stroke();
}
