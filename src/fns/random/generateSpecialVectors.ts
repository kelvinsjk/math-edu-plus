// import { Polynomial, getRandomFrac, Fraction } from 'math-edu';
import { getRandomInt, Vector } from 'math-edu';
// '../../../../math-edu/src/index';

/**
 * Generates a random Vector perpendicular to the given Vector
 *
 * @param options defaults: `{max: 9}`
 * where max refers to the maximum absolute value of each component
 *
 */
function getRandomPerp(v: Vector, options?: randomPerpOptions): Vector {
  const defaultOptions = {
    max: 9,
  };
  const optionsObject = { ...defaultOptions, ...options };
  const max = optionsObject.max;
  const maxVComponent = Math.max(Math.abs(v.x.valueOf()), Math.abs(v.y.valueOf()), Math.abs(v.z.valueOf()));
  if (max < maxVComponent) {
    throw new Error('randomPerp ERROR: max smaller than largest component in v. Consider raising max');
  }
  if (!v.x.isEqual(0)) {
    const generator1 = new Vector(v.y.negative(), v.x, 0, { stretchable: true });
    const generator2 = new Vector(v.z.negative(), 0, v.x, { stretchable: true });
    const lambdaMax = Math.floor(Math.abs(max) / Math.max(Math.abs(v.y.valueOf()), Math.abs(v.x.valueOf())));
    const muMax = Math.floor(Math.abs(max) / Math.max(Math.abs(v.z.valueOf()), Math.abs(v.x.valueOf())));

    let lambda = getRandomInt(-lambdaMax, lambdaMax);
    let mu = getRandomInt(-muMax, muMax);
    let vector = generator1.multiply(lambda).plus(generator2.multiply(mu));
    while (
      vector.isZero() ||
      Math.abs(vector.x.valueOf()) > max ||
      Math.abs(vector.y.valueOf()) > max ||
      Math.abs(vector.z.valueOf()) > max
    ) {
      lambda = getRandomInt(-lambdaMax, lambdaMax);
      mu = getRandomInt(-muMax, muMax);
      vector = generator1.multiply(lambda).plus(generator2.multiply(mu));
      if (!vector.isZero()) {
        vector.simplify(true);
      }
    }
    return vector;
  } else if (!v.y.isEqual(0)) {
    const generator1 = new Vector(1, 0, 0);
    const generator2 = new Vector(0, v.z.negative(), v.y);
    const muMax = Math.floor(Math.abs(max) / Math.max(Math.abs(v.z.valueOf()), Math.abs(v.y.valueOf())));

    let lambda = getRandomInt(-9, 9);
    let mu = getRandomInt(-muMax, muMax);
    let vector = generator1.multiply(lambda).plus(generator2.multiply(mu));
    while (vector.isZero() || vector.x.valueOf() > max || vector.y.valueOf() > max || vector.z.valueOf() > max) {
      lambda = getRandomInt(-9, 9);
      mu = getRandomInt(-muMax, muMax);
      vector = generator1.multiply(lambda).plus(generator2.multiply(mu));
      if (!vector.isZero()) {
        vector.simplify(true);
      }
    }
    return vector;
  } else if (!v.z.isEqual(0)) {
    let lambda = getRandomInt(-9, 9);
    let mu = getRandomInt(-9, 9);
    while (lambda === 0 && mu === 0) {
      lambda = getRandomInt(-9, 9);
      mu = getRandomInt(-9, 9);
    }
    const vector = new Vector(lambda, mu, 0);
    vector.simplify(true);
    return vector;
  } else {
    throw new Error('randomPerp ERROR: 0 vector not allowed');
  }
}
/**
 * Options for generating perpendicular vectors
 */
interface randomPerpOptions {
  max?: number;
}

export { getRandomPerp };
