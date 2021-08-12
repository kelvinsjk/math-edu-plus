/**
 * encode into a string  used to represent a "qn code"
 * the qn code will help debugging and for users to retrieve a specific qn
 * that was randomly generated
 */
function encode(...args: (number | string)[]): string {
  let str = '';
  for (const arg of args) {
    if (typeof arg === 'number') {
      str += encodeChar(arg.toString());
    } else {
      // string
      if (str === '\\leq') {
        str += '[';
      } else if (str === '\\geq') {
        str += ']';
      } else if (str === '\\neq') {
        str += '!';
      } else {
        str += arg;
      }
    }
  } // end of for loop
  return str;
}

/**
 * decode a "qn code"
 * @returns an array with the numbers or str being represented by the code
 */
function decode(str: string): (number | string)[] {
  const arr = str.split('');
  const output: (number | string)[] = [];
  while (arr.length > 0) {
    const char = arr.shift() as string;
    if (char === '[') {
      output.push('\\leq');
    } else if (char === ']') {
      output.push('\\geq');
    } else if (char === '!') {
      output.push('\\neq');
    } else {
      const charCode = char.charCodeAt(0);
      if (isDigit(charCode)) {
        output.push(Number(char));
      } else if ((charCode > 64 && charCode < 73) || charCode === 74) {
        // negative number
        if (charCode === 74) {
          output.push(-9);
        } else {
          output.push(64 - charCode);
        }
      } else {
        // ">, <, =", alphabet
        output.push(char);
      }
    }
  } // end of while loop
  return output;
}

function encodeChar(str: string): string {
  const charCode = str.charCodeAt(0);
  if (isDigit(charCode) || isComparison(charCode) || isLowerCaseAlphabet(charCode)) {
    return str[0];
  }
  if (str[0] === '-') {
    // negative number
    return str === '-9' ? 'J' : String.fromCharCode(64 - Number(str));
  } else {
    throw 'unexpected string received';
  }
}

function isDigit(charCode: number): boolean {
  return charCode < 58 && charCode > 47;
}

function isComparison(charCode: number): boolean {
  return (charCode < 63 && charCode > 59) || charCode === 33 || charCode === 91 || charCode === 93;
}

function isLowerCaseAlphabet(charCode: number): boolean {
  return charCode < 123 && charCode > 96;
}

export { encode, decode };
