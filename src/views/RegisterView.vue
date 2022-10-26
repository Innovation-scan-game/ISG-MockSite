<script setup>
import { reactive, ref } from 'vue'
import IconHeadline from '../components/IconHeadline.vue';
import BackButton from '../components/BackButton.vue';
import GameButton from '../components/GameButton.vue';
import { http } from '../http';
import { useStore } from '../stores/new'
const store = useStore();

const userData = reactive({ password: "" });
const confirmPassword = ref("");
const feedback = ref("");

async function registerAccount() {
    await http.post("/api/user/register", userData).then((response) => {
        console.log("register res", response)
        store.setUser(response.data)
        store.setGameState("login")
    }).catch((error) => {
        console.log("err", error)
        feedback.value = error.response.data.message;
    })
}

</script>

<template>
    <div class="register">
        <BackButton goto="default" />
        <form @submit.prevent="registerAccount">
            <IconHeadline text="Register account" icon="wpf:add-user"
                subText="By creating an account you will get access to the hosting section of this cardgame." />

            <label>Username
                <input required v-model="userData.username" type="text" placeholder="Username" />
            </label>
            <label>Email
                <input required v-model="userData.Email" type="text" placeholder="Email" />
            </label>

            <label>Password
                <input required v-model="userData.password" type="password" placeholder="password" />
            </label>
            <label v-auto-animate>Repeat password
                <input required v-model="confirmPassword" type="password" placeholder="password" />
                <p class="error" v-if="userData.password !== confirmPassword">Passwords do not match!</p>

            </label>

            <label>User type
                <select>
                    <option value=0>Student</option>
                    <option value=1>Teacher</option>
                </select>
            </label>

            <p class="error" v-if="feedback!=''">{{feedback}}</p>

            <GameButton text="Register" icon="wpf:add-user" />

        </form>
    </div>
</template>

<style scoped>
form button {
    margin-top: 3rem;
}
</style>