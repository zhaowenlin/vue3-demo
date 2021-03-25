// import actions from './actions'
// import mutations from './mutations'
// import getters from './getter'
// import { createStore } from 'vuex'

// export default createStore({
//   state() {
//     return {}
//   },
//   getters,
//   actions,
//   mutations,
// })
import { App } from 'vue'
import { createStore } from 'vuex'
import { config } from 'vuex-module-decorators'
import { isDevMode } from '/@/utils/env'

config.rawError = true

const store = createStore({
  strict: isDevMode()
})

export function setupStore(app: App<Element>) {
  app.use(store)
}

export default store
