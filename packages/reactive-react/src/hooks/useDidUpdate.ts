import { useLayoutEffect, useRef } from 'react'
import { immediate } from '../shared'

export const useDidUpdate = (callback?: () => void) => {
  const request = useRef(null)
  request.current = immediate(callback)
  // 可以有效解决闪屏问题 任何更新都会触发执行callback 也就是pending的更新
  useLayoutEffect(() => {
    request.current()
    callback()
  })
}
