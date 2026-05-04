import {describe, it, expect} from 'vitest';
import {calculateParametricEquation} from '../services/calculateParametricEquation';

describe('calculateParametricEquation', () => {
    const baseInput = {
        type: 'Equation' as const,
        size: [800, 600] as [number, number],
        origin: [0, 0] as [number, number],
        scale: 100,
        deviceRatio: 1,
        isSmooth: true,
    };

    it('calculates a circle (cos(t), sin(t))', () => {
        const result = calculateParametricEquation({
            ...baseInput,
            equation: {
                type: 'ParametricEquation',
                expression: 'cos(t);sin(t);[0,6.283185307]',
                fx: 'cos(t)',
                fy: 'sin(t)',
                domain: [0, 6.283185307] as [number, number],
                color: '#ff0000',
                displayed: true,
                serialization: () => ['cos(t);sin(t);[0,6.283185307]', '#ff0000', true],
            },
        });

        expect(result.coordinates.length).toBeGreaterThan(0);
        expect(result.mapping).toEqual([]);
    });

    it('calculates a line (t, t)', () => {
        const result = calculateParametricEquation({
            ...baseInput,
            equation: {
                type: 'ParametricEquation',
                expression: 't;t;[0,5]',
                fx: 't',
                fy: 't',
                domain: [0, 5] as [number, number],
                color: '#00ff00',
                displayed: true,
                serialization: () => ['t;t;[0,5]', '#00ff00', true],
            },
        });

        expect(result.coordinates.length).toBeGreaterThan(0);
    });
});
