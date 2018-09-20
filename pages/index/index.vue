<script>
import Card from "~/components/Card/Card.vue";
const contentful = require("contentful");

export default {
  components: {
    Card
  },
  asyncData({ env, store, params }) {
    const client = contentful.createClient({
      space: env.contentfulSpaceId,
      accessToken: env.contenfulClientId
    });
    return client
      .getEntries({ content_type: "video" })
      .then(response => {
        const cards = response.items.map(entry => {
          return Object.assign({ id: entry.sys.id }, entry.fields);
        });
        return {
          cards: cards.sort((x, y) => {
            return (
              new Date(y.datePublished).getTime() -
              new Date(x.datePublished).getTime()
            );
          })
        };
      })
      .catch(console.error);
  }
};
</script>

<template lang='haml' src='./index.haml' />
<style lang='scss' src='./index.scss' />
