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
          const video = response.items.find(entry => entry.fields.slug === params.slug)
          const { data } = await axios.get(`https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/${video.fields.vimeoId}&title=false&portrait=false&byline=false&autoplay=true&height=auto&width=auto`)
          return { iframe: data.html }
        })
        .catch(console.error)
    }
  }
</script>
