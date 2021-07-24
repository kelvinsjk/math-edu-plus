import { getRandomInts } from '../../fns/random/generateMultiple';
import { encode, decode } from '../../fns/encode/encoders';
import { getNiceQuadratic } from '../../fns/random/generateNice';
//import {
//  getRandomFrac,
//  //getRandomQuadratic, TODO: update
//  getRandomInt, Polynomial, RationalFunction, Fraction, getRandomLinear
//} from 'math-edu';
import {
  getRandomFrac,
  getRandomQuadratic,
  getRandomInt, Polynomial, RationalFunction, Fraction, getRandomLinear
} from  '../../../../math-edu/src/index';


/**
 * generate qn0101: inequalities
 * @param options `{type: 1-6, qnCode: string}
 */
function qn0101(options?: qnOptions): qnOutput {
  // options
  const defaultOptions = {
    type: 0,
    qnCode: ''
  }
  const optionsObject = { ...defaultOptions, ...options };

  // generate variables
  let type: number, sign: string;
  let questions: string[], answers: string[], variables: variablesObjectA | variablesObjectB | variablesObjectCD|variablesObjectE|variablesObjectF;
  if (optionsObject.qnCode) { // qnCode provided
    let restOfVariables: number[];
    [type, sign, ...restOfVariables] = decode(optionsObject.qnCode) as [number, string, ...number[]];
    [variables, questions, answers] = variablesToQn(type, sign, restOfVariables);
  } else {
    // generate qn type
    type = (optionsObject.type === 0) ? getRandomInt(1, 8) : optionsObject.type;
    if (type > 7) { // more chances to get type 1 and 2
      type = (type % 6);
    }
    // generate sign
    const signs = ['<', '>'];
    sign = signs[getRandomInt(0, 1)];
    // generate variables based on qnType
    if (type === 1) {
      [variables, questions, answers] = typeAGenerator(sign);
    } else if (type === 2) { 
      [variables, questions, answers] = typeBGenerator(sign);
    } else if (type === 3 || type === 4) { 
      [variables, questions, answers] = typeCDGenerator(sign, type);
    } else if (type===5) { 
      [variables, questions, answers] = typeEGenerator(sign);
    } else {
      [variables, questions, answers] = typeFGenerator(sign);
    }
  }
  let variablesArray: (number | string)[];
  if (type === 1) {
    variables = variables as variablesObjectA;
    variablesArray =
      [variables.type, variables.sign, variables.root1Int, variables.root2Int,
        variables.root3Num, variables.root3Den, variables.root4Num, variables.root4Den, variables.rhs, variables.numVsDen];
  } else if (type===2) { 
    variables = variables as variablesObjectB;
    variablesArray =
      [variables.type, variables.sign, variables.root1Int, variables.root2Num, variables.root2Den,
      variables.root3Num, variables.root3Den, variables.rhsCoeff, variables.rhsConst, variables.rootsPosition];
  } else if (type===3 || type===4) {
    variables = variables as variablesObjectCD;
    variablesArray =
      [variables.type, variables.sign, variables.a, variables.b, variables.c, variables.root1Num, variables.root1Den,
      (<variablesObjectCD>variables).root2Num, (<variablesObjectCD>variables).root2Den, variables.rhs, (<variablesObjectCD>variables).numVsDen, (<variablesObjectCD>variables).negative]; 
  } else if (type === 5) {
    variables = variables as variablesObjectE;
    variablesArray =
      [variables.type, variables.sign, variables.a, variables.b, variables.c, variables.root1Num, variables.root1Den,
      variables.rhsCoeff, variables.rhsConst, variables.negative];    
  } else { // type 6
    variables = variables as variablesObjectF;
    variablesArray =
      [variables.type, variables.sign, variables.a, variables.b, variables.c, variables.root1Num, variables.root1Den,
      variables.rhs];
  }
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
  variables: variablesObjectA|variablesObjectB|variablesObjectCD|variablesObjectE|variablesObjectF,
  qnCode: string,
  questions: string[],
  answers: string[]
}
interface variablesObjectA {
  root1Int: number,
  root2Int: number,
  root3Num: number,
  root3Den: number,
  root4Num: number,
  root4Den: number,
  rhs: number,
  numVsDen: number,
  sign: string,
  type: number
}
interface variablesObjectB {
  root1Int: number,
  root2Num: number,
  root2Den: number,
  root3Num: number,
  root3Den: number,
  rhsCoeff: number,
  rhsConst: number,
  rootsPosition: number,
  sign: string,
  type: number
}
interface variablesObjectCD {
  a: number,
  b: number,
  c: number, // monic irreducible polynomial ax^2 + bx + c
  root1Num: number,
  root1Den: number,
  root2Num: number,
  root2Den: number,
  rhs: number,
  numVsDen: number,
  negative: number,
  sign: string,
  type: number
}
interface variablesObjectE {
  a: number,
  b: number,
  c: number, // monic irreducible polynomial ax^2 + bx + c
  root1Num: number,
  root1Den: number,
  rhsCoeff: number,
  rhsConst: number,
  negative: number,
  sign: string,
  type: number
}
interface variablesObjectF {
  a: number,
  b: number,
  c: number, // monic irreducible polynomial ax^2 + bx + c
  root1Num: number,
  root1Den: number,
  rhs: number,
  sign: string,
  type: number
}

