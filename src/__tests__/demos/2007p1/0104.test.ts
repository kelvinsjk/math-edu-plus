import { qn0104 } from '../../../demos/01-eqns-inequalities/0104';

import { encode } from '../../../fns/encode/encoders';

//const qCode1 = encode(1, 1, 2, 4, -2, 3, 1, 3, -1, 2, -1, 2);
const { questions: q1, answers: a1, qnCode: qc1 } = qn0104({ qnCode: '3' });
const { questions: q2, answers: a2 } = qn0104({ qnCode: '9' });
//const { questions: q3, answers: a3 } = qn1306({ qnCode: '2A23A' });

//const { questions: questions, answers: answers, qnCode: qCode } = qn1302({type: 4});
//console.log(questions);
//console.log(answers);
//console.log(qCode);

test('1204', () => {
  expect(qc1).toBe('3');
  expect(q1[0]).toBe('y = \\mathrm{e}^{x} - 3 x');
  expect(a2[0]).toBe(
    '\\pi \\left( \\frac{1}{2} \\mathrm{e}^{10} - \\frac{1}{2} \\mathrm{e}^{8} - 72 \\mathrm{e}^{5} + 54 \\mathrm{e}^{4} + 1647 \\right)',
  );
  expect(a2[1]).toBe('\\alpha = 0.126');
  expect(a2[2]).toBe('\\beta = 3.430');
  expect(a2[3]).toBe('x < 0.126');
  expect(a2[4]).toBe('x > 3.430');
  expect(a2[5]).toBe('23.13');
  expect(q2[0]).toBe('y = \\mathrm{e}^{x} - 9 x');
  expect(a1[0]).toBe(
    '\\pi \\left( \\frac{1}{2} \\mathrm{e}^{10} - \\frac{1}{2} \\mathrm{e}^{8} - 24 \\mathrm{e}^{5} + 18 \\mathrm{e}^{4} + 183 \\right)',
  );
  expect(a1[1]).toBe('\\alpha = 0.619');
  expect(a1[2]).toBe('\\beta = 1.512');
  expect(a1[3]).toBe('x < 0.619');
  expect(a1[4]).toBe('x > 1.512');
  expect(a1[5]).toBe('0.18');

  for (let i = 0; i < 10; i++) {
    const {
      questions: [q],
      qnCode: qnCode,
    } = qn0104();
    const {
      questions: [q2],
    } = qn0104({ qnCode: qnCode });
    expect(q).toBe(q2);
  }
});
