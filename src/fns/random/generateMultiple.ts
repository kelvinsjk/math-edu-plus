// import { getRandomInt } from 'math-edu';
import {
  getRandomInt,
} from '../../../../math-edu/src/index';

// get n random integers between lb and up
/**
 * get `n` random integers between `min` and `max` (inclusive)
 * @param options `{unique: true, min: -9, max: 9, avoid: number[]}`
 * @return array of integers
 */
function getRandomInts(n: number, options?: randomIntsOptions): number[] {
  const defaultOptions = {
    unique: true,
    min: -9,
    max: 9,
    avoid: []
  }
  const optionsObject = { ...defaultOptions, ...options };
  const max = Math.floor(optionsObject.max);
  const min = Math.ceil(optionsObject.min);
  const unique = optionsObject.unique;
  const avoid = optionsObject.avoid;
  if (!Number.isInteger(n) || n < 1) {
    throw 'n must be a positive integer';
  }
  if (unique && max - min + 1 - avoid.length < n) {
    throw 'less numbers available then required';
  }
  const integers: number[] = avoid;
  for (let i = 0; i < n; i++) {
    const newInt = getRandomInt(-9, 9, { avoid: unique ? integers : [] });
    integers.push(newInt);
  }
  return integers
}

export {getRandomInts}

////
// interfaces
////

/**
 * 
 */
interface randomIntsOptions{
  /** whether the integers returned must be unique (or if repetition is allowed) */
  unique?: boolean,
  /** min (inclusive) */
  min?: number,
  /** max (inclusive) */
  max?: number,
  /** numbers to avoid */
  avoid?: number[]
}