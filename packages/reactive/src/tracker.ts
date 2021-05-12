import { ReactionStack } from './environment'
import { isFn } from './checkers'
import { Reaction } from './types'
import {
  batchEnd,
  batchStart,
  disposeBindingReactions,
  releaseBindingReactions,
} from './reaction'

export class Tracker {
  private results: any
  constructor(
    scheduler?: (reaction: Reaction) => void,
    name = 'TrackerReaction'
  ) {
    // 更新视图
    this.track._scheduler = scheduler
    this.track._name = name
  }

  track: Reaction = (tracker: Reaction) => {
    if (ReactionStack.indexOf(this.track) === -1) {
      releaseBindingReactions(this.track)
      try {
        // 在初始化组件的时候压入当前track
        ReactionStack.push(this.track)
        batchStart()
        if (isFn(tracker)) {
          this.results = tracker()
        }
      } finally {
        batchEnd()
        // 在初始化结束后 清除上面压入的track
        ReactionStack.pop()
      }
    }
    return this.results
  }

  dispose = () => {
    disposeBindingReactions(this.track)
  }
}
