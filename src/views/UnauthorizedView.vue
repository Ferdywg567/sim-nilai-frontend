<style scoped>
@import "../assets/vendor/css/pages/page-misc.css";
</style>

<template>
  <!-- Not Authorized -->
  <div class="container-xxl container-p-y">
    <div class="misc-wrapper">
      <h2 class="mb-1 mx-2">You are not authorized!</h2>
      <p class="mb-4 mx-2">
        You do not have permission to view this page using the credentials that you have provided while login. <br />
        Please contact your site administrator.
      </p>
      <a href="/dashboard" class="btn btn-primary mb-4">Back to dashboard</a>
      <div class="mt-4">
        <img :src="pageMiscNotAuthorized" alt="page-misc-not-authorized" width="170" class="img-fluid" />
      </div>
    </div>
  </div>
  <div class="container-fluid misc-bg-wrapper">
    <!-- <img src="../../assets/img/illustrations/bg-shape-image-light.png" alt="page-misc-not-authorized"
      data-app-light-img="illustrations/bg-shape-image-light.png"
      data-app-dark-img="illustrations/bg-shape-image-dark.png" /> -->
    <img :src="bgShapeImageLight" alt="page-misc-not-authorized" />
  </div>
  <!-- /Not Authorized -->
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import pageMiscNotAuthorized from '@/assets/img/illustrations/page-misc-you-are-not-authorized.png';
import bgShapeImageLight from '@/assets/img/illustrations/bg-shape-image-light.png'

const router = useRouter();

</script>
