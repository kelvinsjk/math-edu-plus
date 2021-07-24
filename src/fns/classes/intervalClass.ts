// import { Fraction } from 'math-edu'; TODO:
import { Fraction } from '../../../../math-edu/src/index';

/**
 * Interval class
 * default: `{left: -Infinity, right: Infinity, lOpen: true, rOpen: true}`;
 * @param left number or Fraction of the lower bound
 * @param lOpen whether the left bound is 'open' or 'closed'
 *
 */
export default class Interval {
  //// instance properties
  left: number | Fraction;
  right: number | Fraction;
  lOpen: boolean;
  rOpen: boolean;

  ////
  // constructor
  ////
  /**
   * Creates a new interval instance
   * defaults to `{left: -Infinity, right: Infinity, lOpen: true, rOpen: true}`
   */
  constructor(left: number | Fraction = -Infinity, right: number | Fraction = Infinity, lOpen = true, rOpen = true) {
    // check for infinities
    if (typeof left === 'number' && !Number.isFinite(left)) {
      if (left === -Infinity) {
        lOpen = true;
      } else {
        throw 'Infinity not allowed as left bound';
      }
    }
    if (typeof right === 'number' && !Number.isFinite(right)) {
      if (right === Infinity) {
        rOpen = true;
      } else {
        throw '-Infinity not allowed as left bound';
      }
    }
    // check if valid: left <= right
    if (right.valueOf() < left.valueOf() || (right.valueOf() === left.valueOf() && (lOpen || rOpen))) {
      throw 'Empty interval not allowed';
    }
    // clone fraction if Fraction class provided (avoid object reference)
    if (left instanceof Fraction) {
      left = new Fraction(left.num, left.den)
    }
    if (right instanceof Fraction) {
      right = new Fraction(right.num, right.den)
    }
    this.left = left;
    this.right = right;
    this.lOpen = lOpen;
    this.rOpen = rOpen;
  }
  
  //// 
  // instance methods
  ////
  /**
   * @param options defaults to `{rangeMode: true, variableAtom: 'x'}`
   * where we will return the interval as an inequality
   * @returns LaTeX string representing the interval
   */
  toString(options?: IntervalToStringOptions): string {
    const defaultOptions = { rangeMode: false, variableAtom: 'x' };
    const optionsObject = { ...defaultOptions, ...options };
    if (optionsObject.rangeMode) {
      if (this.left === -Infinity) {
        if (this.right === Infinity) {
          return `${optionsObject.variableAtom} \\in \\mathbb{R}`
        } else {
          const lessThanSign = this.rOpen ? '<' : '\\leq';
          return `${optionsObject.variableAtom} ${lessThanSign} ${this.right}`
        }
      } else { // no negative infinity
        if (this.right === Infinity) {
          const moreThanSign = this.lOpen ? '>' : '\\geq';
          return `${optionsObject.variableAtom} ${moreThanSign} ${this.left}`
        } else {
          const firstSign = this.lOpen ? '<' : '\\leq';
          const secondSign = this.rOpen ? '<' : '\\leq';
          return `${this.left} ${firstSign} ${optionsObject.variableAtom} ${secondSign} ${this.right}`;
        }
      }
    } else {
      const lBracket = this.lOpen ? '(' : '[';
      const rBracket = this.rOpen ? ')' : ']';
      const lString = this.left === -Infinity ? '-\\infty' : this.left;
      const rString = this.right === Infinity ? '\\infty' : this.right;
      return `\\left${lBracket} ${lString} , ${rString} \\right${rBracket}`;
    }
  }
  /**
   * clones the Interval object
   */
  clone(): Interval {
    return new Interval(this.left, this.right, this.lOpen, this.rOpen);
  }
  /**
   * check if number or Fraction is inside this Interval
   */
  contains(x: number | Fraction): boolean {
    const rightOfLowerBound = (this.left.valueOf() <  x.valueOf()) || (this.left.valueOf() === x.valueOf() && !this.lOpen);
    const leftOfUpperBound = (this.right.valueOf() >  x.valueOf()) || (this.right.valueOf() === x.valueOf() && !this.rOpen);
    return leftOfUpperBound && rightOfLowerBound;
  }
  /**
   * check if number or Fraction is at the boundary 
   * @param left to test the left bound (false for right bound) (defaults to true)
   * @param open whether new number or Fraction is excluded (open: true) or included
   * @returns if value at boundary the same, return false if this has `(` while open is `[`
   */
  atBoundary(x: number | Fraction, open: boolean, left = true): boolean {
    
    return left ?
      this.left.valueOf() === x.valueOf() && !((this.lOpen && !open))
      : this.right.valueOf() === x.valueOf() && !((this.rOpen && !open))
  }
  /**
   * check if this Interval is a subset of a given Interval
   */
  subsetEq(interval2: Interval): boolean {
    // if the same, we cannot have this [ and interval2 [
    const leftOK = interval2.contains(this.left) || interval2.atBoundary(this.left, this.lOpen);
    const rightOK = interval2.contains(this.right) || interval2.atBoundary(this.right, this.rOpen, false);
    return leftOK && rightOK;
  }

