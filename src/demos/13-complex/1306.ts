import { getRandomInts } from '../../fns/random/generateMultiple';
import { encode, decode } from '../../fns/encode/encoders';
//import {
//  getRandomFrac,
//  //getRandomQuadratic, TODO: update
//  getRandomInt, Polynomial, RationalFunction, Fraction, getRandomLinear
//} from 'math-edu';
import { getRandomInt, Angle, Trig, Expression, Complex } from '../../../../math-edu/src/index';

/**
 * generate qn1306: complex
 * @param options `{type: 1-2, qnCode: string}
 */
export function qn1306(options?: qnOptions): qnOutput {
  // options
  const defaultOptions = {
    type: 0,
    qnCode: '',
  };
  const optionsObject = { ...defaultOptions, ...options };

  // generate variables
  let type: number;
  let questions: string[], answers: string[], variables: variablesObjectA | variablesObjectB;
  if (optionsObject.qnCode) {
    // qnCode provided
    let restOfVariables: number[];
    [type, ...restOfVariables] = decode(optionsObject.qnCode) as [number, ...number[]];
    [variables, questions, answers] = variablesToQn(type, restOfVariables);
  } else {
    // generate qn type
    type = optionsObject.type === 0 ? getRandomInt(1, 2) : optionsObject.type;
    if (type === 1) {
      [variables, questions, answers] = typeAGenerator();
    } else {
      // type === 2
      [variables, questions, answers] = typeBGenerator();
    }
  }
  let variablesArray: (number | string)[];
  if (type === 1) {
    variables = variables as variablesObjectA;
    variablesArray = [variables.type, variables.R, variables.m, variables.n, variables.secondSign];
  } else {
    // type 2
    variables = variables as variablesObjectB;
    variablesArray = [variables.type, variables.x1, variables.y1, variables.x2, variables.y2];
  }
  return {
    variables: variables,
    qnCode: encode(...variablesArray),
    questions: questions,
    answers: answers,
  };
}

interface qnOptions {
  type?: number;
  qnCode?: string;
}
interface qnOutput {
  variables: variablesObjectA | variablesObjectB;
  qnCode: string;
  questions: string[];
  answers: string[];
}
interface variablesObjectA {
  R: number;
  m: number;
  n: number;
  secondSign: number;
  type: number;
}
interface variablesObjectB {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  type: number;
}

function variablesToQn(
  type: number,
  restOfVariables: number[],
): [variablesObjectA | variablesObjectB, string[], string[]] {
  let variables: variablesObjectA | variablesObjectB;
  if (type === 1) {
    variables = {
      R: restOfVariables[0],
      m: restOfVariables[1],
      n: restOfVariables[2],
      secondSign: restOfVariables[3],
      type: type,
    };
    return typeAGenerator(variables);
  } else {
    // type 2
    variables = {
      x1: restOfVariables[0],
      y1: restOfVariables[1],
      x2: restOfVariables[2],
      y2: restOfVariables[3],
      type: type,
    };
    return typeBGenerator(variables);
  }
}

