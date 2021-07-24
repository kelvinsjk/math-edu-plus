  // import { Fraction, Expression } from 'math-edu'; TODO:
import { Fraction, Expression, Term, Polynomial } from '../../../../math-edu/src/index';
import Interval from './intervalClass';

/**
 * BasicFunction class
 * This class is meant to capture the domain and range characteristics of a function, 
 * allowing us to make new functions through composition and inverse
 * The BasicFunction class encapsulates the simplest function types
 * 
 * @expression Expression representing the function
 * @domain Interval or Interval[] representing the domain
 * @range Interval or Interval[] representing the range
 * @zeros Fraction[] representing the zeros of the function
 * @invertible whether the function is invertible
 * @type a [string, number | Fraction] array showing how this function is made
 * the first entry is either 'ax', 'x+b' or 'x^a' and the second entry is a
 * 
 * WARNING: the range may not be simplified if complicated domains are provided *
 */
class BasicFunction {
  //// instance properties
  expression: Expression;
  domain: Interval | Interval[];
  range: Interval | Interval[];
  zeros: Fraction[];
  invertible: boolean;
  type: ['ax'|'x+a'|'x^a', number | Fraction];
  variableAtom: string;

  /**
   * Constructs a BasicFunction from one of three basic types:
   * @param type `ax`, `x+b` or `x^a` representing multiplication, addition or powers
   * @param a
   * @param options allows a custom domain and `variableAtom` (default `'x'`)
   */
  constructor(type: 'ax' | 'x+a' | 'x^a', a: number | Fraction = 1, options?: BasicFunctionOptions) {
    if (type === 'ax') {
      const defaultOptions = {
        domain: new Interval(),
        variableAtom: 'x'
      };
      const optionsObject = { ...defaultOptions, ...options };
      a = typeof a === 'number' ? new Fraction(a) : a;
      if (a.isEqual(0)) {
        throw 'BasicFunction ERROR: multiplication by 0 not supported'
      }
      // set domain, invertible, zeros, type
      const domain = optionsObject.domain instanceof Interval ? optionsObject.domain.clone() : optionsObject.domain.map(i => i.clone());
      this.domain = domain;
      this.invertible = true;
      this.zeros = [Fraction.ZERO]
      this.type = ['ax', a.clone()];
      this.variableAtom = optionsObject.variableAtom;
      // construct expression
      const axTerm = new Term(a, optionsObject.variableAtom);
      const axExpression = new Expression(axTerm);
      this.expression = axExpression;
      // construct range
      if (optionsObject.domain instanceof Interval) {
        this.range = optionsObject.domain.times(a);
      } else { // Interval[]
        const rangeIntervals: Interval[] = [];
        optionsObject.domain.forEach((interval) => {
          rangeIntervals.push(interval.times(a));
        })
        this.range = rangeIntervals;
      }
    } else if (type === 'x+a') {
      const defaultOptions = {
        domain: new Interval(),
        variableAtom: 'x'
      };
      const optionsObject = { ...defaultOptions, ...options };
      a = typeof a === 'number' ? new Fraction(a) : a;
      // set domain, invertible, zeros, type
      const domain = optionsObject.domain instanceof Interval ? optionsObject.domain.clone() : optionsObject.domain.map(i => i.clone());
      this.domain = domain;
      this.invertible = true;
      this.zeros = [a.negative()];
      this.type = ['x+a', a.clone()];
      this.variableAtom = optionsObject.variableAtom;
      // construct expression
      const xTerm = new Term(1, optionsObject.variableAtom);
      const a_PLUS_x_Expression = new Expression(xTerm, a);
      this.expression = a_PLUS_x_Expression;
      // construct range
      if (optionsObject.domain instanceof Interval) {
        this.range = optionsObject.domain.plus(a);
      } else { // Interval[]
        const rangeIntervals: Interval[] = [];
        optionsObject.domain.forEach((interval) => {
          rangeIntervals.push(interval.plus(a));
        })
        this.range = rangeIntervals;
      }
    } else { // x^a
      if (typeof a !== 'number' || a === 0 || !Number.isInteger(a)) {
        throw 'BasicFunction ERROR: exponent must be integer (number type)'
      }
      const defaultOptions = {
        domain: a > 0 ? new Interval() : [new Interval(-Infinity, 0), new Interval(0)],
        variableAtom: 'x'
      };
      const optionsObject = { ...defaultOptions, ...options };
      // set domain, invertible, zeros, type
      const domain = optionsObject.domain instanceof Interval ? optionsObject.domain.clone() : optionsObject.domain.map(i => i.clone());
      this.domain = domain;
      if (a % 2 !== 0) {
        this.invertible = true;
      } else {
        if (domain instanceof Interval) {
          this.invertible = !domain.contains(0);
        } else {
          this.invertible = !domain.reduce((a, c) => a || c.contains(0));
        }
      }
      this.zeros = [];
      this.type = ['x^a', a];
      this.variableAtom = optionsObject.variableAtom;
      // construct expression
      const x_POWER_a_Polynomial = new Polynomial([1], { initialDegree: a, variableAtom: optionsObject.variableAtom });
      const power = a === -1 ? '' : `^{${Math.abs(a)}}`
      const one_Over_X_Term = new Term(1, `\\frac{1}{ ${optionsObject.variableAtom}${power} }`)
      const one_Over_X_Expression = new Expression(one_Over_X_Term);
      this.expression = a < 0 ? one_Over_X_Expression : x_POWER_a_Polynomial;
      // construct range
      if (optionsObject.domain instanceof Interval) {
        if (optionsObject.domain.contains(0) && a < 0) {
          throw 'BasicFunction ERROR: 0 not allowed in domain of reciprocal functions'
        }
        this.range = optionsObject.domain.pow(a);
      } else { // Interval[]
        const rangeIntervals: Interval[] = [];
        optionsObject.domain.forEach((interval) => {
          if (interval.contains(0) && a < 0) {
            throw 'BasicFunction ERROR: 0 not allowed in domain of reciprocal functions'
          }
          rangeIntervals.push(interval.pow(a as number) as Interval);
        })
        this.range = rangeIntervals.length === 2 ? rangeIntervals[0].union(rangeIntervals[1]) : rangeIntervals;
      }
    }
  }

