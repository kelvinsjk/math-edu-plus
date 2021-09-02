import { bisection, determinant, cramers } from '../../index';

const det1 = determinant(1, 2, 3, 4);
const det2 = determinant(1, 2, 3, 7, 5, -4, 0, -1, 4);
const xy1 = cramers(1, 2, 3, 4, 5, 6);
const xy2 = cramers(115, 60, 55, 828, 120, 45, 30, 684, 215, 90, 65, 1305);

test('determinant', () => {
  expect(det1).toBe(-2);
  expect(det2).toBe(-61);

  expect(() => determinant(1)).toThrow();
});

test('cramers', () => {
  expect(xy1[0]).toBe(-1);
  expect(xy1[1]).toBe(2);
  expect(xy2[0]).toBe(3.5);
  expect(xy2[1]).toBe(2.6);
  expect(xy2[2]).toBe(4.9);
  expect(() => cramers(1)).toThrow();
  expect(() => cramers(1, 1, 1, 2, 2, 2)).toThrow();
  expect(() => cramers(1, 1, 1, 1, 2, 2, 2, 2, 3, 4, 5, 6)).toThrow();
});

test('bisection', () => {
  expect(() => bisection((x) => x, 1, 2)).toThrow();
  expect(bisection((x) => x - 1, -1, 2).toFixed(1)).toBe('1.0');
});
