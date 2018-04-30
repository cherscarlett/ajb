<template lang='haml' src='./index.haml' />
<style lang='scss' src='./index.scss' />

<script>
  import Card from '~/components/Card/Card.vue'
  const contentful = require('contentful')

  export default {
    components: {
      Card
    },
    asyncData ({env, store, params}) {
      const client = contentful.createClient({
        space: env.contentfulSpaceId,
        accessToken: env.contenfulClientId
      })
      return client
        .getEntries({content_type: 'video'})
        .then((response) => {
          return {
            cards: response.items.map(entry => {
              return Object.assign({ id: entry.sys.id }, entry.fields)
            })
          }
        })
        .catch(console.error)
    }
  }
</script>
