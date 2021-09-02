import { qn0905 } from '../../../demos/09-definite-integrals/0905';
import { encode } from '../../../fns/encode/encoders';

const qCode1 = encode(1, 1);
const { questions: q1, answers: a1, qnCode: qc1 } = qn0905({ qnCode: qCode1 });
const { questions: q2, answers: a2 } = qn0905({ qnCode: '29' });
const { questions: q3, answers: a3 } = qn0905({ qnCode: '32' });
const { questions: q4, answers: a4 } = qn0905({ qnCode: '43' });
//console.log(q1);
//console.log(a1);
//console.log(qc1);

//const { questions: questions, answers: answers, qnCode } = qn0905();
//console.log(questions);
//console.log(answers);
//console.log(qnCode);

test('0905', () => {
  expect(qc1).toBe('11');
  expect(q1.eqn).toBe('x^2 \\sin x');
  expect(q1.lowerLimit).toBe('0');
  expect(q1.upperLimit).toBe('\\frac{1}{2} \\pi');
  expect(q1.line).toBe('x = \\frac{1}{2} \\pi');
  expect(a1.ansA).toBe('\\pi - 2');
  expect(a1.ansB).toBe('5.391');
  expect(q2.eqn).toBe('81 x^2 \\cos 9 x');
  expect(q2.lowerLimit).toBe('0');
  expect(q2.upperLimit).toBe('\\frac{1}{27} \\pi');
  expect(q2.line).toBe('x = \\frac{1}{27} \\pi');
  expect(a2.ansA).toBe(
    '\\frac{1}{162} \\sqrt{3} \\left( \\pi \\right)^{ 2 } + \\frac{1}{27} \\pi - \\frac{1}{9} \\sqrt{3}',
  );
  expect(a2.ansB).toBe('0.036');
  expect(q3.eqn).toBe('4 x^2 \\mathrm{e}^{ 2 x }');
  expect(q3.lowerLimit).toBe('0');
  expect(q3.upperLimit).toBe('\\frac{1}{2}');
  expect(q3.line).toBe('x = \\frac{1}{2}');
  expect(a3.ansA).toBe('\\frac{1}{2} \\mathrm{e} - 1');
  expect(a3.ansB).toBe('1.724');
  expect(q4.eqn).toBe('\\left( \\ln 3 x \\right)^2');
  expect(q4.lowerLimit).toBe('\\frac{1}{3}');
  expect(q4.upperLimit).toBe('\\frac{2}{3}');
  expect(q4.line).toBe('x = \\frac{2}{3}');
  expect(a4.ansA).toBe('\\frac{2}{3} \\left( \\ln 2 \\right)^2 - \\frac{4}{3} \\ln 2 + \\frac{2}{3}');
  expect(a4.ansB).toBe('0.060');

  for (let i = 0; i < 10; i++) {
    const { questions, qnCode } = qn0905();
    const { questions: q2 } = qn0905({ qnCode: qnCode });
    expect(JSON.stringify(questions)).toBe(JSON.stringify(q2));
  }

  expect(() => qn0905({ type: 1 })).not.toThrow();
  expect(() => qn0905({ type: 2 })).not.toThrow();
  expect(() => qn0905({ type: 3 })).not.toThrow();
  expect(() => qn0905({ type: 4 })).not.toThrow();
});
