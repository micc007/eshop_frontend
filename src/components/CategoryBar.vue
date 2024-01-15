<template>

    <div class="category_bar">
        <div v-for="category in store.categories" 
             @click="selectCategory(category.category_id)"
             class="category_bar_item col-2-l" 
             :class="{ category_bar_item_passive: !selCat.get(`${category.category_id}`), category_bar_item_active: selCat.get(`${category.category_id}`)  }">
            <p>{{ category.category }}</p>
        </div>
    </div>

    <!-- :class="{ category_bar_item_passive: !selCatMap.get(`${category}`), category_bar_item_active: selCatMap.get(`${category}`)  }" -->

</template>
  
<script setup lang="ts">

import { ref, computed } from 'vue';
import { useStore } from '../store/index';

const store = useStore();

const selCatMap = ref(new Map());

const selCat = computed(() => {
    store.categories.forEach((category) => {
        if(store.selectedCategories.includes(category.category_id)){
            selCatMap.value.set(category.category_id, true);
        }
        else {
            selCatMap.value.set(category.category_id, false);
        }
    });

    return selCatMap.value;
})

const selectCategory = (category_id: string) => {

    //toggle selected class of sidebar item
    selCatMap.value.set(category_id, !selCatMap.value.get(category_id));

    if(store.selectedCategories.includes(category_id)){
        let index = store.selectedCategories.indexOf(category_id);
        return store.selectedCategories.splice(index,1);
    }
    else {
        return store.selectedCategories.push(category_id); 
    }
}

</script>

<style src="../styles/category_bar.scss" scoped lang="scss"></style>