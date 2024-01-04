<template>

    <div class="cart_box">
        <div v-for="item in store.cart.items" class="cart_item col-9-l col-9-m col-9-s">
            <p @click="showFullItem(item.id)" class="item_name">{{ item.name }}</p>
            <p>{{ item.price }}</p>
            <p>{{ item.quantity }}</p>
            <Button text="+1" size="small" @click="store.changeQuantity(item.name, 'increase')"></Button>
            <Button text="-1" size="small" @click="store.changeQuantity(item.name, 'decrease')">-1</Button>
            <Button text="Odobrať" size="small" @click="store.deleteFromCart(item.name)">Odobrať</Button>
            <div>
                <p>{{ Number(item.price * item.quantity).toFixed(2) }}</p>
            </div>
        </div>
        <div>
            <p>{{ totalPrice }}</p>
        </div>
    </div>

</template>
  
<script setup lang="ts">

import { ref, computed } from 'vue';
import Button from './Button.vue';

import { useStore } from '../store/index';
const store = useStore();

const cartPrice = ref<number>();
const totalPrice = computed(() => {
    return cartPrice.value = store.cartPrice();
});

import { useRouter } from 'vue-router';
const router = useRouter();

const showFullItem = (id: number) => {
    router.push({ path: `/item/${id}` })
}


</script>

<style src="../styles/cart.scss" scoped lang="scss"></style>