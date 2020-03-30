import {Coordinate, deviceRatio, Size} from './App.function';

export const GRID_COLOR = 'rgba(0, 0, 0, .3)';
export const AXIS_COLOR = 'rgb(0, 0, 0)';

export const withCanvasContext = (withContext: (context: CanvasRenderingContext2D) => void, canvas?: HTMLCanvasElement | null): void => {
    const context = canvas?.getContext('2d');
    if (context) {
        withContext(context);
    }
};

export const erasure = (context: CanvasRenderingContext2D, size: Size): void => {
    context.clearRect(0, 0, size[0] * deviceRatio, size[1] * deviceRatio);
};

export const redrawAxis = (context: CanvasRenderingContext2D, origin: Coordinate, size: Size, color: string): void => {
    context.beginPath();
    context.moveTo(0, Math.floor(origin[1] * deviceRatio) + 0.5);
    context.lineTo(size[0] * deviceRatio, Math.floor(origin[1] * deviceRatio) + 0.5);
    context.moveTo(Math.floor(origin[0] * deviceRatio) + 0.5, 0);
    context.lineTo(Math.floor(origin[0] * deviceRatio) + 0.5, size[1] * deviceRatio);

    context.strokeStyle = color;
    context.stroke();
};

export const redrawGrid = (context: CanvasRenderingContext2D, origin: Coordinate, size: Size, zoom: number, color: string): void => {
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
    context.strokeStyle = color;
    context.stroke();
};

export const drawEquation = (context: CanvasRenderingContext2D, matrix: Coordinate[], isBold: boolean, color: string): void => {
    context.beginPath();
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
