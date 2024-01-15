<template>

    <ItemFull :item="item" />
  
</template>
  
<script setup lang="ts">

import ItemFull from '../components/ItemFull.vue';
import { itemType } from '../ts/types/ItemType.ts';

import { computed } from 'vue';
import { useRoute } from 'vue-router'
const route = useRoute();

import { useStore } from '../store/index';
const store = useStore();

const item = computed((): itemType => {
    const id: string = route.params.id as string;
    const item: itemType = store.items.filter((singleItem) => singleItem.product_id === id)[0];
    return item;
})

</script>

<style src="../styles/item_full.scss" scoped lang="scss"></style>