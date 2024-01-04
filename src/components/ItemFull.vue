<template>

    <div class="item_container">
        <p>{{ item.id }}</p>
        <p>{{ item.name }}</p>
        <p>{{ item.category }}</p>
        <p>{{ item.price }}</p>
        <button @click="store.addToCart(item)">Do košíka</button>
    </div>

</template>
  
<script setup lang="ts">

    import { itemType } from '../ts/types/ItemType.ts';
    import { useStore } from '../store/index';
    const store = useStore();

    defineProps<{ item: itemType }>();


</script>

<style src="../styles/item_full.scss" scoped lang="scss"></style>