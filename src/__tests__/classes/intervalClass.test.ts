import { Fraction, Interval } from '../../index';

const oneHalf = new Fraction(1, 2);
const negativeTwoFifth = new Fraction(2, -5);

const real = new Interval();
const negativeInf_negativeTwoFifthOpen = new Interval(-Infinity, negativeTwoFifth);
const negativeInf_OneHalfOpen = new Interval(-Infinity, oneHalf);
const negativeInf_OneHalfClosed = new Interval(-Infinity, oneHalf, true, false);
const negativeTwoFifthOpen_ThreeOpen = new Interval(negativeTwoFifth, 3);
const negativeTwoFifthOpen_ThreeClosed = new Interval(negativeTwoFifth, 3, true, false);
const negativeTwoFifthClosed_ThreeOpen = new Interval(negativeTwoFifth, 3, false);
const oneHalfClosed_Infinity = new Interval(oneHalf, Infinity, false);
const oneHalfOpen_Infinity = new Interval(oneHalf, Infinity);
const threeOpen_Infinity = new Interval(3);

test('toString', () => {
  expect(`${real}`).toBe('\\left( -\\infty , \\infty \\right)');
  expect(`${real.toString({ rangeMode: true, variableAtom: 'y' })}`).toBe('y \\in \\mathbb{R}');
  expect(`${negativeInf_negativeTwoFifthOpen}`).toBe('\\left( -\\infty , - \\frac{2}{5} \\right)');
  expect(`${negativeInf_negativeTwoFifthOpen.toString({ rangeMode: true })}`).toBe('x < - \\frac{2}{5}');
  expect(`${negativeInf_OneHalfOpen}`).toBe('\\left( -\\infty , \\frac{1}{2} \\right)');
  expect(`${negativeInf_OneHalfClosed}`).toBe('\\left( -\\infty , \\frac{1}{2} \\right]');
  expect(`${negativeInf_OneHalfClosed.toString({ rangeMode: true })}`).toBe('x \\leq \\frac{1}{2}');
  expect(`${negativeTwoFifthOpen_ThreeOpen}`).toBe('\\left( - \\frac{2}{5} , 3 \\right)');
  expect(`${negativeTwoFifthOpen_ThreeClosed}`).toBe('\\left( - \\frac{2}{5} , 3 \\right]');
  expect(`${negativeTwoFifthOpen_ThreeClosed.toString({ rangeMode: true })}`).toBe('- \\frac{2}{5} < x \\leq 3');
  expect(`${negativeTwoFifthClosed_ThreeOpen}`).toBe('\\left[ - \\frac{2}{5} , 3 \\right)');
  expect(`${oneHalfClosed_Infinity}`).toBe('\\left[ \\frac{1}{2} , \\infty \\right)');
  expect(`${oneHalfClosed_Infinity.toString({ rangeMode: true })}`).toBe('x \\geq \\frac{1}{2}');
  expect(`${threeOpen_Infinity}`).toBe('\\left( 3 , \\infty \\right)');

  expect(() => {
    new Interval(Infinity);
  }).toThrow();
  expect(() => {
    new Interval(-3, -Infinity);
  }).toThrow();
  expect(() => {
    new Interval(-Infinity, -Infinity);
  }).toThrow();
  expect(() => {
    new Interval(oneHalf, -2);
  }).toThrow();
});

test('subsets', () => {
  expect(real.contains(3)).toBe(true);
  expect(negativeInf_negativeTwoFifthOpen.contains(oneHalf)).toBe(false);
  expect(negativeInf_OneHalfClosed.contains(negativeTwoFifth)).toBe(true);
  expect(negativeInf_OneHalfClosed.contains(oneHalf)).toBe(true);
  expect(negativeInf_negativeTwoFifthOpen.contains(negativeTwoFifth)).toBe(false);

  expect(negativeInf_negativeTwoFifthOpen.subsetEq(real)).toBe(true);
  expect(threeOpen_Infinity.subsetEq(real)).toBe(true);
  expect(threeOpen_Infinity.subsetEq(real)).toBe(true);
  expect(negativeTwoFifthClosed_ThreeOpen.subsetEq(negativeTwoFifthClosed_ThreeOpen)).toBe(true);
  expect(negativeTwoFifthClosed_ThreeOpen.subsetEq(negativeTwoFifthOpen_ThreeClosed)).toBe(false);
  expect(negativeTwoFifthOpen_ThreeOpen.subsetEq(negativeTwoFifthClosed_ThreeOpen)).toBe(true);
});

