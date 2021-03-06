import { FunctionalComponent } from 'vue'
import { RouteLocation } from 'vue-router'

export interface DefaultContext {
  Component: FunctionalComponent & { type: Indexable; }
  route: RouteLocation
}

export function getTransitionName({
  route,
  openCache,
  cacheTabs,
  enableTransition,
  def
}: Pick<DefaultContext, 'route'> & {
  enableTransition: boolean
  openCache: boolean
  def: string
  cacheTabs: string[]
}) {
  const isInCache = cacheTabs.includes(route.name as string)
  const transitionName = 'fade-slide'
  let name: string | null = transitionName

  if (openCache) {
    name =
      isInCache && route.meta.loaded && enableTransition ? transitionName : null
  }
  return name || route.meta.transitionName || def
}
