<script setup lang="ts">
import VBlock from "@/components/VBlock.vue";
import { datapack, speed } from "@/config";
import type { ExtendedDataUnitForVBlock } from "@/types/ExtendedDataUnitForVBlock";
import { LimitedQueue } from "@/types/LimitedQueue";
import { ref } from "vue";

export type EDFVB = ExtendedDataUnitForVBlock & {};

const data = datapack.data as EDFVB[];

document.onkeydown = (event) => {
  document.documentElement.style.setProperty("--speed", `${speed}`);
  switch (event.code) {
    // Pause
    case "KeyP":
      isRunning.value = false;
      break;
    // AutoPlay
    case "Space":
      isRunning.value = true;
      break;
  }
};

const isRunning = ref(false);

const toDisplay = ref(new LimitedQueue<EDFVB>(data));
</script>

<template>
  <div v-if="datapack">
    <div id="underlayer">
      <h1 id="title">{{ datapack.title }}</h1>
      <p id="subtitle" class="lay-in-row">
        <span>{{ datapack.unit ? `单位：${datapack.unit}` : "" }}</span>
        <span>{{ `数据来源：${datapack.source}` }}</span>
      </p>
    </div>
    <div
      id="data"
      :class="isRunning ? 'running' : ''"
      :style="`--length: ${toDisplay.toArray().length};`"
    >
      <v-block v-for="index in 20" :data="toDisplay.toArray()[index - 1]" />
    </div>
  </div>
</template>

<style scoped>
@keyframes show-up {
  0% {
    left: 100%;
  }

  100% {
    left: calc(-1 * (var(--length) * 21rem + 1px) + 100%);
  }
}

#underlayer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  background: #222;

  & * {
    width: 100%;
    color: #999;
    text-align: center;
  }
}

#data {
  display: flex;
  position: fixed;
  left: calc(-1 * (var(--length) * 21rem + 1px) + 100%);
  width: calc(var(--length) * 21rem + 1px);
  opacity: 0;

  &.running {
    opacity: 1;
    animation: show-up calc(var(--length) * 3s / var(--speed)) 0s linear;
  }

  & > * {
    overflow: visible;
  }
}
</style>
