import { qn1001 } from '../../demos/10-de/1001';

import { encode } from '../../fns/encode/encoders';

const qCode1 = encode(1, 'a', 2, 3, 4, 'D');
const {
  questions: [q1, q1Y, q1X, q1Y0, q1X0],
  answers: [a1a, a1b],
  qnCode: qc1,
} = qn1001({ qnCode: qCode1 });
const {
  questions: [q2, q2Y, q2X, q2Y0, q2X0],
  answers: [a2a, a2b],
  qnCode: qc2,
} = qn1001({ qnCode: '1b859' });

//console.log(q2);
//console.log(q2Y);
//console.log(q2X);
//console.log(q2Y0);
//console.log(q2X0);
//console.log(a2a);
//console.log(a2b);
//console.log(qc2);

//const { questions: questions, answers: answers, qnCode: qCode } = qn1001({type: 1});
//console.log(questions);
//console.log(answers);
//console.log(qCode);

test('1001', () => {
  expect(q1).toBe('4 \\frac{\\mathrm{d}y}{\\mathrm{d}x} = 2 - 3 y');
  expect(q1Y).toBe('y');
  expect(q1X).toBe('x');
  expect(q1Y0).toBe('y = 2');
  expect(q1X0).toBe('x = 0');
  expect(a1a).toBe('y = \\frac{2}{3} + \\frac{4}{3} \\mathrm{e}^{- \\frac{3}{4} x}');
  expect(a1b).toBe('y \\to \\frac{2}{3}');
  expect(qc1).toBe('1a234D');
  expect(q2).toBe('\\frac{\\mathrm{d}y}{\\mathrm{d}x} = 8 \\mathrm{e}^{5 y}');
  expect(q2Y).toBe('x');
  expect(q2X).toBe('y');
  expect(q2Y0).toBe('x = \\frac{1}{5}');
  expect(q2X0).toBe('y = 0');
  expect(a2a).toBe('x = \\frac{9}{40} - \\frac{1}{40} \\mathrm{e}^{- 5 y}');
  expect(a2b).toBe('x \\to \\frac{9}{40}');
  expect(qc2).toBe('1b859');

  for (let i = 0; i < 30; i++) {
    const {
      questions: [q],
      qnCode: qnCode,
    } = qn1001();
    const {
      questions: [q2],
    } = qn1001({ qnCode: qnCode });
    expect(q).toBe(q2);
  }

  expect(() => qn1001({ type: 1, subtype: 'a' })).not.toThrow();
  expect(() => qn1001({ type: 1, subtype: 'b' })).not.toThrow();
  //expect(() => qn1302({type: 3})).not.toThrow();
  //expect(() => qn1302({type: 4})).not.toThrow();
});
