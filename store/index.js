import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      content: {},
      loading: true,
      footerLinks: [
        {
          id: "instagram",
          url: "instagram.com/hoodrychx"
        },
        {
          id: "twitter",
          url: "twitter.com/hoodrychx"
        },
        {
          id: "vimeo",
          url: "vimeo.com/hoodrychx"
        },
        {
          id: "youtube",
          url: "youtube.com/hoodrych"
        }
      ]
    },
    mutations: {
      put(state, { type, entries }) {
        Object.assign(state.content, { [type]: entries });
      },
      toggle(state, { bool }) {
        state.loading = bool;
      }
    }
  });
};

export default createStore;
