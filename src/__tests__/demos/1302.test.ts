import { qn1302 } from '../../demos/13-complex/1302';

import { encode } from '../../fns/encode/encoders';

const qCode1 = encode(1, 2, -1, 2);
const {
  questions: [q1],
  answers: [a1],
  qnCode: qc1,
} = qn1302({ qnCode: qCode1 });
const {
  questions: [q2],
  answers: [a2],
} = qn1302({ qnCode: '2472' });
const {
  questions: [q3],
  answers: [a3],
} = qn1302({ qnCode: '3EA1' });
const {
  questions: [q4],
  answers: [a4],
} = qn1302({ qnCode: '4HJ4' });

//const { questions: questions, answers: answers, qnCode: qCode } = qn1302({type: 4});
//console.log(questions);
//console.log(answers);
//console.log(qCode);

test('1302', () => {
  expect(q1).toBe('zz^* + 2 z = 3 + 4 \\mathrm{i}');
  expect(a1).toBe('z = - 1 + 2 \\mathrm{i}');
  expect(qc1).toBe('12A2');
  expect(q2).toBe('zz^* + 4 z^* = 81 - 8 \\mathrm{i}');
  expect(a2).toBe('z = 7 + 2 \\mathrm{i}');
  expect(q3).toBe('zz^* - 5 iz = 7 + 5 \\mathrm{i}');
  expect(a3).toBe('z = - 1 + \\mathrm{i}');
  expect(q4).toBe('zz^* - 8 iz^* = 65 + 72 \\mathrm{i}');
  expect(a4).toBe('z = - 9 + 4 \\mathrm{i}');

  for (let i = 0; i < 30; i++) {
    const {
      questions: [q],
      qnCode: qnCode,
    } = qn1302();
    const {
      questions: [q2],
    } = qn1302({ qnCode: qnCode });
    expect(q).toBe(q2);
  }

  expect(() => qn1302({ type: 1 })).not.toThrow();
  expect(() => qn1302({ type: 2 })).not.toThrow();
  expect(() => qn1302({ type: 3 })).not.toThrow();
  expect(() => qn1302({ type: 4 })).not.toThrow();
});
