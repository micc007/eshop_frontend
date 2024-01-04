<template>

    <CategoryBar />

    <div class="items gap-1 justify-start">
        <div v-for="singleItem in selCat" class="col-2-xl col-3-l col-6-m col-12-s">
            <Item :item="singleItem"/>
        </div>
    </div>

    <div>
        <p v-for="category in store.selectedCategories">{{ category }}</p>
        <p>{{ store.selectedCategories }}</p>
    </div>

</template>
  
<script setup lang="ts">

    import { computed } from 'vue';

    import CategoryBar from './CategoryBar.vue';
    import Item from '../components/Item.vue';
    import { itemType } from '../ts/types/ItemType.ts';
    import { useStore } from '../store/index';
    const store = useStore();

    const selCat = computed(() => {
        let filteredItems: itemType[] = [];
        if(store.selectedCategories.length === 0) {
            filteredItems = store.items;
        } else {
            filteredItems = store.items.filter((item) => store.selectedCategories.includes(item.category));
        }
        return filteredItems;
    })


</script>

<style src="../styles/item_container.scss" scoped lang="scss"></style>