import {describe, it, expect} from 'vitest';
import {utoa, atou} from '../helpers/codec';

describe('codec', () => {
    describe('utoa / atou round-trip', () => {
        it('encodes and decodes ASCII strings', () => {
            const input = 'hello world';
            expect(atou(utoa(input))).toBe(input);
        });

        it('encodes and decodes unicode strings', () => {
            const input = 'sin(x) + cos(π)';
            expect(atou(utoa(input))).toBe(input);
        });

        it('encodes and decodes JSON', () => {
            const input = JSON.stringify([['x^2', '#ff0000', true]]);
            expect(atou(utoa(input))).toBe(input);
        });

        it('encodes and decodes Chinese characters', () => {
            const input = '函数绘图器';
            expect(atou(utoa(input))).toBe(input);
        });

        it('handles empty string', () => {
            expect(atou(utoa(''))).toBe('');
        });
    });

    describe('utoa', () => {
        it('returns a base64 string', () => {
            const result = utoa('test');
            expect(result).toMatch(/^[A-Za-z0-9+/=]+$/);
        });
    });
});
