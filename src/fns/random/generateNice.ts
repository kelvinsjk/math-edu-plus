// import { Polynomial, getRandomFrac, Fraction } from 'math-edu';
import { getRandomFrac, Polynomial, Fraction, factorize } from 'math-edu';
// '../../../../math-edu/src/index';

/**
 * generate a "nice" quadratic:
 * first root: a fraction of denominator 1 to 2
 * second root: a fraction of denominator 1 to 4, different from the first root
 * numerators -9 to 9 (or negative)
 * @returns a `Polynomial` class representing the quadratic
 */
function getNiceQuadratic(avoid?: number[]): niceQuadraticOutput {
  avoid = avoid === undefined ? [] : avoid;
  const root1 = getRandomFrac({ denMin: 1, denMax: 2, avoid: [...avoid] });
  const root2 = getRandomFrac({ denMin: 1, denMax: 4, avoid: [root1, ...avoid] });
  let a = root1.den * root2.den,
    b = -root1.den * root2.num - root2.den * root1.num,
    c = root1.num * root2.num;
  [[a, b, c]] = factorize(a, b, c);
  //const factor1 = root1.toFactor(),
  //factor2 = root2.toFactor();
  //const quadratic = factor1.multiply(factor2);
  //const a = quadratic.terms[0].coeff.num,
  //  b = quadratic.terms[1].coeff.num,
  //  c = quadratic.terms[2].coeff.num;
  return {
    quadratic: new Polynomial([a, b, c]),
    coefficients: [a, b, c],
    roots: [root1, root2],
  };
}

export { getNiceQuadratic };

/**
 * Output for `getRandomQuadratic`:
 */
interface niceQuadraticOutput {
  quadratic: Polynomial;
  coefficients: [number, number, number];
  roots: [Fraction, Fraction]; // only rational outputs at the moment
}
