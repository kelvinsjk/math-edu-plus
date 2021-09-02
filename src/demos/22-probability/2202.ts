import { getRandomInt, Fraction } from 'math-edu';
//import { performance } from 'perf_hooks';

//import { ExpFn, PowerFn, bisection, simpsons, integrateByParts, encode, decode, getRandomInt, Expression } from 'math-edu-plus';
import { encode, decode } from '../../index';

interface VariablesObject {
  type: number,
  k: number,
  atLeast: number,
  iiiDays: number,
  ivDays: number,
}

/**
 * generate qn2202: probability
 * @param options `{qnCode: string}
 */
function qn2202(options?: { qnCode?: string, type?: number }): qnOutput {
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
      k: numbers[1],
      atLeast: numbers[2],
      iiiDays: numbers[3],
      ivDays: numbers[4],
    };
    [variables, questions, answers] = variablesToQn(variables);
  } else {
    const type = optionsObject.type === 0 ? getRandomInt(1, 3) : optionsObject.type;
    let k: number;
    if (type === 1) {
      k = getRandomInt(5, 9);
    } else if (type === 2) {
      k = getRandomInt(3, 9);
    } else {
      k = getRandomInt(2, 8);
    }
    const atLeast = getRandomInt(0, 1);
    const iiiDays = getRandomInt(1, 2);
    const ivDays = getRandomInt(1, 2);
    variables = { type, k, atLeast, iiiDays, ivDays };
    [variables, questions, answers] = variablesToQn(variables);
  }
  const variablesArray = [variables.type, variables.k, variables.atLeast, variables.iiiDays, variables.ivDays];
  return {
    variables,
    qnCode: encode(...variablesArray),
    questions: questions,
    answers: answers,
  };
}

interface qnOutput {
  variables: VariablesObject,
  qnCode: string,
  questions: QnContainer,
  answers: AnswerContainer
}
interface QnContainer {
  p: string,
  probabilityOfRain: string,
  probabilityBulletOne: string,
  probabilityBulletTwo: string,
  atLeast: string,
  iiiOneOrTwo: string
  ivOneOrTwo: string
}
interface AnswerContainer {
  ansB: string,
  ansC: string,
  ansD: string,
}

