<template>

    <div class="sidebar">
        <div class="sidebar_item_main">
            <p @click="allCategories = !allCategories">Všetky kategórie</p>
        </div>
        <div v-for="category in store.categories" class="sidebar_item_secondary" :class="{hidden: allCategories}">
            <p @click="setCategory(category)">{{ category }}</p>
        </div>

        <div class="sidebar_item_main">
            <p @click="allCategoriesAkcie = !allCategoriesAkcie">Akcie</p>
        </div>
        <div v-for="category in store.categories" class="sidebar_item_secondary" :class="{hidden: allCategoriesAkcie}">
            <p>{{ category }}</p>
        </div>
        <div class="sidebar_item_main">
            <p>Prihlásenie</p>
        </div>      

    </div>

</template>
  
<script setup lang="ts">

import { ref } from 'vue';
import { useStore } from '../store/index';
const store = useStore();

import { useRouter } from 'vue-router'
const router = useRouter();

const allCategories = ref<boolean>(true);
const allCategoriesAkcie = ref<boolean>(true);

const setCategory = (category: string) => {
    store.selectedCategories.length = 0;
    store.selectedCategories.push(category);
    router.push({ path: '/' });
}

</script>

<style src="../styles/sidebar.scss" scoped lang="scss"></style>