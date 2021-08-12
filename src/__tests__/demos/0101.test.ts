import { qn0101 } from '../../demos/01-eqns-inequalities/0101';

import { encode } from '../../fns/encode/encoders';

const qCode1 = encode(1, '>', -1, -2, 7, 1, -3, 1, 1, 0);
const { questions: [q1], answers: a1, qnCode: qc1 } = qn0101({ qnCode: qCode1 });

const qCode2 = encode(2, '<', -2, 1, 3, 4, 1, 1, 3, 0);
const { questions: [q2], answers: a2 } = qn0101({ qnCode: qCode2 });

const qCode3 = encode(3, '<', 1, 1, 1, -2, 1, 1, 1, 0, 0, 0);
const { questions: [q3], answers: a3,  qnCode: qc3} = qn0101({ qnCode: qCode3 });

const qCode4 = '4>111C121411';
const { questions: [q4], answers: a4 } = qn0101({ qnCode: qCode4 });
const qCode5 = '5>111E4340';
const { questions: [q5], answers: a5 } = qn0101({ qnCode: qCode5 });
const qCode6 = '6<111A3A';
const { questions: [q6], answers: a6 } = qn0101({ qnCode: qCode6 });

//interface variablesObjectCD {
//  a: number,
//  b: number,
//  c: number, // monic irreducible polynomial ax^2 + bx + c
//  root1Num: number,
//  root1Den: number,
//  root2Num: number,
//  root2Den: number,
//  rhs: number,
//  numVsDen: number,
//  negative: number,
//  sign: string,
//  type: number
//}

test('0101', () => {
  expect(q1).toBe("\\frac{ 2 x^2 - x - 19 }{ x^2 + 3 x + 2 } > 1");
  expect(a1[0]).toBe("x < - 3");
  expect(a1[1]).toBe("-2 < x < -1");
  expect(a1[2]).toBe("x > 7");
  expect(qc1).toBe("1>AB71C110")

  expect(q2).toBe('\\frac{ 4 x^2 + 4 x - 14 }{ x - 4 } < x + 3');
  expect(a2[0]).toBe('x < -2');
  expect(a2[1]).toBe('\\frac{1}{3} < x < 4');

  expect(q3).toBe("\\frac{ x^2 + x + 1 }{ x^2 + x - 2 } < 0");
  expect(a3[0]).toBe("- 2 < x < 1");
  expect(qc3).toBe("3<111B111000")

  expect(q4).toBe("\\frac{ 3 x^2 + 3 x + 10 }{ x^2 + x + 1 } > 4");
  expect(a4[0]).toBe("- 3 < x < 2");
  
  expect(q5).toBe("\\frac{ 13 x^2 + 32 x + 21 }{ 4 x + 5 } > 3 x + 4");
  expect(a5[0]).toBe("x > - \\frac{5}{4}");
  
  expect(q6).toBe("\\frac{ - x^2 + 2 x }{ x^2 + x + 1 } < -1");
  expect(a6[0]).toBe("x < - \\frac{1}{3}");

  for (let i = 0; i < 35; i++){
    const { questions: [q], qnCode: qnCode } = qn0101();
    const { questions: [q2] } = qn0101({ qnCode: qnCode });
    expect(q).toBe(q2);
  }

  expect(() => qn0101({type: 1})).not.toThrow();
  expect(() => qn0101({type: 2})).not.toThrow();
  expect(() => qn0101({type: 3})).not.toThrow();
  expect(() => qn0101({type: 4})).not.toThrow();
  expect(() => qn0101({type: 5})).not.toThrow();
  expect(() => qn0101({type: 6})).not.toThrow();
})

//interface variablesObjectA {
//  root1Int: number,
//  root2Int: number,
//  root3Num: number,
//  root3Den: number,
//  root4Num: number,
//  root4Den: number,
//  rhs: number,
//  numVsDen: number,
//  sign: string,
//  type: number
//}