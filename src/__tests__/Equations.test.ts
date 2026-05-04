import {describe, it, expect} from 'vitest';
import {equationFactory, formatEquation, Equations} from '../services/Equations';
import {FunctionEquation, isFunctionEquation} from '../services/FunctionEquation';
import {ParametricEquation, isParametricEquation} from '../services/ParametricEquation';

describe('Equations', () => {
    describe('equationFactory', () => {
        it('creates a FunctionEquation for simple expressions', () => {
            const eq = equationFactory('x^2', '#ff0000', true);
            expect(isFunctionEquation(eq)).toBe(true);
            expect(eq.expression).toBe('x^2');
            expect(eq.color).toBe('#ff0000');
            expect(eq.displayed).toBe(true);
        });

        it('creates a FunctionEquation for trig functions', () => {
            const eq = equationFactory('sin(x)', '#00ff00', false);
            expect(isFunctionEquation(eq)).toBe(true);
            expect((eq as FunctionEquation).fn).toBe('sin(x)');
        });

        it('creates a ParametricEquation for parametric expressions', () => {
            const eq = equationFactory('cos(t);sin(t);[0,6.28]', '#0000ff', true);
            expect(isParametricEquation(eq)).toBe(true);
            const peq = eq as ParametricEquation;
            expect(peq.fx).toBe('cos(t)');
            expect(peq.fy).toBe('sin(t)');
            expect(peq.domain[0]).toBeCloseTo(0);
            expect(peq.domain[1]).toBeCloseTo(6.28);
        });

        it('strips whitespace from expressions', () => {
            const eq = equationFactory(' x ^ 2 ', '#ff0000', true);
            expect(eq.expression).toBe('x^2');
        });

        it('throws on invalid expressions', () => {
            expect(() => equationFactory('x +* 2', '#ff0000', true)).toThrow();
        });
    });

    describe('formatEquation', () => {
        it('adds newlines after semicolons', () => {
            expect(formatEquation('cos(t);sin(t);[0,6.28]')).toBe('cos(t);\nsin(t);\n[0,6.28]');
        });

        it('leaves non-parametric expressions unchanged', () => {
            expect(formatEquation('x^2')).toBe('x^2');
        });
    });

    describe('Equations class', () => {
        it('serializes and parses round-trip', () => {
            const equations = new Equations(
                equationFactory('x^2', '#ff0000', true),
                equationFactory('sin(x)', '#00ff00', false)
            );
            const code = equations.stringify();
            const parsed = Equations.parse(code);

            expect(parsed.length).toBe(2);
            expect(parsed[0].expression).toBe('x^2');
            expect(parsed[0].color).toBe('#ff0000');
            expect(parsed[0].displayed).toBe(true);
            expect(parsed[1].expression).toBe('sin(x)');
            expect(parsed[1].displayed).toBe(false);
        });

        it('returns empty marker for empty equations', () => {
            const equations = new Equations();
            expect(equations.stringify()).toBe('-');
        });

        it('parses empty marker to empty equations', () => {
            const parsed = Equations.parse('-');
            expect(parsed.length).toBe(0);
        });
    });
});
