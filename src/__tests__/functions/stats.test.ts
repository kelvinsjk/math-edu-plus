import { binomPdf, binomCdf, binomCdfRange, normCdf, invNorm, zTest, Normal } from '../../index';

const X = new Normal(5, 4);
const Y = new Normal(7, 10);
const Z = new Normal(0);
const X_plus_Y = X.plus(Y);
const X_minus_Y = X.minus(Y);
const twoX = X.times(2);
const X1_plus_X2 = X.sum(2);
const halfX = X.divide(2);
const XBar = X.bar(2);
const X_minus_2 = X.minus(2);
const X_plus_2 = X.plus(2);

test('stats', () => {
  expect(binomPdf(5, 0.1, 2).toPrecision(3)).toBe('0.0729');
  expect(binomCdf(5, 0.1, 2).toPrecision(5)).toBe('0.99144');
  expect(binomCdfRange(10, 0.3, 2, 3).toPrecision(3)).toBe('0.500');
  expect(normCdf(0, 1, { upper: 2 }).toPrecision(3)).toBe('0.977');
  expect(normCdf(5, 2, { lower: 2 }).toPrecision(3)).toBe('0.933');
  expect(normCdf(5, 2, { lower: 2, upper: 3 }).toPrecision(3)).toBe('0.0918');
  expect(invNorm(0.3).toPrecision(3)).toBe('-0.524');
  expect(invNorm(0.3, 0, 1, 'right').toPrecision(3)).toBe('0.524');
  expect(invNorm(0.3, 0, 1, 'center').toPrecision(3)).toBe('0.385');
  expect(invNorm(0.3, 5, 7).toPrecision(3)).toBe('1.33');
  expect(zTest(10, 5, 9, 20).toPrecision(3)).toBe('0.186');
  expect(zTest(10, 5, 9, 20, 'two').toPrecision(3)).toBe('0.371');
  expect(zTest(10, 5, 11, 20, 'two').toPrecision(3)).toBe('0.371');
  expect(zTest(10, 5, 11, 20, 'right').toPrecision(3)).toBe('0.186');

  expect(X.moreThan(2)).toBeCloseTo(0.933, 3);
  expect(Z.lessThan(2)).toBeCloseTo(0.977, 3);
  expect(X.between(2, 3)).toBeCloseTo(0.0918, 4);
  expect(Z.invNorm(0.3, 'right')).toBeCloseTo(0.524, 3);

  expect(X_plus_Y.mean).toBe(12);
  expect(X_plus_Y.variance).toBe(14);
  expect(X_minus_Y.mean).toBe(-2);
  expect(X_minus_Y.variance).toBe(14);
  expect(twoX.mean).toBe(10);
  expect(twoX.variance).toBe(16);
  expect(X1_plus_X2.mean).toBe(10);
  expect(X1_plus_X2.variance).toBe(8);
  expect(halfX.mean).toBe(2.5);
  expect(halfX.variance).toBe(1);
  expect(XBar.mean).toBe(5);
  expect(XBar.variance).toBe(2);
  expect(X_plus_2.mean).toBe(7);
  expect(X_plus_2.variance).toBe(4);
  expect(X_minus_2.mean).toBe(3);
  expect(X_minus_2.variance).toBe(4);
  expect(`${X}`).toBe('X \\sim N( 5, 4 )');

  expect(() => new Normal(-2, -3)).toThrow();
  expect(() => X.divide(0)).toThrow();
});
