<template>

  <div class="header">
    <Header />
  </div>

  <div class="content">
    <SideBar />
    <div class="content_box">
      <router-view />
    </div>
    <CartDialog />
  </div>

  <p>{{ store.cart.isOpened }}</p>

  <div class="footer">
    <Footer />
  </div>

</template>

<script setup lang="ts">
// import { watchEffect } from 'vue';
// import { useRoute } from 'vue-router'
// const route = useRoute();
// watchEffect(() => console.log(route.path))
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import SideBar from './components/SideBar.vue'
import CartDialog from './components/CartDialog.vue'

// import { computed } from 'vue';
import { useStore } from './store/index';
const store = useStore();


</script>

<style>

</style>
