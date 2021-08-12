import { getRandomInts } from '../../index';

test('getRandomInts', () => {
  expect(() => getRandomInts(2, {min: 2, max: 1})).toThrow();
  expect(() => getRandomInts(2, {min: 2, max: 2})).toThrow();
  expect(() => getRandomInts(1.1)).toThrow();
  expect(() => getRandomInts(-2)).toThrow();
  expect(() => getRandomInts(2, {unique: false, min: 2, max: 2})).not.toThrow();
})