<template>

    <div class="item_container">
        <p>{{ item.product_id }}</p>
        <p>{{ item.category_id }}</p>
        <p>{{ item.name }}</p>
        <p>{{ item.price }}</p>
        <p>{{ item.stock }}</p>
        <p>{{ item.specs }}</p>
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