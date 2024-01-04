<template>

    <div class="item_container" @click="showFullItem(item.id)">
        <p>{{ item.name }}</p>
        <p>{{ item.category }}</p>
        <p>{{ item.price }}</p>
        <Button text="Do košíka" size="medium" @click="store.addToCart(item)">Do košíka</Button>
    </div>

</template>
  
<script setup lang="ts">

    import { itemType } from '../ts/types/ItemType.ts';
    import Button from './Button.vue';

    import { useStore } from '../store/index';
    const store = useStore();

    import { useRouter } from 'vue-router'
    const router = useRouter();

    defineProps<{ item: itemType }>();

    const showFullItem = (id: number) => {
        router.push({ path: `/item/${id}` });
    }

</script>

<style src="../styles/item.scss" scoped lang="scss"></style>