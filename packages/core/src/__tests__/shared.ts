export const attach = <T extends { onMount: () => void }>(target: T): T => {
  target.onMount()
  console.log(target.onMount, 'target')
  return target
}

export const sleep = (duration = 100) =>
  new Promise((resolve) => {
    setTimeout(resolve, duration)
  })