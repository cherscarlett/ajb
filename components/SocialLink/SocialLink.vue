<template lang='haml' src='./SocialLink.haml' />
<style lang='scss' src='./SocialLink.scss' scoped />

<script>
  export default {
    props: ['link'],
    computed: {
      styles () {
        return {
          backgroundImage: 'url(' + this.link.id + '.svg)'
        }
      }
    }
  }
</script>
