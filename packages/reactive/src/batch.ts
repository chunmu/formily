import { isFn } from './checkers'
import {
  batchStart,
  batchEnd,
  batchScopeStart,
  batchScopeEnd,
} from './reaction'
import { createAnnotation } from './internals'
import { MakeObservableSymbol } from './environment'

interface IAction {
  <T extends (...args: any[]) => any>(callback?: T): T
}

const createBatchAnnotation = <F extends (...args: any[]) => any>(method: F) => {
  return createAnnotation(({ target, key, value }) => {
    const action = <T extends (...args: any[]) => any>(callback?: T) => {
      return function (...args: Parameters<T>): ReturnType<T> {
        // 当key为setValuesIn的时候 method=batch 初始时候给值undefined
        return method(() =>
          {
            const xx = isFn(callback) ? callback.apply(target, args) : undefined
            return xx;
          }
        )
      }
    }
    if (target) {
      target[key] = action(target[key])
      
      return target
    }
    return action(value)
  })
}

export const batch = <T>(callback?: () => T) => {
  let result: T = null
  try {
    batchStart()
    if (isFn(callback)) {
      result = callback()
    }
  } finally {
    batchEnd()
  }
  return result
}

export const action: IAction = createBatchAnnotation(batch)

batch.scope = <T>(callback?: () => T) => {
  let result: T = null
  try {
    batchScopeStart()
    if (isFn(callback)) {
      result = callback()
    }
  } finally {
    batchScopeEnd()
  }
  return result
}

batch[MakeObservableSymbol] = action
batch.scope[MakeObservableSymbol] = createBatchAnnotation(batch.scope)