  /**
   * toString method: outputs latex string representing the function
   * @param options defaults to `{name: 'f', definitionMode: false}`
   * definitionMode true gives us the f:x\mapsto notation while false gives us the f(x) notation
   */
  toString(options?: BasicFunctionToStringOptions): string {
    const defaultOptions = {
      name: 'f',
      definitionMode: false
    }
    const optionsObject = { ...defaultOptions, ...options };
    return optionsObject.definitionMode ? `${optionsObject.name} : ${this.variableAtom} \\mapsto ${this.expression}` : `${optionsObject.name}(${this.variableAtom}) = ${this.expression}`;
  }

  /**
   * Returns the inverse function
   * WARNING: currently only supported for 'ax' and 'x+b' type, with 'x^a' types only supported for a=-1
   */
  inverse(): BasicFunction {
    if (this.invertible) {
      if (this.type[0] === 'ax') {
        const oneOverA = Fraction.ONE.divide(this.type[1]);
        return new BasicFunction('ax', oneOverA, {variableAtom: this.variableAtom, domain: this.range})
      } else if (this.type[0] === 'x+a') {
        const negativeA = typeof this.type[1] === 'number' ? new Fraction(-this.type[1]) : this.type[1].negative();
        return new BasicFunction('x+a', negativeA, { variableAtom: this.variableAtom, domain: this.range })
      } else if (this.type[0] === 'x^a' && this.type[1] === -1) {
        return new BasicFunction('x^a', -1, { variableAtom: this.variableAtom, domain: this.range })
      } else {
        throw 'BasicFunction ERROR: the inverse of this function is not implemented yet';
      }
    } else {
      throw 'BasicFunction ERROR: this function is not invertible';
    }
  }

  /**
   * @returns the GeneralFunction representation of this basic function
   */
  toGeneralFunction(): GeneralFunction {
    return new GeneralFunction(this.expression, this.domain, this.range);
  }

  clone(): BasicFunction {
    return new BasicFunction(this.type[0], this.type[1], { domain: this.domain, variableAtom: this.variableAtom });
  }
}

/////////////////////////////////////////////////////////////////
// GeneralFunction
////////////////////////////////////////////////////////////////
/**
 * GeneralFunction class
 *
 * @expression Expression representing the function
 * @domain Interval or Interval[] representing the domain
 * @range Interval or Interval[] representing the range
 *
 * WARNING: the range may not be simplified if complicated domains are provided *
 */
class GeneralFunction {
  expression: Expression;
  domain: Interval | Interval[];
  range: Interval | Interval[];

  constructor(expression: Expression, domain: Interval | Interval[], range: Interval | Interval[]) {
    domain = domain instanceof Interval ? domain.clone() : domain.map(i => i.clone());
    range = range instanceof Interval ? range.clone() : range.map(i => i.clone());
    this.expression = expression.clone();
    this.domain = domain;
    this.range = range;
  }

  /**
   * toString method: outputs latex string representing the function
   * @param options defaults to `{name: 'f', definitionMode: false}`
   * definitionMode true gives us the f:x\mapsto notation while false gives us the f(x) notation
   */
  toString(options?: BasicFunctionToStringOptions): string {
    const defaultOptions = {
      name: 'f',
      definitionMode: false
    }
    const optionsObject = { ...defaultOptions, ...options };
    return optionsObject.definitionMode ? `${optionsObject.name} : x \\mapsto ${this.expression}` : `${optionsObject.name}(x) = ${this.expression}`;
  }


}

