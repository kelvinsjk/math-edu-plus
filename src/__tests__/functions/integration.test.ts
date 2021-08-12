import { ExpFn, PowerFn, integrateByParts, simpsons, bisection } from '../../index';

const ex = new ExpFn();
const one = new PowerFn({ n: 0 });
const x = new PowerFn();
const threeX = new PowerFn({ coeff: 3 });
const nineX2 = new PowerFn({ coeff: 9, n: 2 });

const exp2xIntegral = new ExpFn({ a: 2 }).definiteIntegral(4, 5);
const x_exIntegral = integrateByParts(x, ex, { lower: 4, upper: 5 }).multiply(6);
const nineX2Integral = nineX2.definiteIntegral(4, 5);
const definite = exp2xIntegral.subtract(x_exIntegral).add(nineX2Integral);

const area1 = simpsons(ex.toNumberFunction(), 0.619, 1.512);
const area2 = simpsons(threeX.toNumberFunction(), 0.619, 1.512);

//console.log(ex.toNumberFunction()(0) - threeX.toNumberFunction()(0));
//console.log(ex.toNumberFunction()(1) - threeX.toNumberFunction()(1));
//console.log(ex.toNumberFunction()(2) - threeX.toNumberFunction()(2));

const alpha = bisection((x) => ex.toNumberFunction()(x) - threeX.toNumberFunction()(x), 0, 1);
const beta = bisection((x) => ex.toNumberFunction()(x) - threeX.toNumberFunction()(x), 1, 2);

test('by parts', () => {
  expect(`${integrateByParts(one, ex)}`).toBe('\\mathrm{e}^{x}');
  expect(`${integrateByParts(x, ex)}`).toBe('x \\mathrm{e}^{x} - \\mathrm{e}^{x}');
  expect(`${integrateByParts(one, ex, { lower: 0, upper: 1 })}`).toBe('\\mathrm{e} - 1');
  expect(`${integrateByParts(x, ex, { lower: 0, upper: 1 })}`).toBe('1');
  expect(definite.toString()).toBe(
    '\\frac{1}{2} \\mathrm{e}^{10} - \\frac{1}{2} \\mathrm{e}^{8} - 24 \\mathrm{e}^{5} + 18 \\mathrm{e}^{4} + 183',
  );
  expect((area1 - area2).toFixed(3)).toBe('-0.176');
  expect(alpha.toFixed(3)).toBe('0.619');
  expect(beta.toFixed(3)).toBe('1.512');
});
