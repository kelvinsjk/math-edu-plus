import { qn0504 } from '../../../demos/05-sigma-notation/0504';
import { encode } from '../../../fns/encode/encoders';


const qCode1 = encode(2, 1, 0, 1, -1);
const { questions: q1, answers: a1, qnCode: qc1 } = qn0504({ qnCode: qCode1 });
const { questions: q2, answers: a2 } = qn0504({ qnCode: "11122"});
const { questions: q3, answers: a3 } = qn0504({ qnCode: "1211B"});
//console.log(q1);
//console.log(a1);
//console.log(qc1);

//const { questions: questions, answers: answers, qnCode } = qn0504({subtype: 2});
//console.log(questions);
//console.log(answers);
//console.log(qnCode);

test('0504', () => {
  expect(qc1).toBe('2101A');
  expect(q1.uN).toBe('u_n = \\frac{1}{n^2}')
  expect(q1.difference).toBe('u_{ n } - u_{ n + 1 } = \\frac{ 2 n + 1 }{ n^2 ( n + 1 )^2 }');
  expect(q1.summation).toBe('\\sum_{ n = 1 }^N \\frac{ 2 n + 1 }{ n^2 ( n + 1 )^2 }');
  expect(q1.newSummation).toBe('\\sum_{ n = 2 }^N \\frac{ 2 n - 1 }{ n^2 ( n - 1 )^2 }');
  expect(a1.ansB).toBe('1 - \\frac{1}{ ( N + 1 )^2 }');
  expect(a1.tendsToZero).toBe('\\frac{1}{ ( N + 1 )^2 } \\to 0');
  expect(a1.sInf).toBe('= 1');
  expect(a1.ansD).toBe('1 - \\frac{1}{ N^2 }');
  expect(q2.uN).toBe('u_n = \\frac{1}{n}')
  expect(q2.difference).toBe('u_{ n - 1 } - u_{ n } = \\frac{ 1 }{ ( n - 1 ) n }');
  expect(q2.summation).toBe('\\sum_{ n = 3 }^N \\frac{ 1 }{ ( n - 1 ) n }');
  expect(q2.newSummation).toBe('\\sum_{ n = 1 }^N \\frac{ 1 }{ ( n + 2 ) ( n + 1 ) }');
  expect(a2.ansB).toBe('\\frac{1}{2} - \\frac{1}{ N }');
  expect(a2.tendsToZero).toBe('\\frac{1}{ N } \\to 0');
  expect(a2.sInf).toBe('= \\frac{1}{2}');
  expect(a2.ansD).toBe('\\frac{1}{2} - \\frac{1}{ N + 2 }');
  expect(q3.difference).toBe('u_{ n - 1 } - u_{ n + 1 } = \\frac{ 2 }{ ( n - 1 ) ( n + 1 ) }');
  expect(a3.ansB).toBe('\\frac{3}{2} - \\frac{1}{ N } - \\frac{1}{ N + 1 }');

  for (let i = 0; i < 10; i++) {
    const {
      questions,
      qnCode
    } = qn0504();
    const {
      questions: q2,
    } = qn0504({ qnCode: qnCode });
    expect(JSON.stringify(questions)).toBe(JSON.stringify(q2));
  }

  expect(() => qn0504({ type: 1 })).not.toThrow();
  expect(() => qn0504({ type: 2 })).not.toThrow();
  expect(() => qn0504({ subtype: 1 })).not.toThrow();
  expect(() => qn0504({ subtype: 2 })).not.toThrow();
  expect(() => qn0504({ type: 1, subtype: 1 })).not.toThrow();
  expect(() => qn0504({ type: 1, subtype: 2 })).not.toThrow();
  expect(() => qn0504({ type: 2, subtype: 1 })).not.toThrow();
  expect(() => qn0504({ type: 2, subtype: 2 })).not.toThrow();
});
