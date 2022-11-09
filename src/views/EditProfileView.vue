<script setup>
import { ref, reactive, computed, watch } from 'vue';
import BackButton from '../components/BackButton.vue';
import IconHeadline from '../components/IconHeadline.vue';
import GameButton from '../components/GameButton.vue';

import { useStore } from '../stores/new'
import { http } from '../http';
const file = ref(null);
const store = useStore();

const feedback = ref("");

const editUser = reactive({
    username: store.user.username,
    email: store.user.email,
    password: ''
});
const confirmPassword = ref("");

async function editProfile() {
    console.log("edit profile", editUser)

    if (file.value != null) {
        const formData = new FormData();
        formData.append('file', file.value);
        await http.post("/api/user/avatar", formData).then((response) => {
        }).catch((error) => {
            feedback.value = error.response.data.message;
        })
    }

    await http.put("/api/user", editUser).then((response) => {
        console.log("edit res", response)
        store.setUser(response.data)
    }).catch((error) => {
        console.log("errrrr", error.response)
        feedback.value = error.response.data.message;
    })
}

function onFileChange(event) {
    file.value = event.target.files[0];
}


const fileUrl = computed(() => {
    return file.value ? URL.createObjectURL(file.value) : store.user.picture;
});

watch(() => confirmPassword, () => {
    feedback.value = "";
})
</script>

<template>
    <div class="edit_profile">
        <BackButton goto="settings" />

        <form @submit.prevent="editProfile" >
            <IconHeadline text="Edit profile" icon="fa-solid:user-edit"
                subText="Edit your profile information bellow" />

            <label>Username
                <input v-model="editUser.username" type="text" placeholder="Username" />
            </label>

            <label>Email
                <input v-model="editUser.email" type="text" placeholder="Email" />
            </label>
            <label>Password
                <input type="password" v-model="editUser.password" placeholder="password" />
            </label>
            <label v-auto-animate>Repeat password
                <input type="password" v-model="confirmPassword" placeholder="Repeat password" />
                <p class="error" v-if="editUser.password !== confirmPassword">Passwords do not match!</p>

            </label>

            <label class="uploadLabel">User avatar
                <label class="upload" :style="'background-image: url(' + fileUrl +')' ">
                    <input type="file" @change="onFileChange" />
                </label>
            </label>
            <p v-if="feedback!=''">{{feedback}}</p>
            <GameButton :disabled="feedback != ''" text="Confirm" icon="fa6-solid:user-check" />

        </form>


    </div>
</template>

<style scoped>
.upload {
    margin: 0;
    width: 100px;
    aspect-ratio: 1;
    background: white;
    border: 2px solid white;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    border-radius: 1rem;
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
}

.uploadLabel {
    width: max-content;
}

input[type="file"] {
    display: none;
}
</style>