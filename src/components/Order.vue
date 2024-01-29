<template>

    <div v-if="!isLoggedIn">
      <div v-if="orderNoLogin">
        <OrderForm @orderFormData="orderFormData"/>
      </div>
      <div v-else>
        <Button text="Nákup bez registrácie" size="medium" 
                  @click="orderNoLogin=true"></Button>
        <router-link to="/login">
          <Button text="Prihlásiť sa" size="medium"></Button>
        </router-link>
      </div>
    </div>
    <div v-else>
      <OrderForm :loggedUserData="userLoggedInData" @orderFormData="orderFormData"/>
    </div>

    <Button text="login" size="large" @click="store.login()"></Button>
    <Button text="logout" size="large" @click="store.logout()"></Button>
    {{ "store loggedin -> " + store.loggedIn }}
    {{ "orderNoLogin -> " + orderNoLogin }}

    {{ finalUserData }}

</template>
  
<script setup lang="ts">

import { ref, computed } from 'vue';
import Button from './Button.vue';
import OrderForm from './OrderForm.vue';

import { OrderDataType } from '../ts/types/OrderDataType';
import { UserDataType } from '../ts/types/UserDataType'

import { useStore } from '../store/index';
import { OrderItemType } from '../ts/types/OrderItemType';
// import router from '../router';
const store = useStore();

// import { useRouter } from 'vue-router';
// const router = useRouter();

// const toggleLogin = ref<boolean>(false);
const orderNoLogin = ref<boolean>(false);

const isLoggedIn = computed((): boolean => {
  const loggedIn: boolean = store.loggedIn; 
  return loggedIn;
});

const userLoggedInData = ref<UserDataType>({
  meno: store.userLoggedInData.meno,
  priezvisko: store.userLoggedInData.priezvisko,
  ulica: store.userLoggedInData.ulica,
  mesto: store.userLoggedInData.mesto,
  psc: store.userLoggedInData.psc,
  tel: store.userLoggedInData.tel,
  email: store.userLoggedInData.email
})

const finalUserData = ref<UserDataType>();

const orderFormData = (data: UserDataType): UserDataType => {
  createOrder(data);
  return finalUserData.value = data;
}

const createOrder = (userData?: UserDataType) => {

  let cartItems: OrderItemType[] = [];
  let cartItem: OrderItemType;

  if(store.cart.items.length > 0) {
    store.cart.items.forEach((item) => {
      cartItem = {
        product_id: item.product_id,
        quantity: item.quantity
      }
      cartItems.push(cartItem)
    });
  }

  console.log(cartItems)
  console.log(store.cart.items)
  
  const url: string = `${import.meta.env.VITE_URL_API}/order`;
  const delivery = "courier";
  const paymentMethod = "cash";

  const orderData: OrderDataType = {
    cust_reg: false,
    reg_cust_id: null,
    non_reg_cust: {
      meno: "",
      priezvisko: "",
      ulica: "",
      mesto: "",
      psc: "",
      tel: "",
      email: ""
    },
    items: cartItems,
    delivery: delivery,
    payment_method: paymentMethod
  }

  if(userData) orderData.non_reg_cust = userData;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData)
  })
  .then((res: Response) => res.json)
  .then(data => console.log(data))
  .catch(err => {
    console.log(err);
  })
  
  console.log(JSON.stringify(orderData));
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

<!-- <style src="../styles/order.scss" scoped lang="scss"></style> -->