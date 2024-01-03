import { delay } from './delay';

export const onCountdown = async (x: number, fn: (i: number | undefined) => void) => {
  const nums = Array(x + 1)
    .fill(undefined)
    .map((_, j) => x - j);
  for (const num of nums) {
    fn(num);
    await delay(1000);
  }
  fn(undefined);
  return;
};
