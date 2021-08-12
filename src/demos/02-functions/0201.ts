import { encode, decode } from '../../fns/encode/encoders';
import Interval from '../../classes/functions/intervalClass';
import { BasicFunction, FunctionChain } from '../../classes/functions/functionClasses';

//import {
//  getRandomFrac, TODO: update
//  getRandomInt, 
//  Fraction, getRandomLinear
//} from 'math-edu';
import {
  getRandomFrac,
  getRandomInt,
  Fraction
} from '../../../../math-edu/src/index';


/**
 * generate qn0201: functions
 * @param options `{type: 1-2, qnCode: string}
 */
function qn0201(options?: qnOptions): qnOutput {
  // options
  const defaultOptions = {
    type: 0,
    qnCode: ''
  }
  const optionsObject = { ...defaultOptions, ...options };

  // generate variables
  let type: number;
  let questions: string[], answers: string[], variables: variablesObject;
  if (optionsObject.qnCode) { // qnCode provided
    let restOfVariables: number[];
    [type, ...restOfVariables] = decode(optionsObject.qnCode) as [number, ...number[]];
    [variables, questions, answers] = variablesToQn(type, restOfVariables);
  } else {
    // generate qn type
    type = (optionsObject.type === 0) ? getRandomInt(1, 2) : optionsObject.type;
    // generate variables based on qnType
    if (type === 1) {
      [variables, questions, answers] = typeAGenerator();
    } else {
      [variables, questions, answers] = typeBGenerator();
    }
  }
  const variablesArray = [variables.type, variables.aNum, variables.aDen, variables.c]
  // if (type === 1) {
  //   variables = variables as variablesObject;
  // } else { // type 2
  //   variables = variables as variablesObject;
  //   variablesArray =
  //     [variables.type, variables.sign, variables.a, variables.b, variables.c, variables.root1Num, variables.root1Den,
  //     variables.rhs];
  // }
  return {
    variables: variables,
    qnCode: encode(...variablesArray),
    questions: questions,
    answers: answers
  }
}

interface qnOptions {
  type?: number,
  qnCode?: string
}
interface qnOutput {
  variables: variablesObject,
  qnCode: string,
  questions: string[],
  answers: string[]
}
interface variablesObject {
  aNum: number,
  aDen: number,
  c: number,
  type: number
}

function variablesToQn(type: number, restOfVariables: number[]): [variablesObject, string[], string[]] {
  const variables: variablesObject= {
    aNum: restOfVariables[0],
    aDen: restOfVariables[1],
    c: restOfVariables[2],
    type: type
  }
  if (type === 1) {
    return typeAGenerator(variables);
  } else { // type 2
    return typeBGenerator(variables);
  } 
}

function typeAGenerator(variables?: variablesObject): [variablesObject, string[], string[]] {
  let aNum: number, aDen: number, c: number;

  // generate variables
  if (variables === undefined) {
    // f(x) = 1 / bx - a
    // g(x) = x^2 - c
    const a = getRandomFrac({numMin: 0});
    aNum = a.num;
    aDen = a.den;
    c = getRandomInt(0, 9);
    variables = {aNum: aNum, aDen: aDen, c: c, type: 1}
  } else {
    ({ aNum, aDen, c } = variables);
  }

  // create f(x) = \\frac{1}{bx-a}
  const a = new Fraction(aNum, aDen);
  const Df = [new Interval(-Infinity, a), new Interval(a, Infinity)];
  const bx = new BasicFunction('ax', aDen, { domain: Df });
  const x_MINUS_a = new BasicFunction('x+a', -aNum);
  const reciprocal = new BasicFunction('x^a', -1);
  const fx = new FunctionChain(bx, x_MINUS_a, reciprocal);

  // create g(x) = x^2 - c
  const xSquare = new BasicFunction('x^a', 2);
  const x_MINUS_c = new BasicFunction('x+a', -c);
  const gx = new FunctionChain(xSquare, x_MINUS_c);

  // generate question: fDefinition, fDomain, gDefinition, gDomain
  const real = '\\textrm{for } x \\in \\mathbb{R}';
  const fDomain = `${real}, x \\neq ${a}`;
  const questions = [fx.toString({ definitionMode: true }), fDomain, gx.toString({ definitionMode: true, name: 'g' }), real];

  // generate answer: 0: function that does not exist, 1: reason, 2: definition of function that exists, 3: domain, 4: f inverse, 6: domain
  const answers = ['fg', `R_g = \\left[ 0, \\infty \\right] \\not \\subseteq ${Df[0]} \\cup ${Df[1]} = D_f`];
  const gfx = new FunctionChain(bx, x_MINUS_a, reciprocal, xSquare, x_MINUS_c);
  answers.push(gfx.toString({ name: 'gf', definitionMode: true }));
  answers.push(fDomain);
  answers.push(fx.inverse().toString({ name: 'f^{-1}' }));
  answers.push(`D_{ f^{-1} } = R_f = \\left( -\\infty, 0 \\right) \\cup \\left( 0, \\infty \\right)`);
  // return
  return [variables, questions, answers];
}

function typeBGenerator(variables?: variablesObject): [variablesObject, string[], string[]] {
  let aNum: number, aDen: number, c: number;

  // generate variables
  if (variables === undefined) {
    // f(x) = 1 / bx - a
    // g(x) = x^2, x > -c (\mathbb{R} if c===0)
    const a = getRandomFrac({numMax: -1});
    aNum = a.num;
    aDen = a.den;
    c = getRandomInt(0, 9);
    variables = {aNum: aNum, aDen: aDen, c: c, type: 1}
  } else {
    ({ aNum, aDen, c } = variables);
  }

  // create f(x) = \\frac{1}{bx-a}
  const a = new Fraction(aNum, aDen);
  const Df = [new Interval(-Infinity, a), new Interval(a, Infinity)];
  const bx = new BasicFunction('ax', aDen, { domain: Df });
  const x_MINUS_a = new BasicFunction('x+a', -aNum);
  const reciprocal = new BasicFunction('x^a', -1);
  const fx = new FunctionChain(bx, x_MINUS_a, reciprocal);

  // create g(x) = x^2 
  const Dg = c === 0 ? new Interval() : new Interval(-c);
  const gx = new BasicFunction('x^a', 2, {domain: Dg});

  // generate question: fDefinition, fDomain, gDefinition, gDomain
  const real = '\\textrm{for } x \\in \\mathbb{R}';
  const fDomain = `${real}, x \\neq ${a}`;
  const gDomain = c===0 ? real : `${real}, x > -${c}`
  const questions = [fx.toString({ definitionMode: true }), fDomain, gx.toString({ definitionMode: true, name: 'g' }), gDomain];

  // generate answer: 0: function that does not exist, 1: reason, 2: definition of function that exists, 3: domain, 4: f inverse, 6: domain
  const answers = ['gf', `R_f = \\left( -\\infty, 0 \\right) \\cup \\left( 0, \\infty, \\right) \\not \\subseteq \\left[ 0, \\infty \\right] = D_g`];
  const fgx = new FunctionChain(gx, bx, x_MINUS_a, reciprocal);
  answers.push(fgx.toString({ name: 'fg', definitionMode: true }));
  answers.push(gDomain);
  answers.push(fx.inverse().toString({ name: 'f^{-1}' }));
  answers.push(`D_{ f^{-1} } = R_f = \\left( -\\infty, 0 \\right) \\cup \\left( 0, \\infty \\right)`);
  // return
  return [variables, questions, answers];
}

export { qn0201 };