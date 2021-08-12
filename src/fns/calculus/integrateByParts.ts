// import { Fraction } from 'math-edu'; TODO:
import { Fraction, Expression, Angle } from
  'math-edu';
// '../../../../math-edu/src/index';

import ExpFn from '../../classes/calculus/expFnClass';
import PowerFn from '../../classes/calculus/powerFnClass';
import CosFn from '../../classes/calculus/cosFnClass';
import SinFn from '../../classes/calculus/sinFnClass';

/**
 * integration by parts
 * 
 * currently only support (ax+b)^n e^(a'x+b') type with n a non-negative 
 */
export default function integrateByParts(u: PowerFn, vPrime: ExpFn | CosFn | SinFn, limits?: Limits): Expression {
  if (!(u.n.isInteger() && u.n.valueOf() >= 0)) {
    throw new Error('by parts ERROR: n must be a non-negative integer');
  } else {
    const v = vPrime.integral();
    if (u.n.isEqual(0)) { // base case: k1 k2 e^(ax+b)
      if (limits === undefined) {
        const integral = v.multiply(u.coeff);
        return new Expression(integral);
      } else {
        const v = vPrime.integral();
        let firstTerm: Expression, secondTerm: Expression;
        if (v instanceof ExpFn) {
          firstTerm = new Expression(v.valueAt(limits.upper as Fraction | number).multiply(u.coeff));
          secondTerm = new Expression(v.valueAt(limits.lower as Fraction | number).multiply(u.coeff));
        } else {
          firstTerm = new Expression(v.valueAt(limits.upper as Angle | number).multiply(u.coeff));
          secondTerm = new Expression(v.valueAt(limits.lower as Angle | number).multiply(u.coeff));
        }
        return firstTerm.subtract(secondTerm);
      }
    } else { // recursively integrate
      if (limits === undefined) {
        const uv = new Expression(u.multiply(v));
        return uv.subtract(integrateByParts(u.derivative(), v));
      } else {
        const uTerm1 = limits.upper instanceof Angle ? u.algebraicValueAt(limits.upper) : u.valueAt(limits.upper);
        const uTerm2 = limits.lower instanceof Angle ? u.algebraicValueAt(limits.lower) : u.valueAt(limits.lower);
        const vTerm1 = v instanceof ExpFn ? v.valueAt(limits.upper as number | Fraction) : v.valueAt(limits.upper as number | Angle);
        const vTerm2 = v instanceof ExpFn ? v.valueAt(limits.lower as number | Fraction) : v.valueAt(limits.lower as number | Angle);
        const uv = new Expression(vTerm1.multiply(uTerm1)).subtract(vTerm2.multiply(uTerm2));
        return uv.subtract(integrateByParts(u.derivative(), v, limits));
      }
    }
  }
}

interface Limits{
  lower: number | Fraction | Angle,
  upper: number | Fraction | Angle
}