import {expect} from 'chai';
import {range} from 'lodash';
import {dxComputer, DxInput, MIN_DELTA_Z, MAX_DELTA_Z} from './arithmetic';

describe('dxComputer', () => {
    const zooms = range(1, 16).map(zoom => (2 ** .5) ** zoom);
    const dxs = [
        0.1, 0.5, 1, 2, 10, 100,
        -0.1, -0.5, -1, -2, -10, -100
    ];

    function test(zooms: number[], dxs: number[], x: number, y: number, fx: (x: number) => number) {
        zooms.forEach(zoom => {
            describe(`f(x)=${fx}; x=${x}; y=${y}; zoom=${zoom}`, () => {
                dxs.forEach(dx => {
                    it(`dx=${dx}`, () => {
                        const newDx = dxComputer(fx, dx, y, x, zoom);
                        const dz = (newDx ** 2 + (fx(x + newDx) - fx(x)) ** 2) ** 0.5;
                        expect(dz * zoom).greaterThan(MIN_DELTA_Z);
                        expect(dz * zoom).lessThan(MAX_DELTA_Z);
                        dx > 0 ?
                            expect(newDx).greaterThan(0) :
                            expect(newDx).lessThan(0);
                    });
                });
            });
        });
    }

    (() => {
        const fx = (x: number) => x;
        const x = 1;
        const y = fx(x);
        test(zooms, dxs, x, y, fx);
    })();

    (() => {
        const fx = (x: number) => x ** 2;
        const x = 1;
        const y = fx(x);
        test(zooms, dxs, x, y, fx);
    })();

    (() => {
        const fx = (x: number) => Math.tan(x);
        const x = Math.PI / 2 - 1e-4;
        const y = fx(x);
        test(zooms, dxs, x, y, fx);
    })();

    (() => {
        const fx = (x: number) => Math.tan(x);
        const x = Math.PI;
        const y = fx(x);
        test(zooms, dxs, x, y, fx);
    })();

    (() => {
        const fx = (x: number) => 2;
        const x = 1;
        const y = fx(x);
        test(zooms, dxs, x, y, fx);
    })();
});
