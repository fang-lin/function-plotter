import {Coordinate} from '../../App/App.function';
import {deviceRatio} from '../../../helpers/deviceRatio';

export const drawEquation = (context: CanvasRenderingContext2D, coordinates: Coordinate[], isBold: boolean, color: string): void => {
    context.fillStyle = color;
    if (isBold) {
        coordinates.map(([x, y]) => {
            context.fillRect(
                x * deviceRatio - deviceRatio,
                y * deviceRatio - deviceRatio,
                deviceRatio * 2,
                deviceRatio * 2
            );
        });
    } else {
        coordinates.map(([x, y]) => {
            context.fillRect((x - .5) * deviceRatio, (y - .5) * deviceRatio, deviceRatio, deviceRatio);
        });
    }
    context.stroke();
};