  /**
   * gets the intersection of the two intervals
   * @returns `null` if disjoint
   */

  intersect(interval2: Interval): Interval | null {
    let left: number|Fraction, right: number|Fraction, lOpen: boolean, rOpen: boolean;
    if (this.left.valueOf() === interval2.left.valueOf()) {
      left = (this.left instanceof Fraction) ? new Fraction(this.left.num, this.left.den) : this.left;
      lOpen = this.lOpen || interval2.lOpen;
    } else {
      const thisIsSmaller = this.left.valueOf() < interval2.left.valueOf();
      if (thisIsSmaller) { // take interval2
        left = (interval2.left instanceof Fraction) ? new Fraction(interval2.left.num, interval2.left.den) : interval2.left;
        lOpen = interval2.lOpen;
      } else {
        left = (this.left instanceof Fraction) ? new Fraction(this.left.num, this.left.den) : this.left;
        lOpen = this.lOpen;
      }
    }
    if (this.right.valueOf() === interval2.right.valueOf()) {
      right = (this.right instanceof Fraction) ? new Fraction(this.right.num, this.right.den) : this.right;
      rOpen = this.rOpen || interval2.rOpen;
    } else {
      const thisIsLarger = this.right.valueOf() > interval2.right.valueOf();
      if (thisIsLarger) { // take interval2
        right = (interval2.right instanceof Fraction) ? new Fraction(interval2.right.num, interval2.right.den) : interval2.right;
        rOpen = interval2.rOpen;
      } else {
        right = (this.right instanceof Fraction) ? new Fraction(this.right.num, this.right.den) : this.right;
        rOpen = this.rOpen;
      }
    }
    try {
      const newInterval = new Interval(left, right, lOpen, rOpen);
      return newInterval;
    }
    catch(_) {
      return null
    }  
  }

