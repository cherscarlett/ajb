<script>
import axios from "axios";

export default {
  props: ["card"],
  mounted() {
    this.getThumbnail();
  },
  data() {
    return {
      thumbnail: null
    };
  },
  methods: {
    async getThumbnail() {
      const platform = this.card.selectedPlatform.toLowerCase();
      const urlPrefixes = {
        vimeo: "https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/",
        youtube: `https://www.googleapis.com/youtube/v3/videos?part=snippet&key=${
          process.env.youTubeClientId
        }&id=`
      };
      let id;
      if (platform === "vimeo") {
        id = this.card.vimeoId;
      }
      if (platform === "youtube") {
        id = this.card.youTubeId;
      }
      const { data } = await axios.get(`${urlPrefixes[platform]}${id}`);
      this.$store.commit("toggle", { bool: false });
      if (platform === "vimeo") {
        this.thumbnail = {
          url: data.thumbnail_url,
          height: data.thumbnail_height,
          width: data.thumbnail_width
        };
      }
      if (platform === "youtube") {
        this.thumbnail = data.items[0].snippet.thumbnails.maxres;
      }
    }
  }
};
</script>

<template lang='haml' src='./Card.haml' />
<style lang='scss' src='./Card.scss' />
