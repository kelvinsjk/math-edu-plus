import { qn0803 } from '../../../demos/08-integration/0803';
import { encode } from '../../../fns/encode/encoders';


const qCode1 = encode(1, 'a', 1, 5, 3);
const { questions: q1, answers: a1, qnCode: qc1 } = qn0803({ qnCode: qCode1 });
const { questions: q2, answers: a2 } = qn0803({ qnCode: "1b854" });
const { questions: q3, answers: a3 } = qn0803({ qnCode: "2a912" });
const { questions: q4, answers: a4 } = qn0803({ qnCode: "2b816" });
//console.log(q1);
//console.log(a1);
//console.log(qc1);

//const { questions: questions, answers: answers, qnCode } = qn0803({type: 2, subtype: 'b'});
//console.log(questions);
//console.log(answers);
//console.log(qnCode);

test('0803', () => {
  expect(qc1).toBe('1a153');
  expect(q1.integral1).toBe('\\int_0^{\\frac{5}{3} \\pi} \\sin^2 x \\, \\mathrm{d}x');
  expect(q1.integral2).toBe('\\int_0^{\\frac{5}{3} \\pi} \\cos^2 x \\, \\mathrm{d}x');
  expect(a1.ans1).toBe('\\frac{1}{8} \\sqrt{3} + \\frac{5}{6} \\pi');
  expect(a1.ans2).toBe('- \\frac{1}{8} \\sqrt{3} + \\frac{5}{6} \\pi');
  expect(q2.integral1).toBe('\\int_0^{\\frac{5}{4} \\pi} \\cos^2 8 x \\, \\mathrm{d}x');
  expect(q2.integral2).toBe('\\int_0^{\\frac{5}{4} \\pi} \\sin^2 8 x \\, \\mathrm{d}x');
  expect(a2.ans1).toBe('\\frac{5}{8} \\pi');
  expect(a2.ans2).toBe('\\frac{5}{8} \\pi');
  expect(q3.integral1).toBe('\\int_0^{\\frac{1}{2} \\pi} \\sin 9 x \\cos 9 x \\, \\mathrm{d}x');
  expect(q3.integral2).toBe('\\int_0^{\\frac{1}{2} \\pi} (\\sin 9 x + \\cos 9 x)^2 \\, \\mathrm{d}x');
  expect(a3.ans1).toBe('\\frac{1}{18}');
  expect(a3.ans2).toBe('\\frac{1}{9} + \\frac{1}{2} \\pi');
  expect(q4.integral1).toBe('\\int_0^{\\frac{1}{6} \\pi} \\sin 8 x \\cos 8 x \\, \\mathrm{d}x');
  expect(q4.integral2).toBe('\\int_0^{\\frac{1}{6} \\pi} (\\sin 8 x - \\cos 8 x)^2 \\, \\mathrm{d}x');
  expect(a4.ans1).toBe('\\frac{3}{64}');
  expect(a4.ans2).toBe('- \\frac{3}{32} + \\frac{1}{6} \\pi');


  for (let i = 0; i < 10; i++) {
    const {
      questions,
      qnCode
    } = qn0803();
    const {
      questions: q2,
    } = qn0803({ qnCode: qnCode });
    expect(JSON.stringify(questions)).toBe(JSON.stringify(q2));
  }

  expect(() => qn0803({ type: 1 })).not.toThrow();
  expect(() => qn0803({ type: 2 })).not.toThrow();
  expect(() => qn0803({ type: 1, subtype: 'a' })).not.toThrow();
  expect(() => qn0803({ type: 1, subtype: 'b' })).not.toThrow();
  expect(() => qn0803({ type: 2, subtype: 'a' })).not.toThrow();
  expect(() => qn0803({ type: 2, subtype: 'b' })).not.toThrow();
});