  /**
   * gets union of two intervals
   * @return an array of 1 or 2 intervals, depending on whether the intervals overlap
   * array will be arranged in ascending order
   */
  union(interval2: Interval): Interval[] {
    // disjoint
    if (this.intersect(interval2) === null) {
      const thisIsSmaller = this.left.valueOf() < interval2.left.valueOf();
      // if a) \cup [a, can join
      const canJoinCase1 = (thisIsSmaller && this.right.valueOf() === interval2.left.valueOf() && (!this.rOpen || !interval2.lOpen));
      const canJoinCase2 = (!thisIsSmaller && this.left.valueOf() === interval2.right.valueOf() && (!this.lOpen || !interval2.rOpen));
      if ( !(canJoinCase1 || canJoinCase2) ) {
        return thisIsSmaller ? [this.clone(), interval2.clone()] : [interval2.clone(), this.clone()];
      }
    }
    // overlaps: return just one interval
    let left: number|Fraction, right: number|Fraction, lOpen: boolean, rOpen: boolean;
    if (this.left.valueOf() === interval2.left.valueOf()) {
      left = (this.left instanceof Fraction) ? new Fraction(this.left.num, this.left.den) : this.left;
      lOpen = this.lOpen && interval2.lOpen;
    } else {
      const thisIsSmaller = this.left.valueOf() < interval2.left.valueOf();
      if (thisIsSmaller) { // take this
        left = (this.left instanceof Fraction) ? new Fraction(this.left.num, this.left.den) : this.left;
        lOpen = this.lOpen;
      } else {
        left = (interval2.left instanceof Fraction) ? new Fraction(interval2.left.num, interval2.left.den) : interval2.left;
        lOpen = interval2.lOpen;
      }
    }
    if (this.right.valueOf() === interval2.right.valueOf()) {
      right = (this.right instanceof Fraction) ? new Fraction(this.right.num, this.right.den) : this.right;
      rOpen = this.rOpen || interval2.rOpen;
    } else {
      const thisIsLarger = this.right.valueOf() > interval2.right.valueOf();
      if (thisIsLarger) { // take this
        right = (this.right instanceof Fraction) ? new Fraction(this.right.num, this.right.den) : this.right;
        rOpen = this.rOpen;
      } else {
        right = (interval2.right instanceof Fraction) ? new Fraction(interval2.right.num, interval2.right.den) : interval2.right;
        rOpen = interval2.rOpen;
      }
    }
    const newInterval = new Interval(left, right, lOpen, rOpen);
    return [newInterval];
  }
  /**
   * addition by a constant
   */
  plus(x: number | Fraction): Interval {
    let left: number | Fraction, right: number | Fraction;
    if (x instanceof Fraction) {
      left = Number.isFinite(this.left.valueOf()) ? x.plus(this.left) : -Infinity;
      right = Number.isFinite(this.right.valueOf()) ? x.plus(this.right) : Infinity;
    } else {
      left = (typeof this.left === 'number') ? x + this.left : this.left.plus(x);
      right = (typeof this.right === 'number') ? x + this.right : this.right.plus(x);
    }
    return new Interval(left, right, this.lOpen, this.rOpen);
  }
  /**
   * multiplication by a constant
   */
  times(x: number | Fraction): Interval {
    let left: number | Fraction, right: number | Fraction;
    if (x instanceof Fraction) {
      left = this.left === -Infinity ?
        x.valueOf() < 0 ? Infinity : -Infinity
      : x.times(this.left);
      right = this.right === Infinity ?
        x.valueOf() < 0 ? -Infinity : Infinity
      : x.times(this.right);
    } else {
      left = (typeof this.left === 'number') ? x * this.left : this.left.times(x);
      right = (typeof this.right === 'number') ? x * this.right : this.right.times(x);
    }
    return (x.valueOf() < 0) ? new Interval(right, left, this.rOpen, this.lOpen) : new Interval(left, right, this.lOpen, this.rOpen);
  }
  /**
   * exponentiation by `n`
   */
  pow(n: number): Interval | Interval[] {
    if (!Number.isInteger(n) || n===0) {
      throw 'only non-zero integer n allowed'
    }
    if (n > 0) {
      if (n % 2 === 1) { // odd power
        const left = (typeof this.left === 'number') ? Math.pow(this.left, n) : this.left.pow(n);
        const right = (typeof this.right === 'number') ? Math.pow(this.right, n) : this.right.pow(n);
        return new Interval(left, right, this.lOpen, this.rOpen);
      } else { // even power
        const left = (typeof this.left === 'number') ? Math.pow(this.left, n) : this.left.pow(n);
        const right = (typeof this.right === 'number') ? Math.pow(this.right, n) : this.right.pow(n);
        const leftIsSmaller = left.valueOf() < right.valueOf();
        if (this.contains(0)) { // [0, a] output
          let rOpen: boolean;
          if (left.valueOf() === right.valueOf()) {
            rOpen = this.lOpen && this.rOpen; // only open if both open
            return new Interval(0, left, false, rOpen);
          } else {
            return leftIsSmaller ? new Interval(0, right, false, this.rOpen) : new Interval(0, left, false, this.lOpen);
          }          
        } else { // doesn't contain 0
          const left = (typeof this.left === 'number') ? Math.pow(this.left, n) : this.left.pow(n);
          const right = (typeof this.right === 'number') ? Math.pow(this.right, n) : this.right.pow(n);
          return (this.right.valueOf() <= 0) ? new Interval(right, left, this.rOpen, this.lOpen) : new Interval(left, right, this.lOpen, this.rOpen);
        }
      }
    } else { // negative n
      let left: Fraction | number, right: number | Fraction;
      if (this.left.valueOf() === 0) {
        left = Infinity;
      } else {
        left = (typeof this.left === 'number') ? this.left===-Infinity ? 0 : Fraction.ONE.divide(Math.pow(this.left, Math.abs(n)))
          : Fraction.ONE.divide(this.left.pow(Math.abs(n)));
      }
      if (this.right.valueOf() === 0) {
        right = n%2===0 ? Infinity : -Infinity;
      } else {
        right = (typeof this.right === 'number') ? this.right === Infinity ? 0 : Fraction.ONE.divide(Math.pow(this.right, Math.abs(n)))
          : Fraction.ONE.divide(this.right.pow(Math.abs(n)));
      }
      const leftIsSmaller = left.valueOf() < right.valueOf();
      if (this.contains(0)) { // [0, a] output
        throw 'cannot have negative powers if 0 is inside'
      } else { // doesn't contain 0
        return leftIsSmaller ? new Interval(left, right, this.lOpen, this.rOpen) : new Interval(right, left, this.rOpen, this.lOpen);
      }
    }
  }



  //// 
  // static methods
  ////
  /**
   * check if the first interval/intervals is a subset of the second intervals
   */
  static IntervalsSubsetEq(intervals1: Interval | Interval[], intervals2: Interval | Interval[]): boolean{
    intervals1 = (intervals1 instanceof Interval) ? [intervals1] : intervals1;
    intervals2 = (intervals2 instanceof Interval) ? [intervals2] : intervals2;
    let subsetEq = true;
    for (const interval1 of intervals1) {
      const subsetEqArray: boolean[] = [];
      for (const interval2 of intervals2) {
        subsetEqArray.push(interval1.subsetEq(interval2));
      }
      subsetEq = subsetEq && subsetEqArray.some((e)=>e)
    }
    return subsetEq
  }

}

interface IntervalToStringOptions {
  rangeMode?: boolean,
  variableAtom?: string
}