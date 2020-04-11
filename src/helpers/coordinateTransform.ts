import {Coordinate, Size} from '../components/App/App.function';

export function canvasToEquation(point: Coordinate, origin: Coordinate, size: Size, scale: number): Coordinate {
    return [
        ((point[0] - size[0] / 2 - origin[0]) / scale),
        ((size[1] / 2 - point[1] + origin[1]) / scale)
    ];
}

export function equationToCanvas(point: Coordinate, origin: Coordinate, size: Size, scale: number): Coordinate {
    return [
        size[0] / 2 + origin[0] + point[0] * scale,
        size[1] / 2 + origin[1] - point[1] * scale
    ];
}