function variablesToQn(type: number, sign: string, restOfVariables: number[]): [variablesObjectA|variablesObjectB|variablesObjectCD|variablesObjectE|variablesObjectF, string[], string[]] {
  let variables: variablesObjectA|variablesObjectB|variablesObjectCD|variablesObjectE|variablesObjectF;
  if (type === 1) {
    variables = {
      root1Int: restOfVariables[0],
      root2Int: restOfVariables[1],
      root3Num: restOfVariables[2],
      root3Den: restOfVariables[3],
      root4Num: restOfVariables[4],
      root4Den: restOfVariables[5],
      rhs: restOfVariables[6],
      numVsDen: restOfVariables[7],
      sign: sign,
      type: type
    }
    return typeAGenerator(sign, variables);
  } else if (type===2) { 
    variables = {
      root1Int: restOfVariables[0],
      root2Num: restOfVariables[1],
      root2Den: restOfVariables[2],
      root3Num: restOfVariables[3],
      root3Den: restOfVariables[4],
      rhsCoeff: restOfVariables[5],
      rhsConst: restOfVariables[6],
      rootsPosition: restOfVariables[7],
      sign: sign,
      type: type
    }
    return typeBGenerator(sign, variables);
  } else if (type===3 || type===4) { 
    variables = {
      a: restOfVariables[0],
      b: restOfVariables[1],
      c: restOfVariables[2],
      root1Num: restOfVariables[3],
      root1Den: restOfVariables[4],
      root2Num: restOfVariables[5],
      root2Den: restOfVariables[6],
      rhs: restOfVariables[7],
      numVsDen: restOfVariables[8],
      negative: restOfVariables[9],
      sign: sign,
      type: type
    }
    return typeCDGenerator(sign, type, variables);
  } else if (type===5){
    variables = {
      a: restOfVariables[0],
      b: restOfVariables[1],
      c: restOfVariables[2],
      root1Num: restOfVariables[3],
      root1Den: restOfVariables[4],
      rhsCoeff: restOfVariables[5],
      rhsConst: restOfVariables[6],
      negative: restOfVariables[7],
      sign: sign,
      type: type
    }
    return typeEGenerator(sign, variables);    
  } else { // type 6
    variables = {
      a: restOfVariables[0],
      b: restOfVariables[1],
      c: restOfVariables[2],
      root1Num: restOfVariables[3],
      root1Den: restOfVariables[4],
      rhs: restOfVariables[5],
      sign: sign,
      type: type
    }
    return typeFGenerator(sign, variables);    
    
  }
}

