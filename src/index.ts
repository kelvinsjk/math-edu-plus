import {
  Fraction,
  NthRoot,
  SquareRoot,
  Term,
  Expression,
  Polynomial,
  AP,
  GP,
  Angle,
  Trig,
  Exp,
  Ln,
  Complex,
  ComplexExp,
  Vector,
  Line,
  Plane,
  ExpFn,
  LnFn,
  PowerFn,
  PolynomialFn,
  LinearFn,
  CosFn,
  SinFn,
  integrate,
  differentiate,
  maclaurin,
  DE,
  gcd,
  factorize,
  solveQuadratic,
  getRandomInt,
  getRandomFrac,
  getRandomLinear,
  getRandomQuadratic,
  getRandomVec,
  RationalFunction,
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
import { factorial } from 'simple-statistics';

export {
  //// `math-edu` re-exports
  // base
  Fraction,
  NthRoot,
  SquareRoot,
  // algebra
  Term,
  Expression,
  Polynomial,
  // trig
  Angle,
  Trig,
  // exp, ln
  Exp,
  Ln,
  // complex
  Complex,
  ComplexExp,
  // vectors
  Vector,
  Line,
  Plane,
  // sequences and series
  AP,
  GP,
  // functions
  gcd,
  factorize,
  solveQuadratic,
  getRandomInt,
  getRandomFrac,
  getRandomLinear,
  getRandomQuadratic,
  getRandomVec,
  // misc
  RationalFunction,
  // calculus
  ExpFn,
  LnFn,
  PowerFn,
  PolynomialFn,
  LinearFn,
  SinFn,
  CosFn,
  differentiate,
  maclaurin,
  integrate,
  DE,
  //// `math-edu-plus` new features
  // functions: composite and inverse functions, intervals
  Interval,
  BasicFunction,
  GeneralFunction,
  FunctionChain,
  compose,
  canCompose,
  // more random generators
  getRandomInts,
  getRandomPerp,
  getNiceQuadratic,
  // numerical methods
  simpsons,
  bisection,
  cramers,
  determinant,
  // stats
  Normal,
  binomPdf,
  binomCdf,
  binomCdfRange,
  normCdf,
  invNorm,
  zTest,
  factorial, // from 'simple-statistics'
  // helper functions
  numberWithCommas,
  encode,
  decode,
};
