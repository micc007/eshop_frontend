<template>
    <div>
        <form @submit.prevent="sendData" class="col-9-l col-9-m col-9-s">
            <div class="inputItem">
                <label for="name">Meno</label>
                <input type="text" name="name" id="name" v-model="name" required>
            </div>
        
            <div class="inputItem">
                <label for="name">Priezvisko</label>
                <input type="text" name="lastname" id="lastname" v-model="lastname" required>
            </div>
        
            <div class="inputItem">
                <label for="name">Ulica</label>
                <input type="text" name="street" id="street" v-model="street" required>
            </div>
        
            <div class="inputItem">
                <label for="name">Mesto</label>
                <input type="text" name="city" id="city" v-model="city" required>
            </div>
        
            <div class="inputItem">
                <label for="name">PSČ</label>
                <input type="text" name="psc" id="psc" pattern="[0-9]{3} [0-9]{2}" v-model="psc" placeholder="xxx xx" required>
            </div>
        
            <div class="inputItem">
                <label for="name">Tel. č.</label>
                <input type="tel" name="tel" id="tel" pattern="[0-9]{3} [0-9]{3} [0-9]{3}" v-model="tel" placeholder="+421 XXX XXX XXX" required>
            </div>
        
            <div class="inputItem">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" v-model="email" required>
            </div>

            <Button text="Pokračovať" size="medium" type="submit" />
        </form>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { UserDataType } from '../ts/types/UserDataType';
import Button from './Button.vue';

const props = defineProps<{ 
    loggedUserData?: UserDataType,
}>();

const emit = defineEmits(['orderFormData']);

const name = ref<string>();
const lastname = ref<string>();
const street = ref<string>();
const city = ref<string>();
const psc = ref<string>();
const tel = ref<string>();
const email = ref<string>();
        
const sendData = (): void => {
    const data: UserDataType = {
        meno: name.value as string,
        priezvisko: lastname.value as string,
        ulica: street.value as string,
        mesto: city.value as string,
        psc: psc.value as string,
        tel: tel.value as string,
        email: email.value as string
    }

    emit('orderFormData', data);
}

if(props.loggedUserData) {
    name.value = props.loggedUserData.meno;
    lastname.value = props.loggedUserData.priezvisko;
    street.value = props.loggedUserData.ulica;
    city.value = props.loggedUserData.mesto;
    psc.value = props.loggedUserData.psc;
    tel.value = props.loggedUserData.tel;
    email.value = props.loggedUserData.email;
}

// const userLoggedInData = computed((): UserDataType => {
//     const userLoggedInData: UserDataType = {
//         meno: loggedUserData.meno,
//         priezvisko: loggedUserData.priezvisko,
//         ulica: loggedUserData.ulica,
//         mesto: loggedUserData.mesto,
//         psc: loggedUserData.psc,
//         tel: loggedUserData.tel,
//         email: loggedUserData.email
//     }

//     return userLoggedInData;
// })
        
        
</script>

<style src="../styles/order.scss" scoped lang="scss"></style>