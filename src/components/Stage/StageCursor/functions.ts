import {Coordinate, Size} from '../../../pages/Plotter';
import deviceRatio from '../../../helpers/deviceRatio';

const attractionRadius = 10;

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

export function redrawTrackPoint(context: CanvasRenderingContext2D, point: Coordinate, color: string, radius: number): void {
    context.beginPath();
    context.fillStyle = color;
    context.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    context.arc(point[0] * deviceRatio, point[1] * deviceRatio, deviceRatio * radius, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
    context.closePath();
}

function distance(a: Coordinate, b: Coordinate): number {
    return ((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2) ** .5;
}

export function calculateTrackPoint(cursor: Coordinate, coordinates: Coordinate[], mapping: number[]): Coordinate | null {
    const start = mapping[Math.round(cursor[0] - attractionRadius)] || 0;
    const end = mapping[Math.round(cursor[0] + attractionRadius)] || 0;
    const result = [];
    for (let i = start; i < end; i++) {
        if (distance(coordinates[i], cursor) < attractionRadius * deviceRatio) {
            result.push(coordinates[i]);
        }
    }
    const trackPoint = result.sort((a, b) => distance(a, cursor) - distance(b, cursor))[0];
    return trackPoint || null;
}
