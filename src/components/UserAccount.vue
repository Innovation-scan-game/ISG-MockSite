<script setup>
import { computed } from 'vue'
import { useStore } from '../stores/new'
const store = useStore();

const props = defineProps({
    user: {
        type: Object,
        required: true,
    },

});
console.log("User account user", props.user);

</script>

<template>
    <div class="userAccount">

        <div v-if="store.user.picture" class="picture" :style="'background-image: url(' + user.picture +')'"> </div>
        <div v-else  class="picture default">
            <Icon class="fill" icon="bi:person-fill" />
        </div>
        <div class="infos">
            <h3>{{user.username}}</h3>
            <hr>
            <div class="userinfo">
                <div class="stats">
                    <p>Account<br/> type: </p>
                    <p>Email address: </p>
                    <p>Password: </p>
                </div>
                <div class="stats">
                    <p>Student</p>
                    <p>{{user.email}}</p>
                    <p>**********</p>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
.default {
    background: #93A4FF;
}
.fill {
    padding: 1rem;
    width: 100%;
    height: 100%;
    overflow: hidden;
    color: white;
}
.userAccount {
    display: flex;
    gap: .5rem;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    background-color: white;
    color: black;
    padding: 1.5rem;
    align-items: center;

    margin-bottom: 4rem;
    overflow: hidden;
}

.stats {
    display: flex;
    flex-direction: column;
}

.stats>p {
    flex-grow: 1;
}

.userinfo {
    display: flex;
    gap: .5rem;
    /* padding: 1rem; */
}

.infos {
    width: 100%;
}

h3 {
    text-align: left;
}

hr {
    border-top: 1px solid rgba(0, 0, 0, 0.15)
}

/* h3,
hr {
    margin-left: 1rem;
} */

.picture {
    border-radius: 50%;
    aspect-ratio: 1;
    min-width: 64px;
    width: 50%;
    max-height: 136px;
    max-width: 136px;
    flex-grow: 1;
    background-size: cover;
    margin-right: 4%;
    background-position: center;
}
</style>