function typeAGenerator(sign: string, variables?: variablesObjectA): [variablesObjectA, string[], string[]]{
  let root1Int: number, root2Int: number, root3Num: number, root3Den: number, root4Num: number, root4Den: number, rhs: number, numVsDen: number;
  let quadratic1: Polynomial, quadratic2: Polynomial, roots: Fraction[];

  // generate variables
  if (variables === undefined) {
    // \frac{ax^2+bx+c}{dx^2+ex+f} > g
    rhs = getRandomInt(-9, 9);
    [root1Int, root2Int] = getRandomInts(2);
    quadratic1 = Polynomial.fromRoots(root1Int, root2Int);
    ({ quadratic: quadratic2, roots } = getNiceQuadratic([root1Int, root2Int]));
    root3Num = roots[0].num; root3Den = roots[0].den;
    root4Num = roots[1].num; root4Den = roots[1].den;
    numVsDen = getRandomInt(0, 1); // 0: integer roots below
    variables = {
      root1Int: root1Int, root2Int: root2Int, root3Num: root3Num, root3Den: root3Den,
      root4Num: root4Num, root4Den: root4Den, rhs: rhs, numVsDen: numVsDen, sign: sign, type: 1
    }
  } else {
    ({ root1Int, root2Int, root3Num, root3Den, root4Num, root4Den, rhs, numVsDen } = variables);
    const root3 = new Fraction(root3Num, root3Den), root4 = new Fraction(root4Num, root4Den);
    roots = [root3, root4];
    quadratic1 = Polynomial.fromRoots(root1Int, root2Int);
    quadratic2 = Polynomial.fromRoots(root3, root4)
  }

  // assign numerator vs denominator
  const [num, den] = numVsDen ? [quadratic1, quadratic2] : [quadratic2, quadratic1];
  
  // generate question: rational = \frac{ax^2+bx+c}{dx^2+ex+f} - g
  const rational = new RationalFunction(num, den);
  const qnRational = rational.add(new Polynomial([rhs]));

  // generate qn string
  const qn = `${qnRational} ${sign} ${rhs}`;

  // generate answer: order roots and decide intervals
  const allRoots = [...roots, root1Int, root2Int];
  allRoots.sort((a, b) => a.valueOf() - b.valueOf());
  // since leading coefficients for both num and den positive by construction,
  // interval looks like: + r1 - r2 + r3 - r4 +
  let answers: string[];
  if (sign === ">") {
    answers = [`x < ${allRoots[0]}`, `${allRoots[1]} < x < ${allRoots[2]}`, `x > ${allRoots[3]}`];
  } else {
    answers = [`${allRoots[0]} < x < ${allRoots[1]}`, `${allRoots[2]} < x < ${allRoots[3]}`];
  }
  // return
  return [variables, [qn], answers];
}

function typeBGenerator(sign: string, variables?: variablesObjectB): [variablesObjectB, string[], string[]]{
  let root1Int: number, root2Num: number, root2Den: number, root3Num: number, root3Den: number, rhsCoeff: number, rhsConst: number, rootsPosition: number;
  let quadratic: Polynomial, linear: Polynomial, root2Frac: Fraction, root3Frac: Fraction, rhs: Polynomial;

  // generate variables
  if (variables === undefined) {
    // \frac{ax^2+bx+c}{dx+e} > fx + g
    root1Int = getRandomInt(-9, 9);
    root2Frac = getRandomFrac({ denMin: 1, denMax: 2, avoid: [root1Int] });
    root3Frac = getRandomFrac({ denMin: 1, denMax: 4, avoid: [root1Int, root2Frac] });
    root2Num = root2Frac.num;
    root2Den = root2Frac.den;
    root3Num = root3Frac.num;
    root3Den = root3Frac.den;
    rootsPosition = getRandomInt(0, 1); // 1: r2 r3 / r1; 0: r1r2 / r3; 
    quadratic = rootsPosition ? Polynomial.fromRoots(root2Frac, root3Frac) : Polynomial.fromRoots(root1Int, root2Frac);
    linear = rootsPosition ? new Polynomial([1, -root1Int]) : root3Frac.toFactor();
    rhs = getRandomLinear();
    rhsCoeff = rhs.terms[0].coeff.num;
    rhsConst = rhs.terms[1].coeff.num;
    variables = {
      root1Int: root1Int, root2Num: root2Num, root2Den: root2Den, root3Num: root3Num, root3Den: root3Den,
      rhsCoeff: rhsCoeff, rhsConst: rhsConst, rootsPosition: rootsPosition, sign: sign, type: 2
    }
  } else {
    ({ root1Int, root2Num, root2Den, root3Num, root3Den, rhsCoeff, rhsConst, rootsPosition } = variables);
    root2Frac = new Fraction(root2Num, root2Den), root3Frac = new Fraction(root3Num, root3Den);
    quadratic = rootsPosition ? Polynomial.fromRoots(root2Frac, root3Frac) : Polynomial.fromRoots(root1Int, root2Frac);
    linear = rootsPosition ? new Polynomial([1, -root1Int]) : root3Frac.toFactor();
    rhs = new Polynomial([rhsCoeff, rhsConst]);
  }
  // generate question: rational = \frac{ax^2+bx+c}{dx+e} - rhs
  const rational = new RationalFunction(quadratic, linear);
  const qnRational = rational.add(rhs);

  // generate qn string
  const qn = `${qnRational} ${sign} ${rhs}`;

  // generate answer: order roots and decide intervals
  const allRoots = [root1Int, root2Frac, root3Frac];
  allRoots.sort((a, b) => a.valueOf() - b.valueOf());
  // since leading coefficients for both num and den positive by construction,
  // interval looks like: + r1 - r2 + r3 - r4 +
  let answers: string[];
  if (sign === ">") {
    answers = [`${allRoots[0]} < x < ${allRoots[1]}`, `x > ${allRoots[2]}`];
  } else {
    answers = [`x < ${allRoots[0]}`, `${allRoots[1]} < x < ${allRoots[2]}`];
  }
  // return
  return [variables, [qn], answers];
}

