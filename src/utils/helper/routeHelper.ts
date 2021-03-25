import { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router'

// Return to the new routing structure, not affected by the original example
export function getRoute(
  route: RouteLocationNormalized
): RouteLocationNormalized {
  if (!route) return route
  const { matched, ...opt } = route
  return {
    ...opt,
    matched: (matched
      ? matched.map(item => ({
        meta: item.meta,
        name: item.name,
        path: item.path
      }))
      : undefined) as RouteRecordNormalized[]
  }
}
