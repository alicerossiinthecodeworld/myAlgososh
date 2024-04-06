export const calculateFibonacci = (n: number): number => {
  if (n <= 1) {
    return n;
  }
  return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
};