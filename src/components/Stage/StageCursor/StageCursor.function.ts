import {Coordinate, Size} from '../../App/App.function';
import {deviceRatio} from '../../../helpers/deviceRatio';

const adsorptionRadius = 10;

export function redrawCursor(context: CanvasRenderingContext2D, origin: Coordinate, size: Size, color: string): void {
    const [x, y] = [origin[0] * deviceRatio, origin[1] * deviceRatio];
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
    context.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    context.arc(point[0] * deviceRatio, point[1] * deviceRatio, deviceRatio * 2, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
    context.closePath();
}

function distance(a: Coordinate, b: Coordinate): number {
    return ((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2) ** .5;
}

export function calculateTrackPoint(cursor: Coordinate, coordinates: Coordinate[], map: Map<number, number>): Coordinate {
    const start = map.get(Math.round(cursor[0] - adsorptionRadius)) || 0;
    const end = map.get(Math.round(cursor[0] + adsorptionRadius)) || 0;
    const result = [];
    for (let i = start; i < end; i++) {
        if (distance(coordinates[i], cursor) < adsorptionRadius * deviceRatio) {
            result.push(coordinates[i]);
        }
    }
    const trackPoint = result.sort((a, b) => distance(a, cursor) - distance(b, cursor))[0];
    return trackPoint || cursor;
}
