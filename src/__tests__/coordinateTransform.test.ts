import {describe, it, expect} from 'vitest';
import {canvasToEquation, equationToCanvas} from '../helpers/coordinateTransform';
import {Coordinate, Size} from '../pages/Plotter/functions';

describe('coordinateTransform', () => {
    const size: Size = [800, 600];
    const origin: Coordinate = [0, 0];
    const scale = 100;

    describe('equationToCanvas', () => {
        it('converts origin (0,0) to canvas center', () => {
            const result = equationToCanvas([0, 0], origin, size, scale);
            expect(result).toEqual([400, 300]);
        });

        it('converts positive x to right of center', () => {
            const result = equationToCanvas([1, 0], origin, size, scale);
            expect(result).toEqual([500, 300]);
        });

        it('converts positive y to above center (lower canvas y)', () => {
            const result = equationToCanvas([0, 1], origin, size, scale);
            expect(result).toEqual([400, 200]);
        });

        it('handles non-zero origin', () => {
            // x: 800/2 + (1 + 0) * 100 = 500
            // y: 600/2 + (1 - 0) * 100 = 400
            const result = equationToCanvas([0, 0], [1, 1], size, scale);
            expect(result).toEqual([500, 400]);
        });

        it('handles different scales', () => {
            const result = equationToCanvas([1, 1], origin, size, 50);
            expect(result).toEqual([450, 250]);
        });
    });

    describe('canvasToEquation', () => {
        it('converts canvas center to origin (0,0)', () => {
            const result = canvasToEquation([400, 300], origin, size, scale);
            expect(result).toEqual([0, 0]);
        });

        it('converts right of center to positive x', () => {
            const result = canvasToEquation([500, 300], origin, size, scale);
            expect(result).toEqual([1, 0]);
        });

        it('converts above center to positive y', () => {
            const result = canvasToEquation([400, 200], origin, size, scale);
            expect(result).toEqual([0, 1]);
        });
    });

    describe('round-trip', () => {
        it('canvasToEquation(equationToCanvas(p)) === p', () => {
            const point: Coordinate = [2.5, -1.3];
            const canvas = equationToCanvas(point, origin, size, scale);
            const result = canvasToEquation(canvas, origin, size, scale);
            expect(result[0]).toBeCloseTo(point[0]);
            expect(result[1]).toBeCloseTo(point[1]);
        });
    });
});
