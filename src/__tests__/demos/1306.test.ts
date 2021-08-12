import { qn1306 } from '../../demos/13-complex/1306';

import { encode } from '../../fns/encode/encoders';

const qCode1 = encode(1, 2, 1, 6, 1);
const { questions: q1, answers: a1, qnCode: qc1 } = qn1306({ qnCode: qCode1 });
const { questions: q2, answers: a2 } = qn1306({ qnCode: '13C4A' });
const { questions: q3, answers: a3 } = qn1306({ qnCode: '2A23A' });

//const { questions: questions, answers: answers, qnCode: qCode } = qn1302({type: 4});
//console.log(questions);
//console.log(answers);
//console.log(qCode);

test('1306', () => {
  expect(q1[0]).toBe('w = 2 \\mathrm{e}^{\\frac{1}{6} \\pi \\mathrm{i}}');
  expect(q1[1]).toBe('w^6 = -k');
  expect(q1[2]).toBe('2 \\mathrm{e}^{\\frac{5}{6} \\pi \\mathrm{i}}');
  expect(q1[3]).toBe('2 \\mathrm{i}');
  expect(q1[4]).toBe('z^6 = -64');
  expect(q1[5]).toBe('z^6 + 64');
  expect(q1[6]).toBe('three');
  expect(q1[7]).toBe(
    '(Hint: you may want to consider expressing 2 \\mathrm{i} in the form 2 \\mathrm{e}^{\\mathrm{i} \\alpha}',
  );
  expect(a1[0]).toBe('k = 64');
  expect(a1[1]).toBe('z^2 - 2 \\sqrt{3} z + 4');
  expect(a1[2]).toBe('z^2 + 2 \\sqrt{3} z + 4');
  expect(a1[3]).toBe('z^2 + 4');
  expect(q2[0]).toBe('w = 3 \\mathrm{e}^{- \\frac{3}{4} \\pi \\mathrm{i}}');
  expect(q2[1]).toBe('w^4 = -k');
  expect(q2[2]).toBe('3 \\mathrm{e}^{- \\frac{1}{4} \\pi \\mathrm{i}}');
  expect(q2[3]).toBe('');
  expect(q2[4]).toBe('z^4 = -81');
  expect(q2[5]).toBe('z^4 + 81');
  expect(q2[6]).toBe('two');
  expect(q2[7]).toBe('');
  expect(a2[0]).toBe('k = 81');
  expect(a2[1]).toBe('z^2 + 3 \\sqrt{2} z + 9');
  expect(a2[2]).toBe('z^2 - 3 \\sqrt{2} z + 9');
  expect(a2[3]).toBe('');
  expect(qc1).toBe('12161');
  expect(q3[0]).toBe('P(z) = z^4 + bz^3 + cz^2 + dz + 50');
  expect(q3[1]).toBe('- 1 + 2 \\mathrm{i}');
  expect(q3[2]).toBe('3 - \\mathrm{i}');
  expect(a3[0]).toBe('P(z) = ( z^2 + 2 z + 5 )( z^2 - 6 z + 10 )');
  expect(a3[1]).toBe('b = - 4');
  expect(a3[2]).toBe('c = 3');
  expect(a3[3]).toBe('d = - 10');

  for (let i = 0; i < 30; i++) {
    const {
      questions: [q],
      qnCode: qnCode,
    } = qn1306();
    const {
      questions: [q2],
    } = qn1306({ qnCode: qnCode });
    expect(q).toBe(q2);
  }

  expect(() => qn1306({ type: 1 })).not.toThrow();
  expect(() => qn1306({ type: 2 })).not.toThrow();
});
