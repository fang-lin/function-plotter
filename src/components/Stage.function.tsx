import {Coordinate, deviceRatio, Size} from './App.function';

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

export const redrawAxis = (context: CanvasRenderingContext2D, cross: Coordinate, size: Size, color: string, lineWidth = 1): void => {
    const offset = (lineWidth % 2) / 2;
    const x = Math.floor(cross[0] * deviceRatio) - offset;
    const y = Math.floor(cross[1] * deviceRatio) - offset;
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(size[0] * deviceRatio, y);
    context.moveTo(x, 0);
    context.lineTo(x, size[1] * deviceRatio);
    context.lineWidth = lineWidth;
    context.strokeStyle = color;
    context.stroke();
};

export const redrawGrid = (context: CanvasRenderingContext2D, origin: Coordinate, size: Size, scale: number, color: string): void => {
    context.beginPath();
    let x = (size[0] / 2 + origin[0]) % scale;
    let y = (size[1] / 2 + origin[1]) % scale;
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
        // const h = setInterval(() => {
        //     const point = matrix.shift();
        //     if (point) {
        //         setInterval(() => {
        //             context.fillRect(point[0] * deviceRatio, point[1] * deviceRatio, deviceRatio, deviceRatio);
        //         });
        //     } else {
        //         clearInterval(h);
        //     }
        // });

        matrix.map(point => {
            context.fillRect(point[0] * deviceRatio, point[1] * deviceRatio, deviceRatio, deviceRatio);
        });
    }
    context.stroke();
};
