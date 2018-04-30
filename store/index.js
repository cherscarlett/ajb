import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: { content: {} },
    mutations: {
      put (state, { type, entries }) {
        Object.assign(state.content, { [type]: entries })
      }
    }
  })
}

export default createStore
