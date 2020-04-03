import {expect} from 'chai';
import {parse} from 'mathjs';
import {crimp} from './Equations';

test('crimp remove spaces', () => {
    const input = 'y = x + 2';
    expect(crimp(input)).equal('y=x+2');
});

test('mathjs', () => {
    const compute = parse('n = x + 2');
    const code = compute.compile();
    const r = code.evaluate({x: 3});
    console.log(code)
    expect(r).equal(5);
});

