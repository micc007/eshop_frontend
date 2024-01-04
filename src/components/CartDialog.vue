<template>

    <transition name="cart_dialog_animation">
        <dialog ref="cart_dialog" @close="closeModal" v-if="cartOpened" class="col-4-l col-6-m col-8-s justify-center">
            <div class="exit_button">
                <button @click="closeModal">&times</button>
            </div>
            <div class="cart_content">
                <div v-for="item in store.cart.items" class="cart_item col-11-l col-11-m col-11-s">
                    <p @click="showFullItem(item.id)" class="item_name">{{ item.name }}</p>
                    <p>{{ item.price }}</p>
                    <p>{{ item.quantity }}</p>
                    <Button text="+1" size="small" @click="store.changeQuantity(item.name, 'increase')"></Button>
                    <Button text="-1" size="small" @click="store.changeQuantity(item.name, 'decrease')">-1</Button>
                    <Button text="Odobrať" size="small" @click="store.deleteFromCart(item.name)">Odobrať</Button>
                    <div>
                        <p>{{ Number((item.price * item.quantity).toFixed(2)) }}</p>
                    </div>
                </div>

                <div>
                    <p>{{ totalPrice }}</p>
                </div>

                <router-link @click="closeModal" to="/cart">
                    <Button text="Pokračovať k platbe" size="small"></Button>
                </router-link>
            </div>
        </dialog>
    </transition>

</template>
  
<script setup lang="ts">

import { ref, computed } from 'vue';
import Button from './Button.vue';
import { useStore } from '../store/index';
const store = useStore();

import { useRouter } from 'vue-router';
const router = useRouter();

const cart_dialog = ref<HTMLDialogElement>();

const showModal = () => {
    cart_dialog.value?.showModal();
}

const closeModal = () => {
    store.cart.isOpened = false;
    cart_dialog.value?.close();
}

const cartOpened = computed(() => {
    if(store.cart.isOpened) {
        showModal();
        return true;
    }
    else {
        return false;
    }
});

const cartPrice = ref<number>();
const totalPrice = computed(() => {
    return cartPrice.value = store.cartPrice();
});

const showFullItem = (id: number) => {
    closeModal();
    router.push({ path: `/item/${id}` });
}

</script>

<style src="../styles/cart_dialog.scss" scoped lang="scss"></style>