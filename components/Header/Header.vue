<template lang='haml' src='./Header.haml' />
<style lang='scss' scoped src='./Header.scss' />

<script>
  import Nav from '~/components/Nav/Nav.vue'
  import FixedHeader from 'vue-fixed-header'

  export default {
    components: {
      Nav,
      FixedHeader
    },
    data () {
      return {
        isFixed: false
      }
    }
  }
</script>
