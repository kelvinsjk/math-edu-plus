import { qn0404 } from '../../demos/04-apgp/0404';

import { encode } from '../../fns/encode/encoders';

const qCode1 = encode(1, 3, 2, 4);
const {
  questions: [q1M, q1N, q1A, q1B],
  answers: [a1a, a1b, a1c],
  qnCode: qc1,
} = qn0404({ qnCode: qCode1 });
const {
  questions: [q2M, q2N, q2A, q2B],
  answers: [a2a, a2b, a2c],
  qnCode: qc2,
} = qn0404({ qnCode: '2534' });

//console.log(q2A);
//console.log(q2B);
//console.log(q2C);
//console.log(q2D);
//console.log(a2a1);
//console.log(a2a2);
//console.log(a2b1);
//console.log(a2b2);
//console.log(a2c1);
//console.log(a2c2);
//console.log(qc2);

//const { questions: questions, answers: answers, qnCode: qCode } = qn1001({type: 1});
//console.log(questions);
//console.log(answers);
//console.log(qCode);

test('0404', () => {
  expect(q1M).toBe('fourth');
  expect(q1N).toBe('sixth');
  expect(q1A).toBe('3 r^2 - 5 r + 2 = 0');
  expect(q1B).toBe('4 a');
  expect(a1a).toBe('-1 < r = \\frac{2}{3} < 1');
  expect(a1b).toBe('S_\\infty = 3 a');
  expect(a1c).toBe('\\{ n \\in \\mathbb{Z}: 6 \\leq n \\leq 13 \\}');
  expect(qc1).toBe('1324');
  expect(q2M).toBe('sixth');
  expect(q2N).toBe('ninth');
  expect(q2A).toBe('25 d^2 + 2 ad = 0');
  expect(q2B).toBe('4 a');
  expect(a2a).toBe('-1 < r = \\frac{3}{5} < 1');
  expect(a2b).toBe('S_\\infty = \\frac{5}{2} a');
  expect(a2c).toBe('\\{ n \\in \\mathbb{Z}: 5 \\leq n \\leq 21 \\}');
  expect(qc2).toBe('2534');

  for (let i = 0; i < 30; i++) {
    const {
      questions: [q],
      qnCode: qnCode,
    } = qn0404();
    const {
      questions: [q2],
    } = qn0404({ qnCode: qnCode });
    expect(q).toBe(q2);
  }

  expect(() => qn0404({ type: 1 })).not.toThrow();
  expect(() => qn0404({ type: 2 })).not.toThrow();
  //expect(() => qn1302({type: 3})).not.toThrow();
  //expect(() => qn1302({type: 4})).not.toThrow();
});
