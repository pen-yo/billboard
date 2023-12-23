<script setup lang="ts">
import { ref } from "vue";

const speed = ref(1.2);
</script>

<template>
  <div v-if="$route.path === '/'">
    <button>
      <router-link to="comparison">横向</router-link>
    </button>
    <button>
      <router-link to="ranking">竖向</router-link>
    </button>
  </div>
  <div v-else><router-view :speed="speed" /></div>
</template>

<style scpoed></style>
