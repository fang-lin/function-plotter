import {Coordinate} from '../../../pages/Plotter';
import deviceRatio from '../../../helpers/deviceRatio';

export const drawEquation = (
    context: CanvasRenderingContext2D,
    coordinates: Coordinate[],
    isBold: boolean,
    color: string
): void => {
    context.fillStyle = color;
    if (isBold) {
        coordinates.forEach(([x, y]) => {
            context.fillRect(
                x * deviceRatio - deviceRatio,
                y * deviceRatio - deviceRatio,
                deviceRatio * 2,
                deviceRatio * 2
            );
        });
    } else {
        coordinates.forEach(([x, y]) => {
            context.fillRect(
                (x - 0.5) * deviceRatio,
                (y - 0.5) * deviceRatio,
                deviceRatio,
                deviceRatio
            );
        });
    }
    context.stroke();
};
