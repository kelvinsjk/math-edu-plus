import { qn0102, encode } from '../../../demos/01-eqns-inequalities/0102';


const qCode1 = encode(3, 115, 60, 55, 120, 45, 30, 215, 90, 65, 130, 25, 50, 350, 260, 490);
const { questions: q1, answers: a1, qnCode: qc1 } = qn0102({ qnCode: qCode1 });
const { questions: q2, answers: a2 } = qn0102({ qnCode: "0T-,qJ%SKkNoC_u;"});
//console.log(q2);
//console.log(a2);

//const { questions: questions, answers: answers, qnCode: qCode } = qn1302({type: 4});
//console.log(questions);
//console.log(answers);
//console.log(qnCode);

test('0102', () => {
  expect(qc1).toBe("36-,7*'H3.9&+aQ{"); // must use double quotes
  expect(q1.ax).toBe('1.15');
  expect(q1.ay).toBe('0.60');
  expect(q1.az).toBe('0.55');
  expect(q1.bx).toBe('1.20');
  expect(q1.by).toBe('0.45');
  expect(q1.bz).toBe('0.30');
  expect(q1.cx).toBe('2.15');
  expect(q1.cy).toBe('0.90');
  expect(q1.cz).toBe('0.65');
  expect(q1.dx).toBe('1.30');
  expect(q1.dy).toBe('0.25');
  expect(q1.dz).toBe('0.50');
  expect(q1.ta).toBe('8.28');
  expect(q1.tb).toBe('6.84');
  expect(q1.tc).toBe('13.05');
  expect(q1.td).toBe('');
  expect(a1.ansX).toBe('3.50');
  expect(a1.ansY).toBe('2.60');
  expect(a1.ansZ).toBe('4.90');
  expect(a1.ansFinal).toBe('7.65');
  expect(q2.ax).toBe('2.75');
  expect(q2.ay).toBe('0.60');
  expect(q2.az).toBe('0.55');
  expect(q2.bx).toBe('4.40');
  expect(q2.by).toBe('2.25');
  expect(q2.bz).toBe('0.20');
  expect(q2.cx).toBe('2.70');
  expect(q2.cy).toBe('2.30');
  expect(q2.cz).toBe('4.10');
  expect(q2.dx).toBe('');
  expect(q2.dy).toBe('4.30');
  expect(q2.dz).toBe('1.80');
  expect(q2.ta).toBe('12.88');
  expect(q2.tb).toBe('25.59');
  expect(q2.tc).toBe('25.50');
  expect(q2.td).toBe('30.63');
  expect(a2.ansX).toBe('3.40');
  expect(a2.ansY).toBe('4.60');
  expect(a2.ansZ).toBe('1.40');
  expect(a2.ansFinal).toBe('2.45');

  for (let i = 0; i < 10; i++) {
    const {
      questions,
      qnCode
    } = qn0102();
    const {
      questions: q2,
    } = qn0102({ qnCode: qnCode });
    expect(JSON.stringify(questions)).toBe(JSON.stringify(q2));
  }

  expect(() => qn0102({ position: 1 })).not.toThrow();
  expect(() => qn0102({ position: 2 })).not.toThrow();
  expect(() => qn0102({ position: 3 })).not.toThrow();
  expect(() => qn0102({ position: 0 })).not.toThrow();
});
