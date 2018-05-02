import Vue from "vue";
import VueLazyload from "vue-lazyload";

Vue.use(VueLazyload, {
  loading: "loading.svg",
  error: "loading.svg",
  attempt: 10,
  throttleWait: 1000,
  lazyComponent: true
});
