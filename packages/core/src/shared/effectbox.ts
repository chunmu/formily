import { isFn, isValid } from '../../../shared/src'
import { LifeCycle, Form } from '../models'
import { AnyFunction } from '../types'
import { isForm } from './checkers'
import { GlobalState } from './constants'

export const createEffectHook = <
  F extends (payload: any, ...ctxs: any[]) => AnyFunction
>(
  type: string,
  callback?: F
) => {
  return (...args: Parameters<ReturnType<F>>) => {
    if (GlobalState.effectStart) {
      GlobalState.lifecycles.push(
        new LifeCycle(type, (payload, ctx) => {
          if (isFn(callback)) {
            callback(payload, ctx, ...GlobalState.context)(...args)
          }
        })
      )
    } else {
      throw new Error(
        'Effect hooks cannot be used in asynchronous function body'
      )
    }
  }
}

// defaultValue = form
export const createEffectContext = <T = any>(defaultValue?: T) => {
  let index: number
  return {
    provide(value?: T) {
      if (GlobalState.effectStart) {
        index = GlobalState.context.length
        // 全局GlobalState记录 context上下文的值 怎么做到严格表征顺序啊
        GlobalState.context[index] = isValid(value) ? value : defaultValue
      } else {
        throw new Error(
          'Provide method cannot be used in asynchronous function body'
        )
      }
    },
    consume(): T {
      if (!GlobalState.effectStart) {
        throw new Error(
          'Consume method cannot be used in asynchronous function body'
        )
      }
      return GlobalState.context[index]
    },
  }
}

const FormEffectContext = createEffectContext<Form>()

export const useEffectForm = FormEffectContext.consume

export const runEffects = <Context>(
  context?: Context,
  ...args: ((context: Context) => void)[]
): LifeCycle[] => {
  GlobalState.lifecycles = []
  GlobalState.context = [] // 清空当前可访问的context 也就是form
  GlobalState.effectStart = true
  GlobalState.effectEnd = false
  if (isForm(context)) {
    FormEffectContext.provide(context)
  }
  args.forEach((effects) => {
    if (isFn(effects)) {
      effects(context)
    }
  })
  GlobalState.context = [] // 使用完后又清空
  GlobalState.effectStart = false
  GlobalState.effectEnd = true
  return GlobalState.lifecycles
}
