export function print(text: string, cb: () => void): void {
  console.log(text);

  cb();
}

type MutationFunction = (n: number) => number;

export function arrayMutation(
  numbers: number[],
  mutate: MutationFunction
): number[] {
  return numbers.map(mutate);
}

console.log(arrayMutation([1, 2, 3], (n) => n * 2));
