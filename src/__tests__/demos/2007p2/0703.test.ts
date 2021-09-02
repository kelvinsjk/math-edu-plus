import { qn0703 } from '../../../demos/07-maclaurin/0703';
import { encode } from '../../../fns/encode/encoders';

const qCode1 = encode(1, 3, 2, 2, 2);
const { questions: q1, answers: a1, qnCode: qc1 } = qn0703({ qnCode: qCode1 });
const { questions: q2, answers: a2 } = qn0703({ qnCode: '235' });
//const { questions: q3, answers: a3 } = qn0504({ qnCode: "1211B" });
//console.log(q1);
//console.log(a1);
//console.log(qc1);

//const { questions: questions, answers: answers, qnCode } = qn0703();
//console.log(questions);
//console.log(answers);
//console.log(qnCode);

test('0703', () => {
  expect(qc1).toBe('13222');
  expect(q1.fn).toBe('( 1 + x )^n');
  expect(q1.expression).toBe('( 4 - x )^\\frac{3}{2} ( 1 + 2 x^2 )^\\frac{3}{2}');
  expect(a1.ansA).toBe('1 + n x + \\frac{n(n-1)}{2} x^2 + \\frac{n(n-1)(n-2)}{6} x^3 + \\ldots');
  expect(a1.ansB).toBe('8 - 3 x + \\frac{387}{16} x^2 - \\frac{1151}{128} x^3 + \\ldots');
  expect(a1.ansC).toBe('- \\frac{1}{2} \\sqrt{2} < x < \\frac{1}{2} \\sqrt{2}.');
  expect(q2.fn).toBe('\\ln ( 1 + x )');
  expect(q2.expression).toBe('\\ln ( 3 - x ) + \\ln ( 1 + 5 x^2 )');
  expect(a2.ansA).toBe('x - \\frac{1}{2} x^2 + \\frac{1}{3} x^3 + \\ldots');
  expect(a2.ansB).toBe('\\ln 3 - \\frac{1}{3} x + \\frac{89}{18} x^2 - \\frac{1}{81} x^3 + \\ldots');
  expect(a2.ansC).toBe('- \\frac{1}{5} \\sqrt{5} \\leq x \\leq \\frac{1}{5} \\sqrt{5}.');

  for (let i = 0; i < 10; i++) {
    const { questions, qnCode } = qn0703();
    const { questions: q2 } = qn0703({ qnCode: qnCode });
    expect(JSON.stringify(questions)).toBe(JSON.stringify(q2));
  }

  expect(() => qn0703({ type: 1 })).not.toThrow();
  expect(() => qn0703({ type: 2 })).not.toThrow();
  //expect(() => qn0504({ subtype: 1 })).not.toThrow();
  //expect(() => qn0504({ subtype: 2 })).not.toThrow();
  //expect(() => qn0504({ type: 1, subtype: 1 })).not.toThrow();
  //expect(() => qn0504({ type: 1, subtype: 2 })).not.toThrow();
  //expect(() => qn0504({ type: 2, subtype: 1 })).not.toThrow();
  //expect(() => qn0504({ type: 2, subtype: 2 })).not.toThrow();
});
