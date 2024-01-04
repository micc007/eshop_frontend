<template>

    <div class="category_bar">
        <div v-for="category in store.categories" 
             @click="selectCategory(category)"
             class="category_bar_item col-2-l" 
             :class="{ category_bar_item_passive: !selCat.get(`${category}`), category_bar_item_active: selCat.get(`${category}`)  }">
            <p>{{ category }}</p>
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
        if(store.selectedCategories.includes(category)){
            selCatMap.value.set(category, true);
        }
        else {
            selCatMap.value.set(category, false);
        }
    });

    return selCatMap.value;
})

const selectCategory = (category: string) => {

    //toggle selected class of sidebar item
    selCatMap.value.set(category, !selCatMap.value.get(category));

    if(store.selectedCategories.includes(category)){
        let index = store.selectedCategories.indexOf(category);
        return store.selectedCategories.splice(index,1);
    }
    else {
        return store.selectedCategories.push(category); 
    }
}

</script>

<style src="../styles/category_bar.scss" scoped lang="scss"></style>