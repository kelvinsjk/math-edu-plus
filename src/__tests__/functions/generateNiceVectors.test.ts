import { getRandomPerp, getRandomVec, Vector } from '../../index';

const v1 = getRandomVec({ nonZeroMode: true });
const v2 = getRandomPerp(v1);
//const v3 = new Vector(1, -1, 2);
//const v4 = new Vector(2, 4, 1);
//console.log(`${getRandomPerp(v3)}`);
//console.log(`${getRandomPerp(v4)}`);

test('getRandomInts', () => {
  expect(`${v1.dot(v2)}`).toBe('0');
  expect(() => getRandomPerp(new Vector(0,0))).toThrow();
})