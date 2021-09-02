import { qn2103 } from '../../../demos/21-pnc/2103';
import { encode } from '../../../fns/encode/encoders';

const qCode1 = encode(1, 'a', 6, 0);
const { questions: q1, answers: a1, qnCode: qc1 } = qn2103({ qnCode: qCode1 });
const { questions: q2, answers: a2 } = qn2103({ qnCode: '2b51' });
const { questions: q3, answers: a3 } = qn2103({ qnCode: '2b32' });

//const { questions, answers, qnCode } = qn2103();
//console.log(questions);
//console.log(answers);
//console.log(qnCode);

test('2103', () => {
  expect(qc1).toBe('1a60');
  expect(q1.total).toBe(12);
  expect(q1.couples).toBe(6);
  expect(a1.ansIA).toBe('479,001,600.');
  expect(a1.ansIB).toBe('46,080.');
  expect(a1.ansIIA).toBe('39,916,800.');
  expect(a1.ansIIB).toBe('86,400.');
  expect(a1.ansIIC).toBe('240.');
  expect(q2.total).toBe(12);
  expect(q2.couples).toBe(5);
  expect(q2.singles).toBe(1);
  expect(q2.men).toBe('man');
  expect(q2.women).toBe('woman');
  expect(a2.ansIA).toBe('479,001,600.');
  expect(a2.ansIB).toBe('161,280.');
  expect(a2.ansIC).toBe('1,036,800.');
  expect(a2.ansID).toBe('1,440.');
  expect(a2.ansIIA).toBe('39,916,800.');
  expect(a2.ansIIB).toBe('86,400.');
  expect(a2.ansIIC).toBe('240.');
  expect(a2.ansIID).toBe('23,040.');
  expect(q3.total).toBe(10);
  expect(q3.couples).toBe(3);
  expect(q3.singles).toBe(2);
  expect(q3.men).toBe('men');
  expect(q3.women).toBe('women');
  expect(a3.ansIA).toBe('3,628,800.');
  expect(a3.ansIB).toBe('40,320.');
  expect(a3.ansIC).toBe('28,800.');
  expect(a3.ansID).toBe('480.');
  expect(a3.ansIIA).toBe('362,880.');
  expect(a3.ansIIB).toBe('2,880.');
  expect(a3.ansIIC).toBe('96.');
  expect(a3.ansIID).toBe('5,760.');

  for (let i = 0; i < 10; i++) {
    const { questions, qnCode } = qn2103();
    const { questions: q2 } = qn2103({ qnCode: qnCode });
    expect(JSON.stringify(questions)).toBe(JSON.stringify(q2));
  }

  expect(() => qn2103({ type: 1 })).not.toThrow();
  expect(() => qn2103({ type: 2 })).not.toThrow();
  expect(() => qn2103({ type: 1, subtype: 'a' })).not.toThrow();
  expect(() => qn2103({ type: 1, subtype: 'b' })).not.toThrow();
  expect(() => qn2103({ type: 2, subtype: 'a' })).not.toThrow();
  expect(() => qn2103({ type: 2, subtype: 'b' })).not.toThrow();
  expect(() => qn2103({ subtype: 'a' })).not.toThrow();
  expect(() => qn2103({ subtype: 'b' })).not.toThrow();
});
