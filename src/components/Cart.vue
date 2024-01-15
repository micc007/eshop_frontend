<template>

    <div class="cart_box">
        <div v-for="item in store.cart.items" class="cart_item col-9-l col-9-m col-9-s">
            <p @click="showFullItem(item.product_id)" class="item_name">{{ item.name }}</p>
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
        <Button text="Vytvoriť objednávku" size="small" @click="createOrder"></Button>
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

const showFullItem = (id: string) => {
    router.push({ path: `/item/${id}` })
}

const createOrder = () => {

}

// cust_reg - boolean, if user is registered or not
// reg_cust_id - string, ID of registered user
// non_reg_cust - json, data of non registered user (name, lastname, delivery address, tel number, email...)
// items - array of objects, product_id, quantity, items in cart
// delivery - string "courier" || "onsite", delivery method
// payment_method - string "cash" || "payp" || "bank", payment method

// {
//     "cust_reg": false,
//     "reg_cust_id": null,
//     "non_reg_cust": {"meno":"Michal", "priezvisko": "Mitro"},
//     "items": [
//         {
//             "product_id": "QDFOpjgIhPbQjBXfVDuif",
//             "quantity": 2
//         },
//         {
//             "product_id": "YYj4xXjKkqGUd8-iRCuKw",
//             "quantity": 2
//         },
//         {
//             "product_id": "nn9JiJ8ETo4SC8IHvz6R6",
//             "quantity": 1
//         },
//         {
//             "product_id": "bO6JK-6G2ImXhmZoLGCqU",
//             "quantity": 3
//         }
//     ],
//     "delivery": "courier",
//     "payment_method": "cash"
// }

</script>

<style src="../styles/cart.scss" scoped lang="scss"></style>