require("dotenv").config();

module.exports = {
  env: {
    twitchClientId: process.env.TWITCH_CLIENT_ID || "failed",
    youTubeClientId: process.env.YOUTUBE_CLIENT_ID || "failed",
    contenfulClientId: process.env.CONTENTFUL_CLIENT_ID || "failed",
    contentfulSpaceId: process.env.CONTENTFUL_SPACE_ID || "failed"
  },
  plugins: [
    "~/plugins/vue-moment",
    "~/plugins/vue-lazy-load",
    "~/plugins/vue-modal"
  ],
  modules: ["@nuxtjs/dotenv"],
  /*
  ** Headers of the page
  */
  head: {
    title: "Hoodrych || ajb",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Films by ajb" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
      {
        rel: "stylesheet",
        href: "/typography.css"
      }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: "rgba(255, 255, 255, .6)", height: "5px" },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  }
};
