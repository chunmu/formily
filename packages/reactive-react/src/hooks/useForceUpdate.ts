import { useCallback, useEffect, useRef, useState } from 'react'
import { useDidUpdate } from './useDidUpdate'

const EMPTY_ARRAY: any[] = []
const RENDER_COUNT = { value: 0 }
const RENDER_QUEUE = new Set<() => void>()

export function useForceUpdate() {
  const [, setTick] = useState(0)
  // 用来判断是否初始渲染完成
  const unmountRef = useRef(false)

  const update = useCallback(() => {
    if (unmountRef.current) return
    setTick((tick) => {
      return tick + 1
    })
  }, EMPTY_ARRAY)

  const scheduler = useCallback(() => {
    if (RENDER_COUNT.value === 0) {
      update()
    } else {
      if (!RENDER_QUEUE.has(update)) {
        RENDER_QUEUE.add(update)
      }
    }
  }, EMPTY_ARRAY)

  // 任何更新都会触发自增
  RENDER_COUNT.value++

  useDidUpdate(() => {
    // 清除 且执行pending的更新
    RENDER_COUNT.value--
    if (RENDER_COUNT.value === 0) {
      if (unmountRef.current) return
      RENDER_QUEUE.forEach((update) => {
        RENDER_QUEUE.delete(update)
        update()
      })
    }
  })

  useEffect(() => {
    unmountRef.current = false
    return () => {
      unmountRef.current = true
    }
  }, [])

  return scheduler
}
