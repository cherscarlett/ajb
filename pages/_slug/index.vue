<script>
const contentful = require("contentful");
import axios from "axios";
import Video from "~/components/Video/Video.vue";

export default {
  async asyncData({ env, store, params }) {
    const client = contentful.createClient({
      space: env.contentfulSpaceId,
      accessToken: env.contenfulClientId
    });
    return client
      .getEntries({ content_type: "video" })
      .then(async response => {
        store.commit("toggle", { bool: false });
        const video = response.items.find(
          entry => entry.fields.slug === params.slug
        );
        const platform = video.fields.selectedPlatform.toLowerCase();
        if (platform === "vimeo") {
          const { data } = await axios.get(
            `https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/${
              video.fields.vimeoId
            }&title=false&portrait=false&byline=false&autoplay=true&height=720&width=1280`
          );
          return {
            iframe: data.html,
            title: video.fields.title,
            description: video.fields.description,
            vimeoId: video.fields.vimeoId,
            thumbnail: data.thumbnail_url_with_play_button,
            height: data.height,
            width: data.width,
            slug: params.slug,
            duration: data.duration,
            released: data.upload_date,
            platform
          };
        }
        if (platform === "youtube") {
          urlPrefix = `https://www.googleapis.com/youtube/v3/videos?part=snippet&key=${
            process.env.youTubeClientId
          }&id=`;
          const { data } = await axios.get(`${urlPrefix}${id}`);
          return {
            iframe: `<iframe type='text/html' width='100%' height='100%' src='https://www.youtube.com/embed/${
              video.fields.youTubeId
            }?autoplay=1&origin=http://hoodry.ch' frameborder='0'></iframe>`,
            thumbnail: data.items[0].snippet.thumbnails.maxres.url,
            youtubeId: video.fields.youTubeId,
            title: video.fields.title,
            description: video.fields.description,
            slug: params.slug,
            platform
          };
        }
      })
      .catch(console.error);
  },
  head() {
    if (this.platform === "vimeo") {
      return {
        title: this.title + " || hoodrych || ajb",
        meta: [
          {
            hid: "description",
            name: "description",
            content: this.description
          },
          {
            hid: "title",
            property: "og:title",
            content: this.title + " || hoodrych || ajb"
          },
          {
            hid: "og:description",
            property: "og:description",
            content: "ajb | " + this.description
          },
          { hid: "image", property: "og:image", content: this.thumbnail },
          {
            hid: "image:secure",
            property: "og:image:secure_url",
            content: this.thumbnail
          },
          {
            hid: "video",
            property: "og:video",
            content:
              "https://player.vimeo.com/video/" + this.vimeoId + "?autoplay=1"
          },
          {
            hid: "video:url",
            property: "og:video:url",
            content:
              "https://player.vimeo.com/video/" + this.vimeoId + "?autoplay=1"
          },
          {
            hid: "video:url:secure",
            property: "og:video:secure_url",
            content:
              "https://player.vimeo.com/video/" + this.vimeoId + "?autoplay=1"
          },
          {
            hid: "video:type",
            property: "og:video:type",
            content: "text/html"
          },
          {
            hid: "video:width",
            property: "og:video:width",
            content: this.width
          },
          {
            hid: "video:height",
            property: "og:video:height",
            content: this.height
          },
          {
            hid: "video:swf",
            property: "og:video",
            content:
              "https://vimeo.com/moogaloop.swf?clip_id=" +
              this.vimeoId +
              "?autoplay=1"
          },
          {
            hid: "video:swf:url",
            property: "og:video:url",
            content:
              "https://vimeo.com/moogaloop.swf?clip_id=" +
              this.vimeoId +
              "?autoplay=1"
          },
          {
            hid: "video:swf:url:secure",
            property: "og:video:secure_url",
            content:
              "https://vimeo.com/moogaloop.swf?clip_id=" +
              this.vimeoId +
              "?autoplay=1"
          },
          {
            hid: "video:swf:type",
            property: "og:video:type",
            content: "application/x-shockwave-flash"
          },
          {
            hid: "video:duration",
            property: "video:duration",
            content: this.duration
          },
          {
            hid: "video:release_date",
            property: "video:release_date",
            content: this.released
          },
          {
            hid: "video:director",
            property: "video:director",
            content: "Adam Brown"
          },
          {
            hid: "url",
            property: "og:url",
            content: "http://hoodry.ch/" + this.slug
          },
          { hid: "type", property: "og:type", content: "video.other" },
          { hid: "twitter:card", name: "twitter:card", content: "player" },
          {
            hid: "twitter:player:width",
            name: "twitter:player:width",
            content: this.width
          },
          {
            hid: "twitter:player:height",
            name: "twitter:player:height",
            content: this.height
          },
          {
            hid: "twitter:player",
            name: "twitter:player",
            content: "https://player.vimeo.com/video/" + this.vimeoId
          },
          {
            hid: "twitter:player:url",
            name: "twitter:player:url",
            content: "https://player.vimeo.com/video/" + this.vimeoId
          },
          {
            hid: "twitter:player:secure_url",
            name: "twitter:player:secure_url",
            content: "https://player.vimeo.com/video/" + this.vimeoId
          },
          {
            hid: "twitter:creator",
            name: "twitter:creator",
            content: "hoodrychx"
          }
        ],
        link: [
          {
            hid: "canonical",
            rel: "canonical",
            href: "http://hoodry.ch/" + this.slug
          }
        ],
        bodyAttrs: {
          class: "video-player"
        }
      };
    }
    if (this.platform === "youtube") {
      return {
        title: this.title + " || hoodrych || ajb",
        meta: [
          {
            hid: "description",
            name: "description",
            content: this.description
          },
          {
            hid: "title",
            property: "og:title",
            content: this.title + " || hoodrych || ajb"
          },
          {
            hid: "og:description",
            property: "og:description",
            content: "ajb | " + this.description
          },
          { hid: "image", property: "og:image", content: this.thumbnail },
          {
            hid: "image:secure",
            property: "og:image:secure_url",
            content: this.thumbnail
          },
          {
            hid: "video",
            property: "og:video",
            content: "https://www.youtube.com/embed/" + this.youtubeId
          },
          {
            hid: "video:url",
            property: "og:video:url",
            content: "https://www.youtube.com/embed/" + this.youtubeId
          },
          {
            hid: "video:url:secure",
            property: "og:video:secure_url",
            content: "https://www.youtube.com/embed/" + this.youtubeId
          },
          {
            hid: "video:type",
            property: "og:video:type",
            content: "text/html"
          },
          {
            hid: "video:width",
            property: "og:video:width",
            content: this.width
          },
          {
            hid: "video:height",
            property: "og:video:height",
            content: this.height
          },
          {
            hid: "video:duration",
            property: "video:duration",
            content: this.duration
          },
          {
            hid: "video:release_date",
            property: "video:release_date",
            content: this.released
          },
          {
            hid: "video:director",
            property: "video:director",
            content: "Adam Brown"
          },
          {
            hid: "url",
            property: "og:url",
            content: "http://hoodry.ch/" + this.slug
          },
          { hid: "type", property: "og:type", content: "video.other" },
          { hid: "twitter:card", name: "twitter:card", content: "player" },
          {
            hid: "twitter:player:width",
            name: "twitter:player:width",
            content: this.width
          },
          {
            hid: "twitter:player:height",
            name: "twitter:player:height",
            content: this.height
          },
          {
            hid: "twitter:player",
            name: "twitter:player",
            content: "https://www.youtube.com/embed/" + this.youtubeId
          },
          {
            hid: "twitter:player:url",
            name: "twitter:player:url",
            content: "https://www.youtube.com/embed/" + this.youtubeId
          },
          {
            hid: "twitter:player:secure_url",
            name: "twitter:player:secure_url",
            content: "https://www.youtube.com/embed/" + this.youtubeId
          },
          {
            hid: "twitter:creator",
            name: "twitter:creator",
            content: "hoodrychx"
          }
        ],
        link: [
          {
            hid: "canonical",
            rel: "canonical",
            href: "http://hoodry.ch/" + this.slug
          }
        ],
        bodyAttrs: {
          class: "video-player"
        }
      };
    }
  }
};
</script>

<template lang='haml' src='./index.haml' />
<style lang='scss' scoped src='./index.scss' />
