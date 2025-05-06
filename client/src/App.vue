<script setup>
import Navbar from './components/Navbar.vue';
import { RouterView } from 'vue-router';

</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <RouterView />
  </main>
  <footer class=" text-center">
    Made with <i class="mdi mdi-vuejs text-vue"></i> and <i class="mdi mdi-nodejs text-vue"></i> by AdamRB208 <i
      class="mdi mdi-github"></i>
  </footer>
</template>

<style lang="scss"></style>
