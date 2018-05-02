<template lang='haml' src='./Card.haml' />
<style lang='scss' src='./Card.scss' />

<script>
  import axios from 'axios'

  export default {
    props: ['card'],
    mounted () {
      this.getThumbnail()
    },
    data () {
      return {
        thumbnail: null
      }
    },
    methods: {
      async getThumbnail () {
        let { data } = await axios.get(`https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/${this.card.vimeoId}`)
        this.$store.commit('toggle', { bool: false })
        this.thumbnail = {
          url: data.thumbnail_url_with_play_button,
          height: data.thumbnail_height,
          width: data.thumbnail_width
        }
      }
    }
  }
</script>
