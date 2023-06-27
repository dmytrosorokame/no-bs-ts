function forEachByReduce<T>(
  items: T[],
  cb: (v: T, i: number, arr: T[]) => void
): void {
  items.reduce((_, el, i, arr) => {
    cb(el, i, arr);

    return _;
  }, "");
}

function filterByReduce<T>(
  items: T[],
  cb: (v: T, i: number, arr: T[]) => boolean
): T[] {
  return items.reduce((acc: T[], el, i, arr) => {
    if (cb(el, i, arr)) {
      acc.push(el);
    }

    return acc;
  }, []);
}

function mapByReduce<T, K>(
  items: T[],
  cb: (v: T, i: number, arr: T[]) => K
): K[] {
  return items.reduce((acc: K[], el, i, arr) => {
    acc[i] = cb(el, i, arr);

    return acc;
  }, []);
}

const testArr = [10, 20, 30];

forEachByReduce(testArr, (el) => console.log(el));

const filteredArr = filterByReduce(testArr, (el) => el >= 20);

console.log(filteredArr);

const mappedArr = mapByReduce(testArr, (el) => el * 2);

console.log(mappedArr);
