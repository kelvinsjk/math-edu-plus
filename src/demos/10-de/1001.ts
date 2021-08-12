import { encode, decode } from '../../fns/encode/encoders';
import { getRandomInts } from '../../fns/random/generateMultiple';

//import {
//  getRandomFrac, TODO: update
//  getRandomInt,
//  Fraction, getRandomLinear
//} from 'math-edu';
import { Term, Polynomial, getRandomInt, factorize, Fraction, Expression } from '../../../../math-edu/src/index';

interface variablesObject1a {
  a: number;
  b: number;
  k: number;
  A: number;
  type: number;
  subtype: string;
}
interface variablesObject1b {
  a: number;
  b: number;
  c: number;
  type: number;
  subtype: string;
}

/**
 * generate qn0201: functions
 * @param options `{type: 1, subtype: string, qnCode: string}
 */
function qn1001(options?: qnOptions): qnOutput {
  // options
  const defaultOptions = {
    type: 0,
    subtype: '',
    qnCode: '',
  };
  const optionsObject = { ...defaultOptions, ...options };

  // generate variables
  let type: number, subtype: string;
  let questions: string[], answers: string[], variables: variablesObject1a | variablesObject1b;
  if (optionsObject.qnCode) {
    // qnCode provided
    let restOfVariables: number[];
    [type, subtype, ...restOfVariables] = decode(optionsObject.qnCode) as [number, string, ...number[]];
    [variables, questions, answers] = variablesToQn(type, subtype, restOfVariables);
  } else {
    // generate qn type and subtype
    type = optionsObject.type === 0 ? getRandomInt(1, 1) : optionsObject.type;
    const subtypes = ['a', 'b'];
    subtype = optionsObject.subtype === '' ? subtypes[getRandomInt(0, 1)] : optionsObject.subtype;
    // generate variables
    /// if (type === 1) {
    if (subtype === 'a') {
      [variables, questions, answers] = type1aGenerator();
    } else {
      // subtype === 'b'
      [variables, questions, answers] = type1bGenerator();
    }
    ///}
  }
  // prepare variablesArray for encoding
  let variablesArray: (number | string)[];
  ///if (type === 1) {
  if (subtype === 'a') {
    const variablesA = variables as variablesObject1a;
    variablesArray = [variablesA.type, variablesA.subtype, variablesA.a, variablesA.b, variablesA.k, variablesA.A];
  } else {
    // subtype === 'b'
    const variablesA = variables as variablesObject1b;
    variablesArray = [variablesA.type, variablesA.subtype, variablesA.a, variablesA.b, variablesA.c];
  }
  ///}
  return {
    variables: variables,
    qnCode: encode(...variablesArray),
    questions: questions,
    answers: answers,
  };
}

interface qnOptions {
  type?: number;
  subtype?: string;
  qnCode?: string;
}
interface qnOutput {
  variables: variablesObject1a | variablesObject1b;
  qnCode: string;
  questions: string[];
  answers: string[];
}

function variablesToQn(
  type: number,
  subtype: string,
  restOfVariables: number[],
): [variablesObject1a | variablesObject1b, string[], string[]] {
  /// if (type === 1){
  if (subtype === 'a') {
    const a = restOfVariables[0],
      b = restOfVariables[1],
      k = restOfVariables[2],
      A = restOfVariables[3];
    const variables: variablesObject1a = {
      a: a,
      b: b,
      k: k,
      A: A,
      type: type,
      subtype: subtype,
    };
    return type1aGenerator(variables);
  } else {
    // subtype === 'b'
    const a = restOfVariables[0],
      b = restOfVariables[1],
      c = restOfVariables[2];
    const variables: variablesObject1b = {
      a: a,
      b: b,
      c: c,
      type: type,
      subtype: subtype,
    };
    return type1bGenerator(variables);
  }
  /// }
}

function type1aGenerator(variables?: variablesObject1a): [variablesObject1a, string[], string[]] {
  let a: number, b: number, k: number, A: number;
  // generate variables
  if (variables === undefined) {
    const [a1, b1, k1] = getRandomInts(3, { unique: false, min: 1 });
    A = getRandomInt(-9, 9, { avoid: [0] });
    [[a, b, k]] = factorize(a1, b1, k1);
    variables = {
      a: a,
      b: b,
      k: k,
      A: A,
      subtype: 'a',
      type: 1,
    };
  } else {
    ({ a, b, k, A } = variables);
  }
  // generate question
  const k_dydx = new Term(k, '\\frac{\\mathrm{d}y}{\\mathrm{d}x}');
  const a_MINUS_by = new Polynomial([a, -b], { ascending: true, variableAtom: 'y' });
  const qn = `${k_dydx} = ${a_MINUS_by}`;
  const qnVariable1 = 'y',
    qnVariable2 = 'x';
  // initial conditions
  const initialY = new Fraction(a - A, b);
  const qnInitial1 = `y = ${initialY}`,
    qnInitial2 = 'x = 0';
  // answer
  const a_OVER_b = new Fraction(a, b);
  const negativeB_OVER_k = new Term(new Fraction(-b, k), 'x');
  const expTerm = new Term(new Fraction(-A, b), `\\mathrm{e}^{${negativeB_OVER_k}}`);
  const ansExpression = new Expression(a_OVER_b, expTerm);
  const ansA = `y = ${ansExpression}`;
  const ansB = `y \\to ${a_OVER_b}`;
  // return
  return [variables, [qn, qnVariable1, qnVariable2, qnInitial1, qnInitial2], [ansA, ansB]];
}

function type1bGenerator(variables?: variablesObject1b): [variablesObject1b, string[], string[]] {
  let a: number, b: number, c: number;
  // generate variables
  if (variables === undefined) {
    [a, b] = getRandomInts(2, { unique: false, min: 1 });
    c = getRandomInt(-9, 9, { avoid: [0] });
    variables = {
      a: a,
      b: b,
      c: c,
      subtype: 'b',
      type: 1,
    };
  } else {
    ({ a, b, c } = variables);
  }
  // generate question
  const dydx = new Term(1, '\\frac{\\mathrm{d}y}{\\mathrm{d}x}');
  const by = new Term(b, 'y');
  const a_EXP_NEGATIVE_by = new Term(a, `\\mathrm{e}^{${by}}`);
  const qn = `${dydx} = ${a_EXP_NEGATIVE_by}`;
  const qnVariable1 = 'x',
    qnVariable2 = 'y';
  // initial conditions
  const initialX = new Fraction(c - 1, a * b);
  const qnInitial1 = `x = ${initialX}`,
    qnInitial2 = 'y = 0';
  // answer
  const c_OVER_ab = new Fraction(c, a * b);
  const NEGATIVE_1_OVER_ab = new Fraction(-1, a * b);
  const NEGATIVE_by = by.negative();
  const expTerm = new Term(NEGATIVE_1_OVER_ab, `\\mathrm{e}^{${NEGATIVE_by}}`);
  const ansExpression = new Expression(c_OVER_ab, expTerm);
  const ansA = `x = ${ansExpression}`;
  const ansB = `x \\to ${c_OVER_ab}`;
  // return
  return [variables, [qn, qnVariable1, qnVariable2, qnInitial1, qnInitial2], [ansA, ansB]];
}

export { qn1001 };
