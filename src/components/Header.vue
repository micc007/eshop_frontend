<template>
    <div class="header">
        <h1><router-link to="/">micc0's ESHOP</router-link></h1>
        <button class="cart_button" @click="showCartDialog">&#128722</button>
    </div>
</template>
  
<script setup lang="ts">

import { useStore } from '../store/index';
const store = useStore();

const showCartDialog = () => {
    store.cart.isOpened = !store.cart.isOpened;
}

</script>

<style src="../styles/header.scss" scoped lang="scss"></style>