test('operations', () => {
  expect(`${real.intersect(negativeInf_negativeTwoFifthOpen)}`).toBe('\\left( -\\infty , - \\frac{2}{5} \\right)');
  expect(`${real.intersect(real)}`).toBe('\\left( -\\infty , \\infty \\right)');
  expect(`${real.union(real)}`).toBe('\\left( -\\infty , \\infty \\right)');

  expect(`${negativeInf_negativeTwoFifthOpen.intersect(negativeInf_OneHalfClosed)}`).toBe(
    '\\left( -\\infty , - \\frac{2}{5} \\right)',
  );
  expect(`${negativeInf_negativeTwoFifthOpen.union(negativeInf_OneHalfClosed)}`).toBe(
    '\\left( -\\infty , \\frac{1}{2} \\right]',
  );

  expect(`${negativeInf_OneHalfOpen.intersect(negativeTwoFifthOpen_ThreeClosed)}`).toBe(
    '\\left( - \\frac{2}{5} , \\frac{1}{2} \\right)',
  );
  expect(`${negativeTwoFifthOpen_ThreeClosed.intersect(negativeInf_OneHalfOpen)}`).toBe(
    '\\left( - \\frac{2}{5} , \\frac{1}{2} \\right)',
  );
  expect(`${negativeInf_OneHalfOpen.union(negativeTwoFifthOpen_ThreeClosed)}`).toBe('\\left( -\\infty , 3 \\right]');
  expect(`${negativeTwoFifthOpen_ThreeClosed.union(negativeInf_OneHalfOpen)}`).toBe('\\left( -\\infty , 3 \\right]');

  expect(`${negativeInf_OneHalfClosed.intersect(threeOpen_Infinity)}`).toBe('null');
  expect(negativeInf_OneHalfClosed.union(threeOpen_Infinity).length).toBe(2);
  expect(`${negativeInf_OneHalfClosed.union(threeOpen_Infinity)[0]}`).toBe('\\left( -\\infty , \\frac{1}{2} \\right]');
  expect(`${negativeInf_OneHalfClosed.union(threeOpen_Infinity)[1]}`).toBe('\\left( 3 , \\infty \\right)');

  expect(`${negativeInf_OneHalfClosed.union(oneHalfClosed_Infinity)}`).toBe('\\left( -\\infty , \\infty \\right)');
  expect(`${negativeInf_OneHalfOpen.union(oneHalfClosed_Infinity)}`).toBe('\\left( -\\infty , \\infty \\right)');
  expect(`${negativeInf_OneHalfOpen.union(oneHalfOpen_Infinity)[0]}`).toBe('\\left( -\\infty , \\frac{1}{2} \\right)');
  expect(`${negativeInf_OneHalfOpen.union(oneHalfOpen_Infinity)[1]}`).toBe('\\left( \\frac{1}{2} , \\infty \\right)');
});

