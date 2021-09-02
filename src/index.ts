
import {
  Fraction,
  NthRoot,
  SquareRoot,
  Term,
  Expression,
  Polynomial,
  Angle,
  Trig,
  Exp,
  Ln,
  Complex,
  Vector,
  Line,
  Plane,
  gcd,
  factorize,
  solveQuadratic,
  getRandomInt,
  getRandomFrac,
  getRandomLinear,
  getRandomQuadratic,
  getRandomVec,
  RationalFunction,
  ExpFn,
  LnFn,
  PowerFn,
  CosFn,
  SinFn,
  integrate,
} from 'math-edu';
//} from '../../math-edu/src/index';

import Interval from './classes/functions/intervalClass';
import {
  BasicFunction,
  GeneralFunction,
  FunctionChain,
  compose,
  canCompose,
} from './classes/functions/functionClasses';
import Normal from './classes/stats/normal';
import { binomPdf, binomCdf, binomCdfRange, normCdf, invNorm, zTest, numberWithCommas } from './fns/stats/index';
import { bisection, simpsons, cramers, determinant } from './fns/numerical/index';
import { getRandomInts } from './fns/random/generateMultiple';
import { getNiceQuadratic } from './fns/random/generateNice';
import { getRandomPerp } from './fns/random/generateSpecialVectors';

import { encode, decode } from './fns/encode/encoders';

export {
  Fraction,
  NthRoot, SquareRoot,
  Term, Expression, Polynomial,
  Angle,
  Trig,
  Exp, Ln,
  Complex,
  Vector, Line, Plane,
  gcd, factorize,
  solveQuadratic,
  getRandomInt, getRandomFrac, getRandomLinear, getRandomQuadratic, getRandomVec,
  RationalFunction,
  ExpFn, LnFn, PowerFn, SinFn, CosFn,
  integrate,
  //// PLUS
  Interval,
  BasicFunction, GeneralFunction, FunctionChain,
  compose, canCompose,
  getRandomInts,
  getRandomPerp,
  getNiceQuadratic,
  simpsons, bisection,
  cramers, determinant,
  Normal, binomPdf, binomCdf, binomCdfRange, normCdf, invNorm, zTest, numberWithCommas,
  encode, decode,
};
