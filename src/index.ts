//import
//{
//  Fraction,
//  Term,
//  NthRoot,
//  SquareRoot,
//  Expression,
//  Polynomial,
//  gcd,
//  getRandomInt,
//  getRandomFrac,
//  getRandomLinear,
//  getRandomQuadratic,
//  RationalFunction
//} from 'math-edu';
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
import { ExpFn, PowerFn, CosFn, SinFn } from './classes/calculus/index';
import integrateByParts from './fns/calculus/integrateByParts';
import { bisection, simpsons, cramers, determinant } from './fns/numerical/index';
import { getRandomInts } from './fns/random/generateMultiple';
import { getNiceQuadratic } from './fns/random/generateNice';
import { getRandomPerp } from './fns/random/generateSpecialVectors';

import { encode, decode } from './fns/encode/encoders';

export {
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
  //// PLUS
  Interval,
  BasicFunction,
  GeneralFunction,
  FunctionChain,
  compose,
  canCompose,
  getRandomInts,
  getRandomPerp,
  getNiceQuadratic,
  ExpFn,
  PowerFn,
  SinFn,
  CosFn,
  integrateByParts,
  simpsons,
  bisection,
  cramers,
  determinant,
  encode,
  decode,
};
