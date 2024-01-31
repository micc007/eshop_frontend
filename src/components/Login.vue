<template>

    <div class="container col-4-l col-4-m col-4-s">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" v-model="email">
    
        <label for="pass">Heslo</label>
        <input type="password" name="pass" id="pass" v-model="pass">

        <Button text="Prihlásiť sa" size="medium" @click="userLogin"></Button>
        <div class="links">
            <a id="reg">Registrácia</a>
            <a id="pass_rec">Obnova hesla</a>
        </div>
    </div>


    {{ email }}
    {{ pass }}



</template>
  
<script setup lang="ts">

import { ref } from 'vue';
import Button from './Button.vue';

const email = ref<string>();
const pass = ref<string>();

// import { useStore } from '../store/index';
// const store = useStore();

import { useRouter } from 'vue-router';
const router = useRouter();

const userLogin = () => {

    const url: string = `${import.meta.env.VITE_URL_API}/user_login`;
    const loginData = {
        email: email.value,
        pass: pass.value
    }

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // credentials: "include",
        body: JSON.stringify(loginData)
    })
    .then((res: Response) => res.text())
    .then((data) => {
        console.log(data);
        // save user data here if login was successful
        router.go(-1);
    })
    .catch(err => {
        console.log(err);
    })
}

</script>

<style src="../styles/login.scss" scoped lang="scss"></style>