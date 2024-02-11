<template>

    <div class="sidebar">
        <div class="sidebar_item_main">
            <p @click="allCategories = !allCategories">Všetky kategórie</p>
        </div>
        <div v-for="category in store.categories" class="sidebar_item_secondary" :class="{hidden: allCategories}">
            <p @click="setCategory(category.category_id)">{{ category.category }}</p>
        </div>

        <div class="sidebar_item_main">
            <p @click="allCategoriesAkcie = !allCategoriesAkcie">Akcie</p>
        </div>
        <div v-for="category in store.categories" class="sidebar_item_secondary" :class="{hidden: allCategoriesAkcie}">
            <p>{{ category.category }}</p>
        </div>
        <div v-if="!store.loggedIn" class="sidebar_item_main">
            <router-link to="/login">
                <p>Prihlásenie</p>
             </router-link>
        </div>
        <div v-if="store.loggedIn" class="sidebar_item_main" @click="userLogout">
            <p>Odhlásiť sa</p>
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

const setCategory = (category_id: string) => {
    store.selectedCategories.length = 0;
    store.selectedCategories.push(category_id);
    router.push({ path: '/' });
}

const userLogout = () => {
    const url: string = `${import.meta.env.VITE_URL_API}/user_logout`;

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",

    })
    .then((res: Response) => res.text())
    .then((data) => {
        console.log(data);
        // remove data if logout was successful
        router.push('/');
    })
    .catch(err => {
        console.log(err);
    })
}

</script>

<style src="../styles/sidebar.scss" scoped lang="scss"></style>