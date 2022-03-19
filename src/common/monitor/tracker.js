import { config } from './config'

const allData = {}

const typeMap = {
  'Navigation Time': 'navigationTime',
  'Network Info': 'networkInfo',
  FCP: 'fcp',
  FP: 'fp',
  'LCP Update': 'lcp',
  'CLS Update': 'cls',
  TBT: 'tbt',
  FID: 'fid',
  TTI: 'tti',
}

export default (type, data) => {
  const currentType = typeMap[type]
  allData[currentType] = data
  config.tracker && config.tracker(currentType, data, allData)
}