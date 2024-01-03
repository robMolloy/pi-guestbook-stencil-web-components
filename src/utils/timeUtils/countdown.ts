import { delay } from './delay';

export const onCountdown = async (start: number, stop: number, fn: (i: number) => void) => {
  const diff = Math.abs(start - stop);
  const direction = start > stop ? 'negative' : 'positve';
  const nums = Array(diff + 1)
    .fill(undefined)
    .map((_, j) => start + (direction === 'negative' ? -1 : 1) * j);
  for (const num of nums) {
    await fn(num);
    await delay(1000);
  }
  return;
};
