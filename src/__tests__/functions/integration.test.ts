
// import { ExpFn, PowerFn, CosFn, SinFn, LnFn, integrateByParts, simpsons, bisection, Angle } from '../../index';
import { Angle } from '../../../../math-edu/src/index';
import { ExpFn, PowerFn, CosFn, SinFn, LnFn, integrateByParts, simpsons, bisection } from '../../index';


const ex = new ExpFn();
const one = new PowerFn({ n: 0 });
const x = new PowerFn();
const threeX = new PowerFn({ coeff: 3 });
const nineX2 = new PowerFn({ coeff: 9, n: 2 });

const sinX = new SinFn();
const cos2X = new CosFn({ a: 2 });
const piOver2 = new Angle(90);

const exp2xIntegral = new ExpFn({ a: 2 }).definiteIntegral(4, 5);
const x_exIntegral = integrateByParts(x, ex, [4, 5]).multiply(6);
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
  expect(`${integrateByParts(one, cos2X)}`).toBe('\\frac{1}{2} \\sin ( 2 x )');
  expect(`${integrateByParts(x, sinX)}`).toBe('- x \\cos x + \\sin x');
  expect(`${integrateByParts(x, sinX)}`).toBe('- x \\cos x + \\sin x');
  expect(`${integrateByParts(x, sinX, [0, piOver2])}`).toBe('1');
  expect(`${integrateByParts(x, sinX, [piOver2, 0])}`).toBe('- 1');
  expect(`${integrateByParts(one, ex)}`).toBe('\\mathrm{e}^{x}');
  expect(`${integrateByParts(x, ex)}`).toBe('x \\mathrm{e}^{x} - \\mathrm{e}^{x}');
  expect(`${integrateByParts(one, ex, [0, 1])}`).toBe('\\mathrm{e} - 1');
  expect(`${integrateByParts(x, ex, [0, 1])}`).toBe('1');
  expect(definite.toString()).toBe(
    '\\frac{1}{2} \\mathrm{e}^{10} - \\frac{1}{2} \\mathrm{e}^{8} - 24 \\mathrm{e}^{5} + 18 \\mathrm{e}^{4} + 183',
  );
  expect((area1 - area2).toFixed(3)).toBe('-0.176');
  expect(alpha.toFixed(3)).toBe('0.619');
  expect(beta.toFixed(3)).toBe('1.512');

  const xHalf = new PowerFn({ n: -1 });
  expect(() => integrateByParts(xHalf, sinX)).toThrow();
  expect(() => integrateByParts(xHalf, x)).toThrow();
});



test('ln', () => {
  const lnX = new LnFn();
  const lnXSquare = new LnFn({n: 2});
  expect(`${integrateByParts(lnX, one)}`).toBe('x \\ln x - x');
  expect(`${integrateByParts(lnX, one, [1, 2])}`).toBe('2 \\ln 2 - 1');
  expect(`${integrateByParts(lnX, x)}`).toBe('\\frac{1}{2} x^{ 2 } \\ln x - \\frac{1}{4} x^{ 2 }');
  expect(`${integrateByParts(lnX, x, [1, 2])}`).toBe('2 \\ln 2 - \\frac{3}{4}');
  expect(`${integrateByParts(lnXSquare, one)}`).toBe('x \\left( \\ln x \\right)^2 - 2 x \\ln x + 2 x');
  expect(`${integrateByParts(lnXSquare, one, [1, 2])}`).toBe('2 \\left( \\ln 2 \\right)^2 - 4 \\ln 2 + 2');
  
  expect(() => integrateByParts(lnX, sinX)).toThrow();
  expect(() => integrateByParts(new LnFn({a:2}), new PowerFn())).toThrow();
});
