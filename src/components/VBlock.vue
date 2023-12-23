<script setup lang="ts">
import type { EDFVB } from "@/views/Comparison.vue";

defineProps<{
  data: EDFVB | undefined;
}>();
</script>

<template>
  <div v-if="data" class="item" :key="data.title">
    <div
      class="illustration"
      :style="`background-image: url(${data.illustration.url});`"
    ></div>
    <div class="title">{{ data.title }}</div>
    <div class="subtitle">{{ data.subtitle }}</div>
    <div class="description">{{ data.description }}</div>
  </div>
</template>

<style scoped>
.item {
  --bar-height: 60px;

  display: flex;
  flex-direction: column;
  width: 21rem;
  height: 100%;
  margin-right: 1px;

  & .illustration {
    height: 21rem;
    background: no-repeat center;
    background-size: cover;
  }

  & .title {
    height: var(--bar-height);
    background: rgb(156, 0, 0);
    color: #ffffff;
    font-size: 36px;
    font-weight: bold;
    line-height: var(--bar-height);
    text-align: center;
    text-wrap: nowrap;
  }

  & .subtitle {
    height: var(--bar-height);
    background: rgb(0, 82, 170);
    color: #ffffff;
    font-size: 28px;
    line-height: var(--bar-height);
    text-align: center;
  }

  & .description {
    height: 50vw;
    background: #ccc;
    padding: 18px;
    color: #222;
    font-size: 24px;
  }
}
</style>
