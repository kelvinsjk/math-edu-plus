/**
 * determinant of [[a b], [c d]] 2x2 matrix or [[a b c], [d e f], [g h i]] 3x3 matrix
 * 
 * WARNING: does not work for any other sizes
 */
export default function determinant(...args: number[]): number {
  if (args.length === 4) {
    return args[0] * args[3] - args[1] * args[2];
  } else if (args.length === 9) {
    return args[0] * determinant(args[4], args[5], args[7], args[8]) - args[1] * determinant(args[3], args[5], args[6], args[8]) + args[2] * determinant(args[3], args[4], args[6], args[7]);
  } else {
    throw new Error('determinant: only 2x2 or 3x3 matrices supported')
  }
}