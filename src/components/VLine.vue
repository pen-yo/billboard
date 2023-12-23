<script setup lang="ts">
import type { EDFVL } from "@/views/Ranking.vue";

defineProps<{
  data: EDFVL | undefined;
}>();
</script>

<template>
  <div
    v-if="data"
    class="item"
    :style="`--themecolor: ${data.color}; --width: ${data.widthRate};`"
    :key="data.title"
  >
    <div class="key-box">
      <div class="key">{{ data.title }}</div>
    </div>
    <div class="value">{{ data.power }}</div>
  </div>
</template>

<style scoped>
@keyframes show-up {
  0% {
    top: calc(-1.5 * var(--height));
    height: 0;
    opacity: 0;
  }

  100% {
    top: 0;
    height: var(--height);
    opacity: 1;
  }
}

@keyframes go-down {
  0% {
    top: calc(-1.5 * var(--height));
  }

  100% {
    top: 0;
  }
}

.item {
  --themecolor: #000000;
  --width: 0;
  --height: 30px;

  position: relative;
  z-index: 100;
  margin: calc(0.5 * var(--height)) 0;
  width: calc(70% * var(--width));
  height: var(--height);
  background: var(--themecolor);
  animation: go-down calc(1s / var(--speed));
  transition: all calc(1.8s / var(--speed));
  user-select: none;

  &:last-of-type {
    animation: show-up calc(1s / var(--speed));
  }

  & .key-box {
    position: relative;
    z-index: 100;
    overflow-x: clip;

    & .key {
      position: absolute;
      z-index: 110;
      top: -12px;
      right: 16px;
      white-space: nowrap;
      transition: all 20s;
      color: #ffffff;
      font-size: 26px;
      font-weight: bolder;
      text-shadow:
        -1px -1px 0 var(--themecolor),
        -1px 1px 0 var(--themecolor),
        1px -1px 0 var(--themecolor),
        1px 1px 0 var(--themecolor);

      &:hover {
        right: -600px;
      }
    }
  }

  & .value {
    position: absolute;
    z-index: 100;
    top: 0;
    left: 100%;
    color: var(--themecolor);
    font-size: 26px;
    font-weight: bold;
    line-height: var(--height);
    text-indent: 8px;
  }
}
</style>
