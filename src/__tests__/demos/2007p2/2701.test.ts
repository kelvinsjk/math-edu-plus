import { qn2701, encode } from '../../../demos/27-hypothesis-testing/2701';


const qCode1 = encode(1, 2, 5, 6, 5, 84, 3, 8, 2, 4);
const { questions: q1, answers: a1, qnCode: qc1 } = qn2701({ qnCode: qCode1 });
const { questions: q2, answers: a2 } = qn2701({ qnCode: '23014U1093' });
//const { questions: q3, answers: a3 } = qn2701({ qnCode: '2:44' });
//const { questions: q4, answers: a4 } = qn2701({ qnCode: '3A35Y' });

const { questions, answers, qnCode } = qn2701();
//console.log(questions);
//console.log(answers);
//console.log(qnCode);

test('2401', () => {
  expect(qc1).toBe("12565~3824");
  expect(q1.n).toBe('150');
  expect(q1.sums).toBe('\\sum x = 4626, \\quad \\sum x^2 = 147691.');
  expect(q1.alpha).toBe('5\%'); // eslint-disable-line
  expect(q1.exceeds).toBe('exceeds 30');
  expect(a1.ansA).toBe('\\overline{x} = 30.84, s^2 = 33.7.');
  expect(a1.ansBMath).toBe('p-\\textrm{value} = 0.0382 \\leq 0.05 \\quad \\Rightarrow \\quad H_0 \\textrm{ rejected}.');
  expect(a1.ansBText).toBe('Hence there is sufficient evidence at the 5\% level of significance to conclude that the population mean time for a student to prepare for the test exceeds 30 hours.'); // eslint-disable-line
  expect(q2.n).toBe('100');
  expect(q2.sums).toBe('\\sum x = 457, \\quad \\sum x^2 = 2371.');
  expect(q2.alpha).toBe('4\%'); // eslint-disable-line
  expect(q2.exceeds).toBe('is 5');
  expect(q2.sufficient).toBe('sufficient');
  expect(a2.ansA).toBe('\\overline{x} = 4.57, s^2 = 2.85.');
  expect(a2.ansB).toBe('\\alpha \\geq 1.09');
  
  for (let i = 0; i < 10; i++) {
    const {
      questions,
      qnCode
    } = qn2701();
    const {
      questions: q2,
    } = qn2701({ qnCode: qnCode });
    expect(JSON.stringify(questions)).toBe(JSON.stringify(q2));
  }

  expect(() => qn2701({ type: 1 })).not.toThrow();
  expect(() => qn2701({ type: 2 })).not.toThrow();
});