/////////////////////////////////////////////////////////////////
// FunctionChain
////////////////////////////////////////////////////////////////

/**
 * FunctionChain class
 * The FunctionChain class builds a function through composition of
 * `BasicFunction`s (addition, scalar multiplication and exponentiation)
 * 
 * @expression Expression representing the function
 * @domain Interval or Interval[] representing the domain
 * @range Interval or Interval[] representing the range
 * @chain a BasicFunction[] array showing how this function is composed
 * the order is such that the first entry is first. e.g. [f, g] will represent the function g \\circ f
 * 
 * WARNING: the range may not be simplified if complicated domains are provided *
 */
class FunctionChain extends GeneralFunction{
  //// instance properties
  chain: BasicFunction[];

  /**
   * given f, g, h, ... return the General Function representation of ...hgf(x)
   */
  constructor(...basicFunctions: BasicFunction[]) {
    const firstFunction = basicFunctions[0];
    const dummyX = new Expression(new Term(1, firstFunction.variableAtom))
    const identity = new GeneralFunction(dummyX, firstFunction.domain, firstFunction.domain);
    const finalFunction = basicFunctions.reduce((a, c) => compose(a, c), identity);
    super(finalFunction.expression, finalFunction.domain, finalFunction.range);
    this.chain = basicFunctions.map(f => f.clone());
  }

  /**
   * inverse
   */
  inverse(): FunctionChain {
    let clonedChain = [...this.chain];
    clonedChain.reverse();
    clonedChain = clonedChain.map(f => f.inverse());
    clonedChain[0].domain = this.range;
    return new FunctionChain(...clonedChain);
  }
}



/**
 * @returns $g \\circ f$
 * @param f the first argument (a `GeneralFunction`)
 * @param g is the second argument (a `BasicFunction`)
 * 
 * WARNING: to ensure no errors, please check if they can be composed with the "canCompose function"
 */
function compose(f: GeneralFunction, g: BasicFunction): GeneralFunction {
  const type = g.type[0];
  const a = g.type[1];
  if (type === 'ax') {
    //let expressionString = f.expression.toString();
    //expressionString = (expressionString.includes("+") || expressionString.includes("-")) ? `\\left( ${expressionString} \\right)` : expressionString;
    //const term = new Term(a, expressionString);
    //const expression = new Expression(term);
    const range = f.range instanceof Interval ? f.range.times(a) : f.range.map(i => i.times(a));
    return new GeneralFunction(f.expression.multiply(a), f.domain, range);
  } else if (type === 'x+a') {
    //const term = new Term(1, f.expression.toString());
    //const expression = new Expression(term, a);
    const range = f.range instanceof Interval ? f.range.plus(a) : f.range.map(i => i.plus(a));
    const aExpression = new Expression(a)
    return new GeneralFunction(f.expression.add(aExpression), f.domain, range);
  } else { // x^a
    let expression: Expression;
    if (a.valueOf() > 0) {
      //expression = new Polynomial([1], { initialDegree: a as number, variableAtom: f.expression.toString() });
      let expressionString = f.expression.toString();
      const power = a.toString().length > 1 ? `^{${a}}` : `^${a}`;
      expressionString = expressionString.length > 1 ? `( ${expressionString} )` : expressionString;
      const term = new Term(1, `${expressionString}${power}`);
      expression = new Expression(term);
    } else {
      const power = a === -1 ? '' : `^{${Math.abs(a as number)}}`
      const one_Over_gX_Term = new Term(1, `\\frac{1}{ ${f.expression}${power} }`)
      expression = new Expression(one_Over_gX_Term);
    }
    let range = f.range instanceof Interval ? f.range.pow(a as number) : f.range.map(i => i.pow(a as number) as Interval);
    if (!(range instanceof Interval) && range.length===2) {
      range = range[0].union(range[1]);
    }
    return new GeneralFunction(expression, f.domain, range);
  }
}

/**
 * checks if $g \\circ f$ is defined
 * i.e. if $R_f \\subseteq D_g$.
 */
function canCompose(f: BasicFunction | GeneralFunction, g: BasicFunction | GeneralFunction): boolean {
  f = f instanceof BasicFunction ? f.toGeneralFunction() : f;
  g = g instanceof BasicFunction ? g.toGeneralFunction() : g;

  const Rf = f.range, Dg = g.domain;
  return Interval.IntervalsSubsetEq(Rf, Dg);
}



interface BasicFunctionOptions{
  domain?: Interval | Interval[],
  variableAtom?: string
}

interface BasicFunctionToStringOptions{
  name?: string,
  definitionMode?: boolean
}

export {BasicFunction, GeneralFunction, FunctionChain, compose, canCompose}