function typeAGenerator(variables?: variablesObjectA): [variablesObjectA, string[], string[]] {
  let R: number, m: number, n: number, secondSign: number;

  // generate variables
  if (variables === undefined) {
    // root of the form R exp(i m pi / n)
    R = getRandomInt(2, 3);
    n = getRandomInt(0, 1) ? 4 : 6;
    m = getRandomInt(0, 1) ? 1 : 3;
    if (m === 3 && n === 6) {
      m = 5;
    }
    m = getRandomInt(0, 1) ? m : -m;
    secondSign = getRandomInt(-1, 1, { avoid: [0] });
    variables = {
      R,
      m,
      n,
      secondSign,
      type: 1,
    };
  } else {
    ({ R, m, n, secondSign } = variables);
  }

  // generate question (b) and answer (b)
  const alpha = new Angle((180 * m) / n, false);
  const w = `w = ${R} \\mathrm{e}^{${alpha} \\mathrm{i}}`;
  const wShow = `w^${n} = -k`;
  const k = Math.pow(R, n).toString();
  const kEquals = 'k = ' + k;

  // generate question (c)
  let secondM: number;
  if (n === 4) {
    secondM = Math.abs(m) === 1 ? 3 : 1;
  } else {
    // n === 6
    secondM = Math.abs(m) === 1 ? 5 : 1;
  }
  secondM = secondM * secondSign;
  const beta = new Angle((180 * secondM) / n, false);
  const secondRoot = `${R} \\mathrm{e}^{${beta} \\mathrm{i}}`;
  const thirdRoot = n === 6 ? `${R} \\mathrm{i}` : '';
  const equation = `z^${n} = -${k}`;
  const expression = `z^${n} + ${k}`;
  const numberOfFactors = n === 6 ? `three` : 'two';
  const hint =
    n === 6
      ? `(Hint: you may want to consider expressing ${R} \\mathrm{i} in the form ${R} \\mathrm{e}^{\\mathrm{i} \\alpha}`
      : '';

  // generate answer (c)
  const r2 = Math.pow(R, 2);
  const cosTheta = Trig.cos(alpha);
  const zCoeff = cosTheta.times(-2 * R);
  zCoeff.variable = zCoeff.variable + ' z';
  const quadraticOne = new Expression('z^2', `${zCoeff}`, r2);
  const cosTheta2 = Trig.cos(beta);
  const zCoeff2 = cosTheta2.times(-2 * R);
  zCoeff2.variable = zCoeff2.variable + ' z';
  const quadraticTwo = new Expression('z^2', `${zCoeff2}`, r2);
  const quadraticThree = n === 6 ? `z^2 + ${r2}` : '';

  // store qns, answers
  const qns = [w, wShow, secondRoot, thirdRoot, equation, expression, numberOfFactors, hint];
  const answers = [kEquals, `${quadraticOne}`, `${quadraticTwo}`, quadraticThree];
  // return
  return [variables, qns, answers];
}

function typeBGenerator(variables?: variablesObjectB): [variablesObjectB, string[], string[]] {
  let x1: number, x2: number, y1: number, y2: number;
  // generate variables
  if (variables === undefined) {
    // \frac{ax^2+bx+c}{dx+e} > fx + g
    [x1, y1, x2, y2] = getRandomInts(4, { unique: false, avoid: [0] });
    while (
      (Math.abs(x1) === Math.abs(x2) && Math.abs(y1) === Math.abs(y2)) ||
      Math.abs(x2) === 1 // this condition facilitate testing: triggers with prob 1/18
    ) {
      [x2, y2] = getRandomInts(2, { unique: false, avoid: [0] });
    }
    variables = {
      x1,
      y1,
      x2,
      y2,
      type: 2,
    };
  } else {
    ({ x1, y1, x2, y2 } = variables);
  }
  // generate question
  const root1 = new Complex(x1, y1);
  const root2 = new Complex(x2, y2);
  const e = root1.modulusSquared().times(root2.modulusSquared());
  const polynomialQn = `P(z) = z^4 + bz^3 + cz^2 + dz + ${e}`;

  // generate answers
  const quadraticOne = root1.toQuadratic();
  const quadraticTwo = root2.toQuadratic();
  const polynomial = quadraticOne.multiply(quadraticTwo);
  const b = polynomial.polynomialTerms[1].coeff;
  const c = polynomial.polynomialTerms[2].coeff;
  const d = polynomial.polynomialTerms[3].coeff;

  // store qns/answers
  const qns = [polynomialQn, `${root1}`, `${root2}`];
  const answers = [`P(z) = ( ${quadraticOne} )( ${quadraticTwo} )`, `b = ${b}`, `c = ${c}`, `d = ${d}`];

  // return
  return [variables, qns, answers];
}
