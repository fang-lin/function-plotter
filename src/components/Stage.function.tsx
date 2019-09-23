import {Coordinate, deviceRatio, Size} from './App.function';

export const GRID_COLOR = '#ddd';
export const AXIS_COLOR = '#000';

export const withCanvasContext = (canvas: HTMLCanvasElement, withContext: (context: CanvasRenderingContext2D) => void) => {
    if (canvas) {
        const context = canvas.getContext('2d');
        if (context) {
            withContext(context);
        }
    }
};

export const erasure = (canvas: HTMLCanvasElement, size: Size): void => {
    withCanvasContext(canvas, context => {
        context.clearRect(0, 0, size[0] * deviceRatio, size[1] * deviceRatio);
    });
};

export const redrawAxis = (canvas: HTMLCanvasElement, origin: Coordinate, size: Size): void => {
    withCanvasContext(canvas, context => {
        erasure(canvas, size);
        context.beginPath();
        context.moveTo(0, Math.floor(origin[1] * deviceRatio) + 0.5);
        context.lineTo(size[0] * deviceRatio, Math.floor(origin[1] * deviceRatio) + 0.5);
        context.moveTo(Math.floor(origin[0] * deviceRatio) + 0.5, 0);
        context.lineTo(Math.floor(origin[0] * deviceRatio) + 0.5, size[1] * deviceRatio);

        context.strokeStyle = AXIS_COLOR;
        context.stroke();
    });
};

export const redrawGrid = (canvas: HTMLCanvasElement, origin: Coordinate, size: Size, zoom: number): void => {
    withCanvasContext(canvas, context => {
        erasure(canvas, size);
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
        context.strokeStyle = GRID_COLOR;
        context.stroke();
    });
};

export const drawEquation = (canvas: HTMLCanvasElement, matrix: Coordinate[], size: Size): void => {
    withCanvasContext(canvas, context => {
        console.log('drawEquation');
        context.fillStyle = '#0f0';
        matrix.map(point => {
            context.fillRect(point[0] * deviceRatio, point[1] * deviceRatio, deviceRatio, deviceRatio);
        });
    });
};
