<script setup lang="ts">
import VLine from "@/components/VLine.vue";
import { datapack, speed } from "@/config";
import type { ExtendedDataUnitForVLine } from "@/types/ExtendedDataUnitForVLine";
import { LimitedQueue } from "@/types/LimitedQueue";
import { ref } from "vue";

export type EDFVL = ExtendedDataUnitForVLine & {
  color: string;
  widthRate: number;
};

/**
 * 获取随机颜色。
 */
function getRandomColor() {
  function getRandom(upper: number) {
    return Math.random() * upper;
  }

  const LIM = 255 * (12 / 16);
  return `rgb(${getRandom(LIM)}, ${getRandom(LIM)}, ${getRandom(LIM)})`;
}

const data = (() => {
  let rawData = (
    datapack.needSort
      ? Array.from(datapack.data as EDFVL[]).sort((a, b) => a.power - b.power)
      : datapack.data
  ) as EDFVL[];
  rawData.forEach((item) => {
    item.color = getRandomColor();
  });
  return rawData;
})();

let sid = 0;

document.onkeydown = (event) => {
  document.documentElement.style.setProperty("--speed", `${speed}`);
  switch (event.code) {
    // All
    case "KeyA":
      clearInterval(sid);
      while (next());
      break;
    // Next
    case "KeyN":
      clearInterval(sid);
      next();
      break;
    // Reset
    case "KeyR":
      clearInterval(sid);
      biggestPower = 0;
      i = 0;
      while (toDisplay.value.removeFromHead());
      break;
    // AutoPlay
    case "Space":
      clearInterval(sid);
      sid = setInterval(next, 1000 / speed);
      break;
  }
};

const powerMatrix: number[] & { length: 20 } = [
  1.25, 1.2, 1.15, 1.1, 1.05, 1.02, 0.99, 0.96, 0.93, 0.9, 0.88, 0.86, 0.84,
  0.82, 0.8, 0.785, 0.77, 0.755, 0.74, 0.725,
];

let biggestPower = -114514;
let i = 0;

/**
 * 展示下一条数据。
 */
function next() {
  if (i < data.length) {
    if (data[i].power > biggestPower) biggestPower = data[i].power;
    toDisplay.value.addToTail(data[i++]);
    toDisplay.value
      .expose()
      .reverse()
      .forEach((item, index) => {
        item.widthRate = (item.power / biggestPower) * powerMatrix[index];
      });
    toDisplay.value.expose().reverse();
    return true;
  }
  return false;
}

const toDisplay = ref(new LimitedQueue<EDFVL>([]));
</script>

<template>
  <div v-if="datapack" class="datapack">
    <h1 id="title">{{ datapack.title }}</h1>
    <p id="subtitle" class="lay-in-row">
      <span>{{ datapack.unit ? `单位：${datapack.unit}` : "" }}</span>
      <span>{{ `数据来源：${datapack.source}` }}</span>
    </p>
    <div id="data">
      <v-line v-for="index in 20" :data="toDisplay.toArray()[index - 1]" />
    </div>
    <div id="illustration"></div>
  </div>
</template>

<style scoped>
.datapack {
  --super-margin: 200px;

  & #title {
    margin: 40px var(--super-margin) 0;
  }

  & #subtitle {
    margin: 0 var(--super-margin) 0;
    color: #cccccc;
    text-align: right;
    font-style: italic;
  }

  & #data {
    display: flex;
    flex-direction: column-reverse;
    margin: 30px var(--super-margin);
  }

  & #illustration {
    position: fixed;
    z-index: -1;
    right: 40px;
    bottom: 40px;
    width: 350px;
    height: 350px;
    background: center no-repeat url();
    background-size: contain;
    transition: all calc(1.2s / var(--speed));
  }
}
</style>
