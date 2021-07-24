import { Fraction, Interval, Expression, BasicFunction, GeneralFunction, FunctionChain, canCompose, compose } from '../../../src/index';

const twoThird = new Fraction(2, 3)
const x_MINUS_ONE = new BasicFunction('x+a', -1);
const twoThird_x = new BasicFunction('ax', twoThird);
const xSquare = new BasicFunction('x^a', 2);
const xCube = new BasicFunction('x^a', 3);
const oneOver_x = new BasicFunction('x^a', -1);
const oneOver_xSquare = new BasicFunction('x^a', -2);

test('basic function constructor', () => {
  expect(`${x_MINUS_ONE}`).toBe('f(x) = x -1')
  expect(`${twoThird_x}`).toBe('f(x) = \\frac{2}{3} x')
  expect(`${xSquare}`).toBe('f(x) = x^2')
  expect(`${xCube}`).toBe('f(x) = x^3')
  expect(`${oneOver_x}`).toBe('f(x) = \\frac{1}{ x }')
  expect(`${oneOver_xSquare}`).toBe('f(x) = \\frac{1}{ x^{2} }')

  expect(() => new BasicFunction('x+a', twoThird, { domain: [new Interval(-Infinity, -2), new Interval(3)] })).not.toThrow();
  expect(() => new BasicFunction('ax', twoThird, { domain: [new Interval(-Infinity, -2), new Interval(3)] })).not.toThrow();

  expect(() => {
    new BasicFunction('ax', 0);
  }).toThrow();
  expect(() => {
    new BasicFunction('x^a', 2.1);
  }).toThrow();
  expect(() => {
    new BasicFunction('x^a', -1, {domain: new Interval()});
  }).toThrow();
  expect(() => {
    new BasicFunction('x^a', -2, {domain: [new Interval(-2, 3), new Interval(4)]});
  }).toThrow();
})

test('basic function methods', () => {
  expect(`${x_MINUS_ONE.inverse()}`).toBe('f(x) = x + 1')
  expect(`${twoThird_x.inverse()}`).toBe('f(x) = \\frac{3}{2} x')
  expect(`${oneOver_x.inverse()}`).toBe('f(x) = \\frac{1}{ x }')


  expect(() => {
    xSquare.inverse()
  }).toThrow();
  expect(() => {
    const f = new BasicFunction('x^a', 2, { domain: new Interval(0) });
    f.inverse();
  }).toThrow();
})

test('general functions, canCompose', () => {
  const sin_x = new GeneralFunction(new Expression('\\sin x'), new Interval(), new Interval(-1, 1, false, false));
  expect(`${sin_x}`).toBe('f(x) = \\sin x');
  expect(canCompose(oneOver_x, sin_x)).toBe(true);
  expect(canCompose(sin_x, oneOver_x)).toBe(false);

  expect(`${compose(sin_x, x_MINUS_ONE).toString({definitionMode: true})}`).toBe("f : x \\mapsto \\sin x -1")
})

const twoThird_x_MINUS_1 = new FunctionChain(x_MINUS_ONE, twoThird_x);
const twoThird_bracket_x_MINUS_1 = new FunctionChain(twoThird_x, x_MINUS_ONE);
test('function chain', () => {
  expect(`${twoThird_bracket_x_MINUS_1}`).toBe('f(x) = \\frac{2}{3} x -1')
  expect(`${twoThird_x_MINUS_1}`).toBe('f(x) = \\frac{2}{3} x - \\frac{2}{3}')
  expect(`${twoThird_x_MINUS_1.inverse()}`).toBe('f(x) = \\frac{3}{2} x + 1')

  const h = new FunctionChain(x_MINUS_ONE, xSquare);
  expect(`${h}`).toBe('f(x) = ( x -1 )^2')
  const restricted = new BasicFunction('x+a', -1, { domain: [new Interval(3), new Interval(1,2)] });
  const g = new FunctionChain(restricted, oneOver_x);
  expect(`${g}`).toBe('f(x) = \\frac{1}{ x -1 }')
})