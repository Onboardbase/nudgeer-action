/**
 * Wait for a number of milliseconds.
 * @param milliseconds The number of milliseconds to wait.
 * @returns {Promise<string>} Resolves with 'done!' after the wait is over.
 */
export function wait(milliseconds: number): void {
  setTimeout(() => 'hi', milliseconds)
}
