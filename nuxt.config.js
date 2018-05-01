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
    title: "hoodrych || ajb",
    meta: [
      { charset: "utf-8" },
      { name: "author", content: "Adam Brown" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "ajb | visual | digital native"
      },
      {
        name: "keywords",
        content:
          "hoodrych, adam brown, ajb, videos, films, short films, photography, videography, nature, action, surfing, photographer, videographer, socal, hiking, art"
      },
      { property: "og:title", content: "hoodrych || ajb" },
      { property: "og:site_name", content: "hoodrych || ajb" },
      { property: "og:description", content: "ajb | visual | digital native" },
      { property: "og:image", content: "http://hoodry.ch/social.jpg" },
      { property: "og:url", content: "http://hoodry.ch" },
      { name: "twitter:site", content: "@hoodrychx" },
      { name: "twitter:image:alt", content: "" },
      { name: "twitter:card", content: "summary_large_image" }
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
