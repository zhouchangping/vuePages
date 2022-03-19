import { isSupportPerformance } from './utils'
import { log, logIndicator } from './log'
import {
  getNavigationTime,
  getNetworkInfo,
  getPaintTime,
  getFID,
  getLCP,
  getCLS,
  getTTI,
} from './indicator'
import { hiddenTime } from './utils'
import { config } from './config'

export default class PerMoniteur {
  constructor(args) {
    config.tracker = args.tracker
    if (typeof args.log === 'boolean') config.log = args.log
    if (!isSupportPerformance) {
      log(`This browser doesn't support Performance API`)
      return
    }
    // logIndicator('Navigation Time', getNavigationTime())
    // logIndicator('Network Info', getNetworkInfo())
    // getPaintTime()
    // getFID()
    // getLCP()
    // getCLS()
    getTTI()

    // indicator not be measured when the page is loaded in a background tab
    // document.addEventListener(
    //   'visibilitychange',
    //   (event) => {
    //     // @ts-ignore
    //     hiddenTime = Math.min(hiddenTime, event.timeStamp)
    //   },
    //   { once: true }
    // )
  }
  markStart (name) {
    performance.mark(name)
  }
  markEnd (startName, endName) {
    performance.mark(endName)
    const measureName = `PerMoniteur-${startName}`
    performance.measure(measureName, startName, endName)
    const measures = performance.getEntriesByName(measureName)
    measures.forEach((measure) => logIndicator(measureName, measure, true))
  }
  clearMarks (name) {
    performance.clearMarks(name)
  }
  clearMeasures (name) {
    performance.clearMeasures(`PerMoniteur-${name}`)
  }
  fmpStart () {
    this.markStart('fmp-start')
  }
  fmpEnd () {
    performance.mark('fmp-end')
    performance.measure('fmp', 'fmp-start', 'fmp-end')
    const measures = performance.getEntriesByName('fmp')
    measures.forEach((measure) =>
      logIndicator('fmp', {
        time: measure.duration,
      })
    )
  }
}