test('arithmetic', () => {
  expect(`${real.plus(2)}`).toBe('\\left( -\\infty , \\infty \\right)');
  expect(`${real.times(-2)}`).toBe('\\left( -\\infty , \\infty \\right)');

  expect(`${negativeInf_negativeTwoFifthOpen.plus(oneHalf)}`).toBe('\\left( -\\infty , \\frac{1}{10} \\right)');
  expect(`${negativeInf_negativeTwoFifthOpen.times(oneHalf)}`).toBe('\\left( -\\infty , - \\frac{1}{5} \\right)');
  expect(`${negativeInf_negativeTwoFifthOpen.times(oneHalf.times(-1))}`).toBe(
    '\\left( \\frac{1}{5} , \\infty \\right)',
  );

  expect(`${negativeTwoFifthOpen_ThreeOpen.plus(1)}`).toBe('\\left( \\frac{3}{5} , 4 \\right)');
  expect(`${negativeTwoFifthOpen_ThreeClosed.times(-1)}`).toBe('\\left[ -3 , \\frac{2}{5} \\right)');
  expect(`${negativeTwoFifthClosed_ThreeOpen.times(2)}`).toBe('\\left[ - \\frac{4}{5} , 6 \\right)');

  const negativeOneClosed_negativeTwoFifthOpen = new Interval(-1, negativeTwoFifth, false);

  expect(`${negativeTwoFifthClosed_ThreeOpen.pow(2)}`).toBe('\\left[ 0 , 9 \\right)');
  expect(`${negativeTwoFifthClosed_ThreeOpen.pow(3)}`).toBe('\\left[ - \\frac{8}{125} , 27 \\right)');
  expect(`${negativeOneClosed_negativeTwoFifthOpen.pow(2)}`).toBe('\\left( \\frac{4}{25} , 1 \\right]');
  const negativeTwoClosed_ZeroOpen = new Interval(-2, 0, false, true);
  expect(`${negativeTwoClosed_ZeroOpen.pow(2)}.toBe('\\left( 0 , 4 \\right]`);

  expect(`${negativeTwoClosed_ZeroOpen.pow(-2)}.toBe('\\left[ \\frac{1}{4} , \\infty \\right)`);
  expect(`${negativeTwoClosed_ZeroOpen.pow(-1)}.toBe('\\left( -\\infty , - \\frac{1}{2} \\right]`);

  const bothOpen = new Interval(-2, 2);
  const oneOpen = new Interval(-2, 2, false);
  expect(`${bothOpen.pow(2)}`).toBe('\\left[ 0 , 4 \\right)');
  expect(`${oneOpen.pow(2)}`).toBe('\\left[ 0 , 4 \\right]');

  const zeroOne = new Interval(0, 1);
  const negativeOneZero = new Interval(-1, 0, false);
  expect(`${zeroOne.pow(-1)}`).toBe('\\left( 1 , \\infty \\right)');
  expect(`${negativeOneZero.pow(-1)}`).toBe('\\left( -\\infty , - 1 \\right]');
  expect(`${zeroOne.pow(-2)}`).toBe('\\left( 1 , \\infty \\right)');
  expect(`${negativeOneZero.pow(-2)}`).toBe('\\left[ 1 , \\infty \\right)');

  expect(() => {
    real.pow(2.1);
  }).toThrow();
  expect(() => {
    real.pow(-2);
  }).toThrow();
});

test('array subsets', () => {
  expect(Interval.IntervalsSubsetEq(real, [threeOpen_Infinity, negativeTwoFifthClosed_ThreeOpen])).toBe(false);
  expect(Interval.IntervalsSubsetEq([threeOpen_Infinity, negativeTwoFifthClosed_ThreeOpen], real)).toBe(true);
  expect(Interval.IntervalsSubsetEq(threeOpen_Infinity, real)).toBe(true);

  const negativeOneClosed_negativeTwoFifthOpen = new Interval(-1, negativeTwoFifth, false);
  const negativeOneOne = new Interval(-1, 1, false);
  const oneInf = new Interval(1);

  expect(
    Interval.IntervalsSubsetEq([threeOpen_Infinity, negativeOneClosed_negativeTwoFifthOpen], [negativeOneOne, oneInf]),
  ).toBe(true);
  expect(
    Interval.IntervalsSubsetEq([negativeOneOne, oneInf], [threeOpen_Infinity, negativeOneClosed_negativeTwoFifthOpen]),
  ).toBe(false);

  expect(threeOpen_Infinity.subsetEq(real)).toBe(true);
  expect(threeOpen_Infinity.subsetEq(real)).toBe(true);
  expect(negativeTwoFifthClosed_ThreeOpen.subsetEq(negativeTwoFifthClosed_ThreeOpen)).toBe(true);
  expect(negativeTwoFifthClosed_ThreeOpen.subsetEq(negativeTwoFifthOpen_ThreeClosed)).toBe(false);
  expect(negativeTwoFifthOpen_ThreeOpen.subsetEq(negativeTwoFifthClosed_ThreeOpen)).toBe(true);
});
