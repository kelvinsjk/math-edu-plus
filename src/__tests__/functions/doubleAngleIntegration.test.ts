import { Angle, Fraction } from
  // 'math-edu'
  '../../../../math-edu/src/index';
import {
  integrateCosSquare, integrateSinSquare,
  integrateSinCos, integrateCosSin, integrateCosCos, integrateSinSin,
} from '../../index';

const piOver2 = new Angle(90);
const piOver3 = new Angle(60);
const piOver4 = new Angle(45);

test('doubleAngle', () => {
  expect(`${integrateCosSquare()}`).toBe('\\frac{1}{4} \\sin ( 2 x ) + \\frac{1}{2} x');
  expect(`${integrateCosSquare({limits: [0, 90]})}`).toBe('\\frac{1}{4} \\pi');
  expect(`${integrateCosSquare({ limits: [0, 45] })}`).toBe('\\frac{1}{4} + \\frac{1}{8} \\pi');
  expect(`${integrateCosSquare({ limits: [piOver3, piOver2] })}`).toBe('- \\frac{1}{8} \\sqrt{3} + \\frac{1}{12} \\pi');
  expect(`${integrateSinSquare()}`).toBe('\\frac{1}{2} x - \\frac{1}{4} \\sin ( 2 x )');
  expect(`${integrateSinSquare({limits: [0, 90]})}`).toBe('\\frac{1}{4} \\pi');
  expect(`${integrateSinSquare({ limits: [0, 45] })}`).toBe('- \\frac{1}{4} + \\frac{1}{8} \\pi');
  expect(`${integrateSinSquare({limits: [piOver3, piOver2]})}`).toBe('\\frac{1}{8} \\sqrt{3} + \\frac{1}{12} \\pi');
});

test('factor formula', () => {
  expect(`${integrateSinCos()}`).toBe('- \\frac{1}{4} \\cos ( 2 x )');
  expect(`${integrateCosSin()}`).toBe('- \\frac{1}{4} \\cos ( 2 x )');
  expect(`${integrateCosCos()}`).toBe(`${integrateCosSquare()}`);
  expect(`${integrateSinSin()}`).toBe(`${integrateSinSquare()}`);
  expect(`${integrateCosCos({limits:[0,piOver4]})}`).toBe(`${integrateCosSquare({limits:[0,45]})}`);
  expect(`${integrateSinSin({limits:[0,piOver4]})}`).toBe(`${integrateSinSquare({limits:[0,45]})}`);
  expect(`${integrateSinCos({ a: 2 }, { a: 1 })}`).toBe('- \\frac{1}{6} \\cos ( 3 x ) - \\frac{1}{2} \\cos x');
  expect(`${integrateSinCos({ a: new Fraction(2), limits: [0, 45] }, { a: 1 })}`).toBe('- \\frac{1}{6} \\sqrt{2} + \\frac{2}{3}');
  expect(`${integrateSinCos({ a: new Fraction(2), limits: [piOver4, piOver3] }, { a: 1 })}`).toBe('- \\frac{1}{12} + \\frac{1}{6} \\sqrt{2}');
  expect(`${integrateCosSin({a:3, limits:[0, piOver4]})}`).toBe('0');
  expect(`${integrateCosSin({a:3, limits:[0, 45]})}`).toBe('0');
  expect(`${integrateCosCos({a:3, limits:[0, 45]}, {a:2})}`).toBe('\\frac{1}{5} \\sqrt{2}');
  expect(`${integrateSinSin({a:3, limits:[0, 45]}, {a:2})}`).toBe('\\frac{3}{10} \\sqrt{2}');
});