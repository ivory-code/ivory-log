// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle(func: (...args: any[]) => void, delay: number) {
  let timeoutId: NodeJS.Timeout | null = null

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (...args: any[]) {
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        timeoutId = null
        func(...args)
      }, delay)
    }
  }
}
