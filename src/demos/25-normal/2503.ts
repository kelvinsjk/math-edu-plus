import { getRandomInt } from 'math-edu';
//import { performance } from 'perf_hooks';

//import { ExpFn, PowerFn, bisection, simpsons, integrateByParts, encode, decode, getRandomInt, Expression } from 'math-edu-plus';
import { Normal, encode, decode } from '../../index';

interface VariablesObject {
  type: number;
  xMuGen: number;
  xSigma10: number;
  xPriceGen: number;
  yMuGen: number;
  ySigmaGen: number;
  yPrice: number;
  xAdd10: number;
  yAddGen: number;
}

/**
 * generate qn2503: normal distribution
 * @param options `{qnCode: string}
 */
function qn2503(options?: { qnCode?: string; type?: number }): qnOutput {
  // options
  const defaultOptions = {
    qnCode: '',
    type: 0,
  };
  const optionsObject = { ...defaultOptions, ...options };

  // generate variables
  let questions: QnContainer, answers: AnswerContainer, variables: VariablesObject;
  if (optionsObject.qnCode) {
    // qnCode provided
    const numbers = decode(optionsObject.qnCode) as number[];
    variables = {
      type: numbers[0],
      xMuGen: numbers[1],
      xSigma10: numbers[2],
      xPriceGen: numbers[3],
      yMuGen: numbers[4],
      ySigmaGen: numbers[5],
      yPrice: numbers[6],
      xAdd10: numbers[7],
      yAddGen: numbers[8],
    };
    [variables, questions, answers] = variablesToQn(variables);
  } else {
    const type = optionsObject.type === 0 ? getRandomInt(1, 2) : optionsObject.type;
    const xMuGen = getRandomInt(0, 9);
    const xMu10 = 15 + xMuGen;
    const xSigma10 = getRandomInt(1, Math.min(8, Math.floor(xMu10 / 3)));
    const xPriceGen = getRandomInt(1, 9);
    const yMuGen = getRandomInt(0, 9);
    const ySigmaGen = getRandomInt(0, 9);
    const yPrice = getRandomInt(1, 9);
    const xAdd10 = getRandomInt(1, Math.min((2 * xPriceGen * xSigma10) / 2, 9));
    const yAddGen = getRandomInt(1, 9);
    variables = { type, xMuGen, xSigma10, xPriceGen, yMuGen, ySigmaGen, yPrice, xAdd10, yAddGen };
    [variables, questions, answers] = variablesToQn(variables);
  }
  const variablesArray = [
    variables.type,
    variables.xMuGen,
    variables.xSigma10,
    variables.xPriceGen,
    variables.yMuGen,
    variables.ySigmaGen,
    variables.yPrice,
    variables.xAdd10,
    variables.yAddGen,
  ];
  return {
    variables,
    qnCode: encode(...variablesArray),
    questions: questions,
    answers: answers,
  };
}

interface qnOutput {
  variables: VariablesObject;
  qnCode: string;
  questions: QnContainer;
  answers: AnswerContainer;
}
interface QnContainer {
  xMu: number;
  xSigma: number;
  yMu: number;
  ySigma: number;
  xPrice: number;
  yPrice: number;
  exceedPrice1: number;
  exceedPrice2: number;
}
interface AnswerContainer {
  ansA: string;
  ansB: string;
  ansC: string;
  ansD?: string;
}

function variablesToQn(variables: VariablesObject): [VariablesObject, QnContainer, AnswerContainer] {
  const { type, xMuGen, xSigma10, xPriceGen, yMuGen, ySigmaGen, yPrice, xAdd10, yAddGen } = variables;

  const xMu10 = 15 + xMuGen;
  const xMu = xMu10 / 10;
  const xSigma = xSigma10 / 10;
  const xPrice = xPriceGen / 2;

  const yMu10 = 80 + yMuGen * 5;
  const yMu = yMu10 / 10;
  const ySigma10 = 15 + ySigmaGen;
  const ySigma = ySigma10 / 10;

  const exceedPrice1 = (xMu10 * xPriceGen + 2 * xAdd10) / 20;

  const yAdd10 = yAddGen * 5;
  const exceedPrice2 = (yMu10 * yPrice + yAdd10) / 10;

  // question
  const questions: QnContainer = {
    xMu,
    xSigma,
    xPrice,
    yMu,
    ySigma,
    yPrice,
    exceedPrice1,
    exceedPrice2,
  };

  // answer
  const X = new Normal(xMu * xPrice, xPrice * xPrice * xSigma * xSigma);
  const Y = new Normal(yMu * yPrice, yPrice * yPrice * ySigma * ySigma);

  const p1 = X.moreThan(exceedPrice1);
  const p2Y = Y.moreThan(exceedPrice2);
  const p2 = p1 * p2Y;

  const XPlusY = X.plus(Y);
  const p3 = XPlusY.moreThan(exceedPrice1 + exceedPrice2);

  const XMass = new Normal(xMu, xSigma * xSigma);
  const YMass = new Normal(yMu, ySigma * ySigma);
  const X1X5MinusY = XMass.sum(5).minus(YMass);
  const p4 = X1X5MinusY.lessThan(0);

  const answers: AnswerContainer = {
    ansA: p1.toPrecision(3) + '.',
    ansB: p2.toPrecision(3) + '.',
    ansC: p4.toFixed(4) + '.',
  };
  if (type === 1) {
    answers.ansC = p3.toPrecision(3) + '.';
    answers['ansD'] = 'The event in part (ii) is a subset of the event in part (iii).';
  }
  return [variables, questions, answers];
}

export { qn2503 };
