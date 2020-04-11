import {Coordinate, Size} from '../../App/App.function';
import {deviceRatio} from '../../../helpers/deviceRatio';

export function redrawCursor(context: CanvasRenderingContext2D, origin: Coordinate, size: Size, color: string): void {
    const x = Math.floor((size[0] / 2 + origin[0]) * deviceRatio);
    const y = Math.floor((size[1] / 2 + origin[1]) * deviceRatio);
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(size[0] * deviceRatio, y);
    context.moveTo(x, 0);
    context.lineTo(x, size[1] * deviceRatio);
    context.lineWidth = 1;
    context.strokeStyle = color;
    context.stroke();
    context.closePath();
}

export function redrawTrackPoint(context: CanvasRenderingContext2D, point: Coordinate): void {
    context.beginPath();
    context.fillStyle = '#f00';
    context.arc(point[0] * deviceRatio, point[1] * deviceRatio, deviceRatio * 2, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
    context.closePath();
}
