export const foldr = <A, B>(f: (x: A, acc: B) => B, acc: B, [h, ...t]: A[]): B => h === undefined ? acc : f(h, foldr(f, acc, t));
