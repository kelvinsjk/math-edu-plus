import { qn2202 } from '../../../demos/22-probability/2202';
//import { encode } from '../../../fns/encode/encoders';

//const qCode1 = encode(1, 8, 6, 0);
const { questions: q1, answers: a1, qnCode: qc1 } = qn2202({ qnCode: '18122' });
const { questions: q2, answers: a2 } = qn2202({ qnCode: '25011' });
const { questions: q3, answers: a3 } = qn2202({ qnCode: '36012' });

//const { questions, answers, qnCode } = qn2202();
//console.log(questions);
//console.log(answers);
//console.log(qnCode);

test('2202', () => {
  expect(qc1).toBe('18122');
  expect(q1.p).toBe('\\frac{1}{8}.');
  expect(q1.probabilityOfRain).toBe(' the probability of rain is');
  expect(q1.probabilityBulletOne).toBe('twice the probability of rain the previous day if it rained the previous day,');
  expect(q1.probabilityBulletTwo).toBe(
    'the same as the probability of rain the previous day if it did not rain the previous day.',
  );
  expect(q1.atLeast).toBe('at least');
  expect(q1.iiiOneOrTwo).toBe('two days.');
  expect(q1.ivOneOrTwo).toBe('two days.');
  expect(a1.ansB).toBe('\\frac{1}{64}.');
  expect(a1.ansC).toBe('\\frac{21}{256}.');
  expect(a1.ansD).toBe('\\frac{13}{17}.');
  expect(q2.p).toBe('\\frac{1}{5}.');
  expect(q2.probabilityOfRain).toBe(' the probability of rain is');
  expect(q2.probabilityBulletOne).toBe(
    '\\frac{1}{10} higher than the probability of rain the previous day if it rained the previous day,',
  );
  expect(q2.probabilityBulletTwo).toBe(
    'half the probability of rain the previous day if it did not rain the previous day.',
  );
  expect(q2.atLeast).toBe('at most');
  expect(q2.iiiOneOrTwo).toBe('one day.');
  expect(q2.ivOneOrTwo).toBe('one day.');
  expect(a2.ansB).toBe('\\frac{3}{125}.');
  expect(a2.ansC).toBe('\\frac{903}{1000}.');
  expect(a2.ansD).toBe('\\frac{12}{73}.');
  expect(q3.p).toBe('0.6.');
  expect(q3.probabilityOfRain).toBe('');
  expect(q3.probabilityBulletOne).toBe('the probability that it rains, given that it rained the previous day, is 0.7,');
  expect(q3.probabilityBulletTwo).toBe(
    'the probability that it does not rain, given that it did not rain the previous day, is 0.5.',
  );
  expect(q3.atLeast).toBe('at most');
  expect(q3.iiiOneOrTwo).toBe('one day.');
  expect(q3.ivOneOrTwo).toBe('two days.');
  expect(a3.ansB).toBe('0.294.');
  expect(a3.ansC).toBe('0.35.');
  expect(a3.ansD).toBe('\\frac{115}{178}.');

  for (let i = 0; i < 10; i++) {
    const { questions, qnCode } = qn2202();
    const { questions: q2 } = qn2202({ qnCode: qnCode });
    expect(JSON.stringify(questions)).toBe(JSON.stringify(q2));
  }

  expect(() => qn2202({ type: 1 })).not.toThrow();
  expect(() => qn2202({ type: 2 })).not.toThrow();
  expect(() => qn2202({ type: 3 })).not.toThrow();
});