function variablesToQn(variables: VariablesObject): [VariablesObject, QnContainer, AnswerContainer] {
  const { type, k, atLeast, iiiDays, ivDays } = variables;

  const oneDayArray = ['one day', 'two days'];
  let p: string, probabilityOfRain = '', probabilityBulletOne: string, probabilityBulletTwo: string;
  let ansB: string, ansC: string, ansD: string;
  if (type === 1 || type === 2) {
    const prob = new Fraction(1, k);
    p = `${prob}.`;
    probabilityOfRain = ' the probability of rain is';
    if (type === 1) {
      probabilityBulletOne = 'twice the probability of rain the previous day if it rained the previous day,';
      probabilityBulletTwo = 'the same as the probability of rain the previous day if it did not rain the previous day.';
      // answers
      const prob2 = prob.times(2);
      const prob3 = prob.times(4);
      const q = Fraction.ONE.minus(prob);
      const q2 = Fraction.ONE.minus(prob2);
      const q3 = Fraction.ONE.minus(prob3);
      const RRR = prob.times(prob2).times(prob3);
      ansB = `${RRR}.`;
      const RRD = prob.times(prob2).times(q3);
      const RDR = prob.times(q2).times(prob2);
      const RDD = prob.times(q2).times(q2);
      const DRR = q.times(prob).times(prob2);
      const DRD = q.times(prob).times(q2);
      const DDR = q.times(q).times(prob);
      const DDD = q.times(q).times(q);
      const exactlyOnce = DDR.plus(DRD).plus(RDD);
      const exactlyTwice = RRD.plus(RDR).plus(DRR);
      if (atLeast === 0) { // at most
        ansC = iiiDays === 1 ? `${exactlyOnce.plus(DDD)}.` : `${exactlyOnce.plus(exactlyTwice).plus(DDD)}.`;
      } else { // at least 
        ansC = iiiDays === 1 ? `${exactlyOnce.plus(exactlyTwice).plus(RRR)}.` : `${exactlyTwice.plus(RRR)}.`;
      }
      ansD = ivDays === 1 ?
        `${DDR.divide(exactlyOnce)}.`
        : `${RDR.plus(DRR).divide(exactlyTwice)}.`;
    } else { // type === 2
      const pOverTwo = prob.divide(2);
      probabilityBulletOne = `${pOverTwo} higher than the probability of rain the previous day if it rained the previous day,`;
      probabilityBulletTwo = 'half the probability of rain the previous day if it did not rain the previous day.';
      const q = Fraction.ONE.minus(prob);
      const p21 = prob.plus(pOverTwo);
      const q21 = Fraction.ONE.minus(p21);
      const p31 = p21.plus(pOverTwo);
      const q31 = Fraction.ONE.minus(p31);
      const p32 = p21.divide(2);
      const q32 = Fraction.ONE.minus(p32);
      const p22 = prob.divide(2);
      const q22 = Fraction.ONE.minus(p22);
      const p33 = p22.plus(pOverTwo);
      const q33 = Fraction.ONE.minus(p33);
      const p34 = p22.divide(2);
      const q34 = Fraction.ONE.minus(p34);

      const RRR = prob.times(p21).times(p31);
      const RRD = prob.times(p21).times(q31);
      const RDR = prob.times(q21).times(p32);
      const RDD = prob.times(q21).times(q32);
      const DRR = q.times(p22).times(p33);
      const DRD = q.times(p22).times(q33);
      const DDR = q.times(q22).times(p34);
      const DDD = q.times(q22).times(q34);

      ansB = `${RRR}.`;

      const exactlyOnce = RDD.plus(DRD).plus(DDR);
      const exactlyTwice = RRD.plus(RDR).plus(DRR);
      if (atLeast === 0) { // at most
        ansC = iiiDays === 1 ? `${exactlyOnce.plus(DDD)}.` : `${exactlyOnce.plus(exactlyTwice).plus(DDD)}.`;
      } else { // at least 
        ansC = iiiDays === 1 ? `${exactlyOnce.plus(exactlyTwice).plus(RRR)}.` : `${exactlyTwice.plus(RRR)}.`;
      }
      ansD = ivDays === 1 ?
        `${DDR.divide(exactlyOnce)}.`
        : `${RDR.plus(DRR).divide(exactlyTwice)}.`;
    }
  } else { // type === 3
    p = `0.${k}.`;
    probabilityBulletOne = `the probability that it rains, given that it rained the previous day, is 0.${k + 1},`;
    const q = 10 - k;
    probabilityBulletTwo = `the probability that it does not rain, given that it did not rain the previous day, is 0.${q + 1}.`;
    const pRained = k + 1;
    const qRained = 10 - k - 1;
    const qDidNotRain = q + 1;
    const pDidNotRain = 10 - q - 1;

    const RRR = k * pRained * pRained;
    const RRD = k * pRained * qRained;
    const RDR = k * qRained * pDidNotRain;
    const RDD = k * qRained * qDidNotRain;
    const DRR = q * pDidNotRain * pRained;
    const DRD = q * pDidNotRain * qRained;
    const DDR = q * qDidNotRain * pDidNotRain;
    const DDD = q * qDidNotRain * qDidNotRain;

    const exactlyOnce = RDD + DRD + DDR;
    const exactlyTwice = RRD + RDR + DRR;

    ansB = `${RRR/1000}.`;


    if (atLeast === 0) { // at most
      ansC = iiiDays === 1 ? `${(exactlyOnce + DDD) / 1000}.` : `${(exactlyOnce + exactlyTwice + DDD) / 1000}.`;
    } else { // at least 
      ansC = iiiDays === 1 ? `${(exactlyOnce + exactlyTwice + RRR) / 1000}.` : `${(exactlyTwice + RRR) / 1000}.`;
    }
    ansD = ivDays === 1 ?
      `${new Fraction(DDR, exactlyOnce)}.`
      : `${new Fraction(RDR + DRR, exactlyTwice)}.`;
  }
  const iiiOneOrTwo = oneDayArray[iiiDays - 1]+'.';
  const ivOneOrTwo = oneDayArray[ivDays - 1]+'.';
  // question
  const questions: QnContainer = {
    p, probabilityOfRain, probabilityBulletOne, probabilityBulletTwo, atLeast: atLeast===1 ? 'at least' : 'at most', iiiOneOrTwo, ivOneOrTwo
  };

  // answer
  const answers: AnswerContainer = {
    ansB, ansC, ansD
  }

  return [variables, questions, answers];
}

export { qn2202 };
