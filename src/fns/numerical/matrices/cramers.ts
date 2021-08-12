import determinant from './determinant';

/**
 * apply Cramer's rule to 2x2 [[a b], [d e]] = [[c], [f]]
 * or to 3x3 [[a b c], [e f g], [i j k] = [[d], [h], [l]]]
 */
export default function cramers(...args: number[]): number[] {
  if (args.length === 6) {
    const detA = determinant(...args.slice(0, 2), ...args.slice(3, 5));
    if (detA === 0) {
      throw new Error('determinant 0: no roots found');
    }
    const detX = determinant(args[2], args[1], args[5], args[4]);
    const detY = determinant(args[0], args[2], args[3], args[5]);
    return [detX / detA, detY / detA];
  } else if (args.length === 12) {
    const detA = determinant(...args.slice(0, 3), ...args.slice(4, 7), ...args.slice(8, 11));
    if (detA === 0) {
      throw new Error('determinant 0: no roots found');
    }
    const detX = determinant(
      args[3],
      ...args.slice(1, 3),
      args[7],
      ...args.slice(5, 7),
      args[11],
      ...args.slice(9, 11),
    );
    const detY = determinant(args[0], args[3], args[2], args[4], args[7], args[6], args[8], args[11], args[10]);
    const detZ = determinant(
      ...args.slice(0, 2),
      args[3],
      ...args.slice(4, 6),
      args[7],
      ...args.slice(8, 10),
      args[11],
    );
    return [detX / detA, detY / detA, detZ / detA];
  } else {
    throw new Error('only 2x2 (6 arguments) and 3x3 (12 arguments) equations are supported');
  }
}
