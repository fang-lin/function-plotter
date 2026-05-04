import {describe, it, expect} from 'vitest';
import {calculateFunctionEquation} from '../services/calculateFunctionEquation';

describe('calculateFunctionEquation', () => {
    const baseInput = {
        type: 'Equation' as const,
        size: [800, 600] as [number, number],
        origin: [0, 0] as [number, number],
        scale: 100,
        deviceRatio: 1,
        isSmooth: true,
    };

    it('calculates y = x (linear function)', () => {
        const result = calculateFunctionEquation({
            ...baseInput,
            equation: {
                type: 'FunctionEquation',
                expression: 'x',
                fn: 'x',
                color: '#ff0000',
                displayed: true,
                serialization: () => ['x', '#ff0000', true],
            },
        });

        expect(result.coordinates.length).toBeGreaterThan(0);
        expect(result.mapping).toHaveLength(800);
    });

    it('calculates y = x^2 (quadratic)', () => {
        const result = calculateFunctionEquation({
            ...baseInput,
            equation: {
                type: 'FunctionEquation',
                expression: 'x^2',
                fn: 'x^2',
                color: '#ff0000',
                displayed: true,
                serialization: () => ['x^2', '#ff0000', true],
            },
        });

        expect(result.coordinates.length).toBeGreaterThan(0);
    });

    it('calculates y = sin(x)', () => {
        const result = calculateFunctionEquation({
            ...baseInput,
            equation: {
                type: 'FunctionEquation',
                expression: 'sin(x)',
                fn: 'sin(x)',
                color: '#ff0000',
                displayed: true,
                serialization: () => ['sin(x)', '#ff0000', true],
            },
        });

        expect(result.coordinates.length).toBeGreaterThan(0);
    });

    it('produces coordinates within canvas bounds', () => {
        const result = calculateFunctionEquation({
            ...baseInput,
            equation: {
                type: 'FunctionEquation',
                expression: 'x',
                fn: 'x',
                color: '#ff0000',
                displayed: true,
                serialization: () => ['x', '#ff0000', true],
            },
        });

        result.coordinates.forEach(([x]) => {
            expect(x).toBeGreaterThanOrEqual(0);
            expect(x).toBeLessThanOrEqual(800);
        });
    });
});
