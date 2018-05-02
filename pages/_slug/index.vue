<template lang='haml' src='./index.haml' />
<style lang='scss' scoped src='./index.scss' />

<script>
  const contentful = require('contentful')
  import axios from 'axios'

  export default {
    async asyncData ({env, store, params}) {
      const client = contentful.createClient({
        space: env.contentfulSpaceId,
        accessToken: env.contenfulClientId
      })
      return client
        .getEntries({content_type: 'video'})
        .then(async (response) => {
          store.commit('toggle', { bool: false })
          const video = response.items.find(entry => entry.fields.slug === params.slug)
          const { data } = await axios.get(`https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/${video.fields.vimeoId}&title=false&portrait=false&byline=false&autoplay=true&height=1280&width=720`)
          return { iframe: data.html, title: video.fields.title, description: video.fields.description, vimeoId: video.fields.vimeoId, thumbnail: data.thumbnail_url_with_play_button, height: data.height, width: data.width, slug: params.slug }
        })
        .catch(console.error)
    },
    head () {
      return {
        title: this.title + ' || hoodrych || ajb',
        meta: [
          { hid: "description", name: "description", content: this.description },
          { property: "og:title", content: this.title + ' || hoodrych || ajb' },
          { property: "og:site_name", content: "hoodrych || ajb" },
          { property: "og:description", content: "ajb | " + this.description },
          { property: "og:image", content: this.thumbnail },
          { property: "og:image:secure_url", content: this.thumbnail },
          { property: "og:video:url", content: "https://player.vimeo.com/video/" + this.vimeoId + "?autoplay=1" },
          { property: "og:video:secure_url", content: "https://player.vimeo.com/video/" + this.vimeoId + "?autoplay=1" },
          { property: "og:video:type", content: "text/html" },
          { property: "og:video:width", content: this.width },
          { property: "og:video:height", content: this.height },
          { property: "og:video:url", content: "https://vimeo.com/moogaloop.swf?clip_id=" + this.vimeoId + "?autoplay=1" },
          { property: "og:video:secure_url", content: "https://vimeo.com/moogaloop.swf?clip_id=" + this.vimeoId + "?autoplay=1" },
          { property: "og:video:type", content: "application/x-shockwave-flash" },
          { property: "og:url", content: "http://hoodry.ch/" + this.slug },
          { property: "og:type", content: "article"},
          { name: "twitter:site", content: "@hoodrychx" },
          { name: "twitter:image:alt", content: "" },
          { name: "twitter:card", content: "player" },
          { name: "twitter:player:width", content: this.width },
          { name: "twitter:player:height", content: this.height },
          { name: "twitter:player", content: "https://player.vimeo.com/video/" + this.vimeoId },
          { name: "twitter:player:url", content: "https://player.vimeo.com/video/" + this.vimeoId },
          { name: "twitter:player:secure_url", content: "https://player.vimeo.com/video/" + this.vimeoId },
          { name: "twitter:creator", content: "hoodrychx" }
        ],
        link: [
          {rel: "canonical",
          href: "http://hoodry.ch/" + this.slug}
        ]
      }
    }
  }
</script>
