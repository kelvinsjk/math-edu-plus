import { getRandomInt } from 'math-edu';
//import { performance } from 'perf_hooks';

//import { ExpFn, PowerFn, bisection, simpsons, integrateByParts, encode, decode, getRandomInt, Expression } from 'math-edu-plus';
import { encode, decode, numberWithCommas } from '../../index';
import { factorial } from 'simple-statistics';

interface VariablesObject {
  type: number,
  subtype: string,
  couples: number,
  singles: number,
}

/**
 * generate qn2503: normal distribution
 * @param options `{qnCode: string}
 */
function qn2103(options?: { qnCode?: string, type?: number, subtype?: string }): qnOutput {
  // options
  const defaultOptions = {
    qnCode: '',
    type: 0,
    subtype: '',
  };
  const optionsObject = { ...defaultOptions, ...options };

  // generate variables
  let questions: QnContainer, answers: AnswerContainer, variables: VariablesObject;
  if (optionsObject.qnCode) {
    // qnCode provided
    const numbers = decode(optionsObject.qnCode) as [number, string, ...number[]];
    variables = {
      type: numbers[0],
      subtype: numbers[1],
      couples: numbers[2],
      singles: numbers[3],
    };
    [variables, questions, answers] = variablesToQn(variables);
  } else {
    const subtypes = ['a', 'b']
    const type = optionsObject.type === 0 ? getRandomInt(1, 2) : optionsObject.type;
    const subtype = optionsObject.subtype === '' ? subtypes[getRandomInt(0, 1)] : optionsObject.subtype;
    const couples = subtype === 'a' ? getRandomInt(3, 6) : getRandomInt(3,5);
    const singles = subtype === 'a' ? 0 : getRandomInt(1, 6-couples);
    variables = { type, subtype, couples, singles };
    [variables, questions, answers] = variablesToQn(variables);
  }
  const variablesArray = [variables.type, variables.subtype, variables.couples, variables.singles];
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
  total: number,
  couples: number,
  singles: number,
  men: string,
  women: string,
}
interface AnswerContainer {
  ansIA: string,
  ansIB: string,
  ansIC?: string,
  ansID?: string,
  ansIIA: string,
  ansIIB: string,
  ansIIC: string,
  ansIID?: string,
}

function variablesToQn(variables: VariablesObject): [VariablesObject, QnContainer, AnswerContainer] {
  const { subtype, couples, singles } = variables;

  const total = 2 * (couples + singles);
  const men = singles === 2 ? 'men' : 'man';
  const women = singles === 2 ? 'women' : 'woman';

  // question
  const questions: QnContainer = {
    total, couples, singles, men, women
  };

  // answer
  const ansIA =  numberWithCommas(factorial(total)) + '.'; // total
  const ansIIA = numberWithCommas(factorial(total - 1)) + '.'; // total, circle
  const ansIB =  numberWithCommas(factorial(2*singles+couples)*Math.pow(2, couples)) + '.'; // couples together
  const ansIID = numberWithCommas(factorial(2 * singles + couples - 1) * Math.pow(2, couples)) + '.'; // couples together, circle
  const ansIC =  numberWithCommas(factorial(singles + couples) * factorial(singles + couples) * 2) + '.'; // alternate
  const ansIIB = numberWithCommas(factorial(singles + couples) * factorial(singles + couples - 1)) + '.'; // alternate, circle
  const ansID =  numberWithCommas(factorial(couples + singles) * factorial(singles) * 2) + '.'; // alternate, couples together
  const ansIIC = numberWithCommas(factorial(couples + singles - 1) * factorial(singles) * 2) + '.'; // alternate, couples together, circle

  const answers: AnswerContainer = subtype === 'a' ? {
    ansIA, ansIB, ansIIA, ansIIB, ansIIC, 
  } : {
    ansIA, ansIB, ansIC, ansID, ansIIA, ansIIB, ansIIC, ansIID
  }

  return [variables, questions, answers];
}

export { qn2103 };
