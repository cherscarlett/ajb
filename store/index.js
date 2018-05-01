import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      content: {},
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
          url: "youtube.com/user/hoodrych85"
        }
      ]
    },
    mutations: {
      put(state, { type, entries }) {
        Object.assign(state.content, { [type]: entries });
      }
    }
  });
};

export default createStore;
