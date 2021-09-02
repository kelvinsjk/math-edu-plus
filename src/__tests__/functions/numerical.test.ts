
// import { ExpFn, PowerFn, CosFn, SinFn, LnFn, integrateByParts, simpsons, bisection, Angle } from '../../index';
import { ExpFn, PowerFn, } from '../../../../math-edu/src/index';
import {  simpsons, bisection } from '../../index';

const ex = new ExpFn();
const threeX = new PowerFn({ coeff: 3 });

const area1 = simpsons(ex.toNumberFunction(), 0.619, 1.512);
const area2 = simpsons(threeX.toNumberFunction(), 0.619, 1.512);

const alpha = bisection((x) => ex.toNumberFunction()(x) - threeX.toNumberFunction()(x), 0, 1);
const beta = bisection((x) => ex.toNumberFunction()(x) - threeX.toNumberFunction()(x), 1, 2);

test('numerical', () => {
  expect((area1 - area2).toFixed(3)).toBe('-0.176');
  expect(alpha.toFixed(3)).toBe('0.619');
  expect(beta.toFixed(3)).toBe('1.512');
});
