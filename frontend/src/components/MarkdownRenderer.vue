<template>
  <div v-html="rendered"></div>
</template>

<script setup>
import markdownit from 'markdown-it'
import { computed } from "vue";

const markdown = new markdownit()

const props = defineProps({
  source: {
    type: String,
    default: ""
  }
});

const rendered = computed(() => markdown.render(props.source));
</script>
<style>
img {
  width: 200px;
}
</style>