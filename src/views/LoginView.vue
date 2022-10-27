<script setup>
import { reactive, ref } from 'vue';
import BackButton from '../components/BackButton.vue';
import GameButton from '../components/GameButton.vue';
import IconHeadline from '../components/IconHeadline.vue';
import { storeToRefs } from "pinia";

import { http } from '../http.js';
import { useStore } from '../stores/new'
const store = useStore();
const feedback = ref("");
// const { jwt } = storeToRefs(store)


const userLogin = reactive({});
async function login() {
    await http.post('/api/login', userLogin)
        .then(response => {
            store.setJwt(response.data.accessToken);
            store.setGameState('menu');
            store.setUser(response.data.user)
            console.log("axios response", response)
        }).catch(error => {
            feedback.value = error.response.data.message;
        })
}
function forgotPassword() {
    console.log("forgotPassword not yet implemented")
}
</script>
<template>
    <div class="login">
        <BackButton goto='default' />



        <form @submit.prevent="login">
            <div>
                <IconHeadline text='Login' icon='fa-solid:user-lock'
                    subText="Login to your IIS-Account to gain access to the hosting section." />
            </div>
            <label>Username
                <input autofocus required type="text" v-model="userLogin.username" id="username" class="form-control"
                    placeholder="Username" />
            </label>

            <label>Password
                <input type="password" required v-model="userLogin.password" id="password" class="form-control"
                    placeholder="Password" />
            </label>
            <p class="error" v-if="feedback != ''">{{ feedback }}</p>
            <a href="#" @click="forgotPassword">Forgot your password? </a>

            <GameButton @submit="" text="Login" icon="fa-solid:unlock" />


        </form>

    </div>
</template>

<style scoped>
/* .login>*:not(form) {
    margin-left: 4rem;
    margin-right: 4rem;
} */

/* label,
a,
div,
p {
    margin-left: 4rem;
    margin-right: 4rem;
} */
form button:last-of-type {
    margin-top: 3rem;
}

/* form>*:not(button) {
    margin-left: 4rem;
    margin-right: 4rem;
} */



.login button {
    margin-left: 0;
    margin-right: 0;
}

.login p {
    max-width: 80%;
}
</style>