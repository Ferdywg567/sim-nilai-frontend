<script setup>
import { RouterView } from 'vue-router'

document.documentElement.classList = "light-style layout-wide customizer-hide"; // rubah class html
</script>

  <style>
    .w-fit{
      max-width: fit-content;
    }

  </style>
<template>
  <RouterView />

</template>