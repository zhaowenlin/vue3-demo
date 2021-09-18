// traverse, cached, makeMap
import { isFunction, isObject, isArray } from './is'
export const cached = (fn: (...args: any[]) => any) => {
  const cache = Object.create(null)
  return function cachedFn(str: string, ...arg: any[]) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str, ...arg))
  }
}
export const makeMap = (arr: any[], val: any) => {
  const map = {}
  arr.forEach(a => {
    map[a] = isFunction(val) ? val(a) : val
  })
}
export function traversBy(
  item: any,
  childrenKey = 'children',
  fn: (...args: any[]) => any
) {
  if (typeof item !== 'object') return
  if (isObject(item)) {
    fn(item)
    if (item[childrenKey]) {
      traversBy(item[childrenKey], childrenKey, fn)
    }
  } else if (isArray(item)) {
    item.forEach(v => traversBy(v, childrenKey, fn))
  }
}
