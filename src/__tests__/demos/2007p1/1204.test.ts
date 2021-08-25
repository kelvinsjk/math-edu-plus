import { qn1204 } from '../../../demos/12-vectors-ii/1204';

import { encode } from '../../../fns/encode/encoders';

const qCode1 = encode(1, 1, 2, 4, -2, 3, 1, 3, -1, 2, -1, 2);
const { questions: q1, answers: a1, qnCode: qc1 } = qn1204({ qnCode: qCode1 });
const { questions: q2, answers: a2 } = qn1204({ qnCode: '2J5BF1B102D4A83' });
//const { questions: q3, answers: a3 } = qn1306({ qnCode: '2A23A' });

//const { questions: questions, answers: answers, qnCode: qCode } = qn1302({type: 4});
//console.log(questions);
//console.log(answers);
//console.log(qCode);

test('1204', () => {
  expect(qc1).toBe('1124B313A2A2');
  expect(q1[0]).toBe('A\\left( 1 , 2 , 4 \\right)');
  expect(q1[1]).toBe('B\\left( - 2 , 3 , 1 \\right)');
  expect(q1[2]).toBe('3 x - y + 2 z = 17');
  expect(q1[3]).toBe('in exact form');
  expect(a1[0]).toBe('\\left( \\frac{5}{2} , \\frac{3}{2} , \\frac{11}{2} \\right)');
  expect(a1[1]).toBe('78.8^{\\circ}');
  expect(a1[2]).toBe('\\frac{4}{7} \\sqrt{14}');
  expect(q2[0]).toBe('A\\left( - 24 , \\frac{23}{3} , - \\frac{16}{3} \\right)');
  expect(q2[1]).toBe('\\mathbf{i} + 2 \\mathbf{k}');
  expect(q2[2]).toBe('- 4 \\mathbf{i} + 4 \\mathbf{j} - \\mathbf{k}');
  expect(q2[3]).toBe('\\frac{ x + 9 }{ - 6 } = y - 5 = \\frac{ z + 2 }{ - 2 }');
  expect(q2[4]).toBe('correct to 2 decimal places');
  expect(a2[0]).toBe('\\left( - 25 , \\frac{23}{3} , - \\frac{22}{3} \\right)');
  expect(a2[1]).toBe('27.0^{\\circ}');
  expect(a2[2]).toBe('1.60');

  for (let i = 0; i < 50; i++) {
    const {
      questions: [q],
      qnCode: qnCode,
    } = qn1204();
    const {
      questions: [q2],
    } = qn1204({ qnCode: qnCode });
    expect(q).toBe(q2);
  }

  expect(() => qn1204({ type: 1 })).not.toThrow();
  expect(() => qn1204({ type: 2 })).not.toThrow();
});
