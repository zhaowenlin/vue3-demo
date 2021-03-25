import { VuexModule } from 'vuex-module-decorators'
import { cached } from '../'
export function authSettings(useAuth: boolean, authStore: VuexModule) {
  function createAuthFun(contextPath: string) {
    const cacheFn = cached(createAuthExpression)
    return function(expression: string) {
      if (!useAuth) return
      if (typeof expression !== 'string') return
      expression = expression.trim()
      const context = authStore[contextPath]
      // 单权限判断
      if (/^\w+$/.test(expression)) {
        return !!context[expression]
      } else {
        // 组合权限判断
        const fn = cacheFn(expression)
        return fn(context)
      }
    }
  }
  function createAuthExpression(expression: string) {
    return new Function(
      `const context = arguments[0]
          return !!(${expression.replace(/(^|\W)(?=\w+))/g, `$1context.`)})`
    )
  }
  const auth = createAuthFun('getCurrentPageAuth')
  const pageAuth = createAuthFun('getAllPathAuth')
  return {
    auth,
    pageAuth
  }
}
