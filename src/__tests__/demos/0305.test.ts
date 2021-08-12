import { qn0305 } from '../../demos/03-graphs/0305';

import { encode } from '../../fns/encode/encoders';

const qCode1 = encode(1, 2, 3, 2);
const { questions: [q1A, q1B, q1C, q1D], answers: [a1a1, a1a2, a1b1, a1b2, a1c1, a1c2 ], qnCode: qc1 } = qn0305({ qnCode: qCode1 });
const { questions: [q2A, q2B, q2C, q2D], answers: [a2a1, a2a2, a2b1, a2b2, a2c1, a2c2 ], qnCode: qc2 } = qn0305({ qnCode: '2J24' });

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

test('1001', () => {
  expect(q1A).toBe('y = \\frac{ 2 x + 7 }{ x + 2 }');
  expect(q1B).toBe('y = 2 + \\frac{ 3 }{ x + 2 }');
  expect(q1C).toBe('y = \\frac{ 1 }{ x }');
  expect(q1D).toBe('y = \\frac{ 2 x + 7 }{ x + 2 }');
  expect(a1a1).toBe('Translate by 2 units in the negative');
  expect(a1a2).toBe('x');
  expect(a1b1).toBe('Scale by a factor of 3 parallel to the');
  expect(a1b2).toBe('y');
  expect(a1c1).toBe('Translate by 2 units in the positive');
  expect(a1c2).toBe('y');
  expect(qc1).toBe('1232');
  expect(q2A).toBe('y = \\frac{ - 9 x - 34 }{ x + 4 }');
  expect(q2B).toBe('y = -9 + \\frac{ 2 }{ x + 4 }');
  expect(q2D).toBe('y = \\frac{ 1 }{ x }');
  expect(q2C).toBe('y = \\frac{ - 9 x - 34 }{ x + 4 }');
  expect(a2a1).toBe('Translate by 9 units in the positive');
  expect(a2a2).toBe('y');
  expect(a2b1).toBe('Scale by a factor of \\frac{1}{2} parallel to the');
  expect(a2b2).toBe('y');
  expect(a2c1).toBe('Translate by 4 units in the positive');
  expect(a2c2).toBe('x');
  expect(qc2).toBe('2J24');
  
  
  for (let i = 0; i < 30; i++){
    const { questions: [q], qnCode: qnCode } = qn0305();
    const { questions: [q2] } = qn0305({ qnCode: qnCode });
    expect(q).toBe(q2);
  }

  expect(() => qn0305({type: 1})).not.toThrow();
  expect(() => qn0305({type: 2})).not.toThrow();
  //expect(() => qn1302({type: 3})).not.toThrow();
  //expect(() => qn1302({type: 4})).not.toThrow();
})