function typeCDGenerator(sign: string, type: number, variables?: variablesObjectCD): [variablesObjectCD, string[], string[]] {
  let a: number, b: number, c: number, root1Num: number, root1Den: number, root2Num: number, root2Den: number, rhs: number, numVsDen: number, negative: number;
  let quadratic1: Polynomial, quadratic2: Polynomial, roots: Fraction[];
  // generate variables
  if (variables === undefined) {
    // \frac{ax^2+bx+c}{dx^2+ex+f} > rhs
    rhs = type === 3 ? 0 : getRandomInt(-9, 9);
    ({ quadratic: quadratic1, roots } = getNiceQuadratic());
    negative = getRandomInt(0, 1);
    quadratic1 = negative ? quadratic1.multiply(-1) : quadratic1;
    root1Num = roots[0].num; root1Den = roots[0].den;
    root2Num = roots[1].num; root2Den = roots[1].den;
    ({ quadratic: quadratic2, coefficients: [a, b, c] } = getRandomQuadratic({ monic: true, complex: true }));
    numVsDen = getRandomInt(0, 1);
    variables = {
      a: a, b: b, c: c, root1Num: root1Num, root1Den: root1Den, root2Num: root2Num, root2Den: root2Den,
      rhs: rhs, numVsDen: numVsDen, sign: sign, type: type, negative: negative
    }
  } else {
    ({ a, b, c, root1Num, root1Den, root2Num, root2Den, rhs, numVsDen, negative } = variables);
    const root3 = new Fraction(root1Num, root1Den), root4 = new Fraction(root2Num, root2Den);
    roots = [root3, root4];
    quadratic1 = Polynomial.fromRoots(root3, root4);
    quadratic1 = negative ? quadratic1.multiply(-1) : quadratic1;
    quadratic2 = new Polynomial([a, b, c])
  }

  // assign numerator vs denominator
  const [num, den] = numVsDen ? [quadratic1, quadratic2] : [quadratic2, quadratic1];

  // generate question: rational = \frac{ax^2+bx+c}{dx^2+ex+f} - g
  const rational = new RationalFunction(num, den);
  const qnRational = rational.add(new Polynomial([rhs]));

  // generate qn string
  const qn = `${qnRational} ${sign} ${rhs}`;

  // generate answer: order roots and decide intervals
  const allRoots = roots;
  allRoots.sort((a, b) => a.valueOf() - b.valueOf());
  // since leading coefficients for both num and den positive by construction,
  // interval looks like: + r1 - r2 + r3 - r4 +
  let answers: string[];
  if ((sign === ">" && negative===0) || (sign==="<" && negative===1)) {
    answers = [`x < ${allRoots[0]}`, `x > ${allRoots[1]}`];
  } else {
    answers = [`${allRoots[0]} < x < ${allRoots[1]}`];
  }
  // return
  return [variables, [qn], answers];
}

