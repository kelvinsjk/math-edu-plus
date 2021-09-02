import { qn2401, encode } from '../../../demos/24-binomial/2401';


const qCode1 = encode(3, 24, 1, 4, 30);
const { questions: q1, answers: a1, qnCode: qc1 } = qn2401({ qnCode: qCode1 });
const { questions: q2, answers: a2 } = qn2401({ qnCode: '2a22' });
const { questions: q3, answers: a3 } = qn2401({ qnCode: '2:44' });
const { questions: q4, answers: a4 } = qn2401({ qnCode: '3A35Y' });

//const { questions, answers, qnCode } = qn2401({type: 3});
//console.log(questions);
//console.log(answers);
//console.log(qnCode);

test('2401', () => {
  expect(qc1).toBe("3B14H");
  expect(q1.p1).toBe('24%');
  expect(q1.p2).toBe('0.3%');
  expect(q1.k).toBe('at most 4');
  expect(q1.x1).toBe('230');
  expect(q1.x2).toBe('260');
  expect(q1.y1).toBe('2');
  expect(q1.y2).toBe('5');
  expect(a1.ansA).toBe('0.933.');
  expect(a1.ansB).toBe('0.715.');
  expect(a1.ansC).toBe('0.617.');
  expect(q2.p1).toBe('55%');
  expect(q2.k).toBe('at least 2');
  expect(q2.y).toBe('995');
  expect(q2.y1).toBe('990');
  expect(q2.y2).toBe('999');
  expect(a2.ansA).toBe('0.995.')
  expect(a2.ansB).toBe('0.171.')
  expect(a2.ansC).toBe('0.933.')
  expect(q3.p1).toBe('16%');
  expect(q3.k).toBe('more than 3');
  expect(q3.y).toBe('61');
  expect(q3.y1).toBe('56');
  expect(q3.y2).toBe('66');
  expect(a3.ansA).toBe('0.0614.');
  expect(a3.ansB).toBe('0.0526.');
  expect(a3.ansC).toBe('0.490.');
  expect(q4.p1).toBe('23%');
  expect(q4.p2).toBe('0.47%');
  expect(q4.k).toBe('less than 6');
  expect(q4.x1).toBe('220');
  expect(q4.x2).toBe('250');
  expect(q4.y1).toBe('4');
  expect(q4.y2).toBe('7');
  expect(a4.ansA).toBe('0.987.')
  expect(a4.ansB).toBe('0.721.')
  expect(a4.ansC).toBe('0.496.')
  
  for (let i = 0; i < 10; i++) {
    const {
      questions,
      qnCode
    } = qn2401();
    const {
      questions: q2,
    } = qn2401({ qnCode: qnCode });
    expect(JSON.stringify(questions)).toBe(JSON.stringify(q2));
  }

  expect(() => qn2401({ type: 2 })).not.toThrow();
  expect(() => qn2401({ type: 3 })).not.toThrow();
});
