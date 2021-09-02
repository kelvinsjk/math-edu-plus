import { qn2503 } from '../../../demos/25-normal/2503';
import { encode } from '../../../fns/encode/encoders';


const qCode1 = encode(1, 7, 5, 6, 5, 6, 5, 4, 5);
const { questions: q1, answers: a1, qnCode: qc1 } = qn2503({ qnCode: qCode1 });
const { questions: q2, answers: a2 } = qn2503({ qnCode: '252474138' });
//const { questions: q3, answers: a3 } = qn2503({ qnCode: '2:44' });
//const { questions: q4, answers: a4 } = qn2503({ qnCode: '3A35Y' });

//const { questions, answers, qnCode } = qn2503();
//console.log(questions);
//console.log(answers);
//console.log(qnCode);

test('2503', () => {
  expect(qc1).toBe("175656545");
  expect(q1.xMu).toBe(2.2);
  expect(q1.xSigma).toBe(0.5);
  expect(q1.xPrice).toBe(3);
  expect(q1.yMu).toBe(10.5);
  expect(q1.ySigma).toBe(2.1);
  expect(q1.yPrice).toBe(5);
  expect(q1.exceedPrice1).toBe(7);
  expect(q1.exceedPrice2).toBe(55);
  expect(a1.ansA).toBe('0.395.');
  expect(a1.ansB).toBe('0.160.');
  expect(a1.ansC).toBe('0.392.');
  expect(a1.ansD).toBe('The event in part (ii) is a subset of the event in part (iii).');
  expect(qc1).toBe("175656545");
  expect(q2.xMu).toBe(2);
  expect(q2.xSigma).toBe(0.2);
  expect(q2.xPrice).toBe(2);
  expect(q2.yMu).toBe(11.5);
  expect(q2.ySigma).toBe(1.9);
  expect(q2.yPrice).toBe(1);
  expect(q2.exceedPrice1).toBe(4.3);
  expect(q2.exceedPrice2).toBe(15.5);
  expect(a2.ansA).toBe('0.227.');
  expect(a2.ansB).toBe('0.00400.');
  expect(a2.ansC).toBe('0.7789.');
  expect(a2['ansD']).toBeUndefined();

  for (let i = 0; i < 10; i++) {
    const {
      questions,
      answers,
      qnCode
    } = qn2503();
    const {
      questions: q2,
    } = qn2503({ qnCode: qnCode });
    expect(JSON.stringify(questions)).toBe(JSON.stringify(q2));
    if (qnCode[0] === '1') {
      expect(Number(answers.ansB.slice(0, -1))).toBeLessThan(Number(answers.ansC.slice(0, -1)));
    }
  }

  expect(() => qn2503({ type: 2 })).not.toThrow();
  expect(() => qn2503({ type: 1 })).not.toThrow();
});
