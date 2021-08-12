import { qn0605 } from '../../demos/06-differentiation/0605';

import { encode } from '../../fns/encode/encoders';

const qCode1 = encode('a', 'a', 3);
const { questions: [q1A, q1B, q1C, q1D, q1E, q1F], answers: [a1a], qnCode: qc1 } = qn0605({ qnCode: qCode1 });
const { questions: [q2A, q2B, q2C, q2D, q2E, q2F], answers: [a2a] } = qn0605({ qnCode: 'aa8' });
const { questions: [q3A, q3B, q3C, q3D] } = qn0605({ qnCode: 'ab3' });
const { questions: [q4A, q4B, q4C, q4D, q4E, q4F], answers: [a4a] } = qn0605({ qnCode: 'ba7' });
const { questions: [q5A, q5B, q5C, q5D] } = qn0605({ qnCode: 'bb7' });
//const { questions: [q2M, q2N, q2A, q2B], answers: [a2a, a2b, a2c], qnCode: qc2 } = qn0605({ qnCode: '2534' });

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

test('0605', () => {
  expect(q1A).toBe('x = \\cos^2 t, \\quad y = \\sin^3 t, \\quad \\textrm{for } 0 \\leq t \\leq {\\textstyle \\frac{\\pi}{2}}');
  expect(q1B).toBe('tangent');
  expect(q1C).toBe('( \\cos^2 \\theta, \\sin^3 \\theta )');
  expect(q1D).toBe('\\frac{1}{12} \\sin \\theta ( 3 \\cos^2 \\theta + 2 \\sin^2 \\theta )^2');
  expect(q1E).toBe('2 \\int_0^{\\frac{\\pi}{2}} \\cos t \\sin^{4} t \\, \\mathrm{d} t');
  expect(q1F).toBe('u = \\sin t');
  expect(a1a).toBe('\\frac{2}{5} \\textrm{ units}^2');
  expect(qc1).toBe('aa3');
  expect(q2A).toBe('x = \\cos^2 t, \\quad y = \\sin^8 t, \\quad \\textrm{for } 0 \\leq t \\leq {\\textstyle \\frac{\\pi}{2}}');
  expect(q2B).toBe('tangent');
  expect(q2C).toBe('( \\cos^2 \\theta, \\sin^8 \\theta )');
  expect(q2D).toBe('\\frac{1}{8} \\sin^{6} \\theta ( 4 \\cos^2 \\theta + \\sin^2 \\theta )^2');
  expect(q2E).toBe('2 \\int_0^{\\frac{\\pi}{2}} \\cos t \\sin^{9} t \\, \\mathrm{d} t');
  expect(q2F).toBe('u = \\sin t');
  expect(a2a).toBe('\\frac{1}{5} \\textrm{ units}^2');
  expect(q3B).toBe('normal');
  expect(q3D).toBe('\\frac{1}{ 12 \\sin \\theta } | 3 \\sin^{4} \\theta - 2 \\cos^2 \\theta |^2');
  expect(q4A).toBe('x = \\sin^2 t, \\quad y = \\cos^7 t, \\quad \\textrm{for } 0 \\leq t \\leq {\\textstyle \\frac{\\pi}{2}}');
  expect(q4B).toBe('tangent');
  expect(q4C).toBe('( \\sin^2 \\theta, \\cos^7 \\theta )');
  expect(q4D).toBe('\\frac{1}{28} \\cos^{5} \\theta ( 7 \\sin^2 \\theta + 2 \\cos^2 \\theta )^2');
  expect(q4E).toBe('2 \\int_0^{\\frac{\\pi}{2}} \\sin t \\cos^{8} t \\, \\mathrm{d} t');
  expect(q4F).toBe('u = \\cos t');
  expect(a4a).toBe('\\frac{2}{9} \\textrm{ units}^2');
  expect(q5B).toBe('normal');
  expect(q5D).toBe('\\frac{1}{ 28 \\cos^{5} \\theta } | 7 \\cos^{12} \\theta - 2 \\sin^2 \\theta |^2');

  for (let i = 0; i < 30; i++) {
    const { questions: [q], qnCode: qnCode } = qn0605();
    const { questions: [q2] } = qn0605({ qnCode: qnCode });
    expect(q).toBe(q2);
  }

  expect(() => qn0605({ type1: 'a' })).not.toThrow();
  expect(() => qn0605({ type1: 'b' })).not.toThrow();
  expect(() => qn0605({ type2: 'a' })).not.toThrow();
  expect(() => qn0605({ type2: 'b' })).not.toThrow();
  expect(() => qn0605({ type1: 'a', type2: 'a' })).not.toThrow();
  expect(() => qn0605({ type1: 'a', type2: 'b' })).not.toThrow();
  expect(() => qn0605({ type1: 'b', type2: 'a' })).not.toThrow();
  expect(() => qn0605({ type1: 'b', type2: 'b' })).not.toThrow();
  //expect(() => qn1302({type: 3})).not.toThrow();
  //expect(() => qn1302({type: 4})).not.toThrow();
})
