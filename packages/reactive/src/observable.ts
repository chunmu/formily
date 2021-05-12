import * as annotations from './annotations'
import { MakeObservableSymbol } from './environment'
import { createObservable } from './internals'

export function observable<T extends object>(target: T): T {
  return createObservable(null, null, target)
}

observable.box = annotations.box
observable.ref = annotations.ref
observable.deep = annotations.observable
observable.shallow = annotations.shallow
observable.computed = annotations.computed
// key=values初始化的时候 执行的是annotations上挂载的observable 而不是上面那个
observable[MakeObservableSymbol] = annotations.observable