function typeEGenerator(sign: string, variables?: variablesObjectE): [variablesObjectE, string[], string[]] {
  let a: number, b: number, c: number, root1Num: number, root1Den: number, rhsCoeff: number, rhsConst: number, negative: number;
  let quadratic1: Polynomial, linear1: Polynomial, linear2: Polynomial, root: Fraction;
  // generate variables
  if (variables === undefined) {
    // \frac{ax^2+bx+c}{dx+e} > fx+g
    ({ quadratic: quadratic1, coefficients: [a, b, c] } = getRandomQuadratic({ monic: true, complex: true }));
    root = getRandomFrac();
    root1Num = root.num;
    root1Den = root.den;
    linear1 = root.toFactor();
    negative = getRandomInt(0, 1);
    linear1 = negative ? linear1.multiply(-1) : linear1;
    linear2 = getRandomLinear();
    rhsCoeff = linear2.terms[0].coeff.num;
    rhsConst = linear2.terms[1].coeff.num;
    variables = {
      a: a, b: b, c: c, root1Num: root1Num, root1Den: root1Den, negative: negative,
      rhsCoeff: rhsCoeff, rhsConst: rhsConst, sign: sign, type: 5
    }
  } else {
    ({ a, b, c, root1Num, root1Den, rhsCoeff, rhsConst, negative} = variables);
    root = new Fraction(root1Num, root1Den);
    quadratic1 = new Polynomial([a, b, c]);
    linear1 = root.toFactor();
    linear1 = negative ? linear1.multiply(-1) : linear1;
    linear2 = new Polynomial([rhsCoeff, rhsConst]);
  }

  // generate question: rational = \frac{ax^2+bx+c}{dx^2+ex+f} - g
  const rational = new RationalFunction(quadratic1, linear1);
  const qnRational = rational.add(linear2);

  // generate qn string
  const qn = `${qnRational} ${sign} ${linear2}`;

  // generate answer: 
  // interval looks like: - r1 + if negative
  let answers: string[];
  if ((sign === ">" && negative===0) || (sign==="<" && negative===1)) {
    answers = [`x > ${root}`];
  } else {
    answers = [`x < ${root}`];
  }
  // return
  return [variables, [qn], answers];
}

function typeFGenerator(sign: string, variables?: variablesObjectF): [variablesObjectF, string[], string[]] {
  let a: number, b: number, c: number, root1Num: number, root1Den: number, rhs: number;
  let quadratic1: Polynomial, linear1: Polynomial, root: Fraction;
  // generate variables
  if (variables === undefined) {
    // \frac{ax^2+bx+c}{dx+e} > fx+g
    ({ quadratic: quadratic1, coefficients: [a, b, c] } = getRandomQuadratic({ monic: true, complex: true }));
    root = getRandomFrac();
    root1Num = root.num;
    root1Den = root.den;
    linear1 = root.toFactor();
    rhs = getRandomInt(-9, 9);
    variables = {
      a: a, b: b, c: c, root1Num: root1Num, root1Den: root1Den,
      rhs: rhs, sign: sign, type: 6
    }
  } else {
    ({ a, b, c, root1Num, root1Den, rhs } = variables);
    root = new Fraction(root1Num, root1Den);
    quadratic1 = new Polynomial([a, b, c]);
    linear1 = root.toFactor();
  }

  // generate question: rational = \frac{ax^2+bx+c}{dx^2+ex+f} - g
  const rational = new RationalFunction(linear1, quadratic1);
  const qnRational = rational.add(new Polynomial([rhs]));

  // generate qn string
  const qn = `${qnRational} ${sign} ${rhs}`;

  // generate answer: 
  // interval looks like: - r1 + if negative
  let answers: string[];
  if (sign === ">") {
    answers = [`x > ${root}`];
  } else {
    answers = [`x < ${root}`];
  }
  // return
  return [variables, [qn], answers];
}

export { qn0101 };