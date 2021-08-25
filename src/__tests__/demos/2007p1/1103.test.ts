import { qn1103 } from '../../../demos/11-vectors-i/1103';

import { encode } from '../../../fns/encode/encoders';

const qCode1 = encode('a', 'a', 'a', 1, -1, 2, 2, 4, 1, -4, 2, 2, 1, 2);
const {
  questions: [q1A, q1B, q1Ratio, q1C, q1Triangle],
  answers: [a1V, a1A],
  qnCode: qc1,
} = qn1103({ qnCode: qCode1 });
const {
  questions: [q2A, q2B, q2Ratio, q2C, q2Triangle],
  answers: [a2V, a2A],
  qnCode: qc2,
} = qn1103({ qnCode: 'aab985E0910F11' });
const {
  questions: [q3A, q3B, q3Ratio, q3C, q3Triangle],
  answers: [a3V, a3A],
  qnCode: qc3,
} = qn1103({ qnCode: 'aba125AB18E551' });
const {
  questions: [q4A, q4B, q4Ratio],
  answers: [a4V],
} = qn1103({ qnCode: 'bbb7DD0G7C1B35' });
const {
  questions: [q5A, q5B, q5Ratio],
  answers: [a5V],
} = qn1103({ qnCode: 'baaH899084CC11' });

test('1001', () => {
  expect(q1A).toBe('\\mathbf{i} - \\mathbf{j} + 2 \\mathbf{k}');
  expect(q1B).toBe('2 \\mathbf{i} + 4 \\mathbf{j} + \\mathbf{k}');
  expect(q1C).toBe('- 4 \\mathbf{i} + 2 \\mathbf{j} + 2 \\mathbf{k}');
  expect(q1Ratio).toBe('AV:VB = 1:2');
  expect(q1Triangle).toBe('OAC');
  expect(a1V).toBe('\\frac{1}{3} ( 4 \\mathbf{i} + 2 \\mathbf{j} + 5 \\mathbf{k} )');
  expect(a1A).toBe('\\sqrt{35}');
  expect(qc1).toBe('aaa1A2241D2212');
  expect(q2A).toBe('9 \\mathbf{i} + 8 \\mathbf{j} + 5 \\mathbf{k}');
  expect(q2B).toBe('- 5 \\mathbf{i} + 9 \\mathbf{k}');
  expect(q2C).toBe('\\mathbf{i} - 6 \\mathbf{k}');
  expect(q2Ratio).toBe('AV:VB = 1:1');
  expect(q2Triangle).toBe('OBC');
  expect(a2V).toBe('2 \\mathbf{i} + 4 \\mathbf{j} + 7 \\mathbf{k}');
  expect(a2A).toBe('\\frac{21}{2}');
  expect(qc2).toBe('aab985E0910F11');
  expect(q3A).toBe('\\mathbf{i} + 2 \\mathbf{j} + 5 \\mathbf{k}');
  expect(q3B).toBe('- \\mathbf{i} - 2 \\mathbf{j} + \\mathbf{k}');
  expect(q3C).toBe('8 \\mathbf{i} - 5 \\mathbf{j} + 5 \\mathbf{k}');
  expect(q3Ratio).toBe('AV:AB = 5:6');
  expect(q3Triangle).toBe('OAC');
  expect(a3V).toBe('\\frac{1}{3} ( - 2 \\mathbf{i} - 4 \\mathbf{j} + 5 \\mathbf{k} )');
  expect(a3A).toBe('\\frac{7}{2} \\sqrt{59}');
  expect(qc3).toBe('aba125AB18E551');
  expect(q5A).toBe('- 8 \\mathbf{i} + 8 \\mathbf{j} + 9 \\mathbf{k}');
  expect(q5B).toBe('9 \\mathbf{i} + 8 \\mathbf{k}');
  expect(q5Ratio).toBe('AB:BV = 1:1');
  expect(a5V).toBe('26 \\mathbf{i} - 8 \\mathbf{j} + 7 \\mathbf{k}');
  expect(q4A).toBe('7 \\mathbf{i} - 4 \\mathbf{j} - 4 \\mathbf{k}');
  expect(q4B).toBe('- 7 \\mathbf{j} + 7 \\mathbf{k}');
  expect(q4Ratio).toBe('AB:AV = 3:8');
  expect(a4V).toBe('\\frac{1}{3} ( - 35 \\mathbf{i} - 36 \\mathbf{j} + 76 \\mathbf{k} )');

  for (let i = 0; i < 100; i++) {
    const { questions: q, answers: a, qnCode: qnCode } = qn1103();
    if (i < 30) {
      const { questions: q2, answers: a2 } = qn1103({ qnCode: qnCode });
      expect(q).toStrictEqual(q2);
      expect(a).toStrictEqual(a2);
    }
  }

  expect(() => qn1103({ type1: 'a', type2: 'a', type3: 'a' })).not.toThrow();
  expect(() => qn1103({ type1: 'a', type2: 'a', type3: 'b' })).not.toThrow();
  expect(() => qn1103({ type1: 'a', type2: 'b', type3: 'a' })).not.toThrow();
  expect(() => qn1103({ type1: 'a', type2: 'b', type3: 'b' })).not.toThrow();
  expect(() => qn1103({ type1: 'b', type2: 'a', type3: 'a' })).not.toThrow();
  expect(() => qn1103({ type1: 'b', type2: 'a', type3: 'b' })).not.toThrow();
  expect(() => qn1103({ type1: 'b', type2: 'b', type3: 'a' })).not.toThrow();
  expect(() => qn1103({ type1: 'b', type2: 'b', type3: 'b' })).not.toThrow();
});
