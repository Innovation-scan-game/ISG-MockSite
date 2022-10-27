<script setup>
import StartView from "./views/StartView.vue";
import LoginView from "./views/LoginView.vue";
import { useStore } from './stores/new'
import { storeToRefs } from "pinia";
import MainMenuView from "./views/MainMenuView.vue";
import JoinGameView from "./views/JoinGameView.vue";
import RegisterView from "./views/RegisterView.vue";
import HowToView from "./views/HowToView.vue";
import AccountSettingsView from "./views/AccountSettingsView.vue";
import LobbyView from "./views/LobbyView.vue";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { watch, onUnmounted } from 'vue';
import { http } from "./http";
import GameView from "./views/GameView.vue";
import AddConclusionView from "./views/AddConclusionView.vue";
import EditProfileView from "./views/EditProfileView.vue";
import EndGameView from "./views/EndGameView.vue";
import { useRouter, useRoute } from 'vue-router'
import GameButton from "./components/GameButton.vue";
import IconHeadline from "./components/IconHeadline.vue";
const router = useRouter();

const store = useStore();
const { gameState, jwt, signalConnection, sessionInfo } = storeToRefs(store)
let connection = null;
console.log("gs", gameState)
onUnmounted(() => {
  console.log("onUnmounted")
  connection.off("newConnection", onNewConnection);
  connection.off("readyStateChanged", onReadyStateChange);
  connection.off("newPlayer", onNewPlayer);
  connection.off("playerLeft", onPlayerLeft);
  connection.off("startGame", onGameStarted);
  connection.off("newMessage", onNewMessage);
  connection.off("newAnswer", onNewAnswer);
  connection.off("nextRound", onNextRound);
  connection.off("endSession", onEndSession);
  connection.stop();
});

if (store.jwt !== "") {
  console.log("jwt not empty")
  connection = createSignalRConnection();
  store.setConnection(connection);


}
watch(jwt, (newVal, oldVal) => {
  if (newVal === "") {
    return;
  }
  console.log("watch jwt")
  connection = createSignalRConnection();
  store.setConnection(connection);
})

// watch(signalConnection => {
//   console.log("connection watcher", signalConnection)
//   // createSignalRConnection();
// })

function createSignalRConnection() {
  console.log("createSignalRConnection")

  // if (store.signalConnection !== null) {
  //   console.log("connection already exists", store.signalConnection)
  //   store.signalConnection.stop();
  // }

  var connection = new HubConnectionBuilder()
    .withUrl("/api?token=" + jwt)
    .configureLogging(LogLevel.Information)
    .build();

  connection.onclose(onClose);
  connection.on("newConnection", onNewConnection);

  connection.on("readyStateChanged", onReadyStateChange);

  connection.on("newPlayer", onNewPlayer);

  connection.on("playerLeft", onPlayerLeft);

  connection.on("startGame", onGameStarted);

  connection.on("newMessage", onNewMessage);

  connection.on("newAnswer", onNewAnswer);

  connection.on("nextRound", onNextRound);

  connection.on("endSession", onEndSession)

  connection.start();
  store.setConnection(connection);
  return connection;
}

function onNewConnection(id) {
  console.log("ON NEW CONNECTION");
  store.setConnectionId(id);
  // reconnect to group if game is in progress
  if (Object.keys(store.sessionInfo).length > 0) {
    http.post('/api/joinGrp', { connectionId: id })
      .catch(error => {
        store.setGameState("menu");
        console.log(error)
      })
  }
}

function onClose() {
  console.log("connection closed")
  store.setConnectionId("");
  store.setConnection(null);
}

function onReadyStateChange(user) {
  console.log("onReadyStateChange", user)
  store.updatePlayer(user);
}
function onNewPlayer(player) {
  store.addPlayer(player);
}
function onPlayerLeft(player) {
  console.log("store sess", store.sessionInfo)
  if (player.id === store.sessionInfo.hostId || player.id === store.user.id) {
    store.resetState();
  }
  store.removePlayer(player);
}
function onGameStarted(gameInfo) {
  console.log("GAME STARTED")
  gameInfo.rounds = gameInfo.cards.length;
  gameInfo.currentRound = 0;
  store.setGameState("game");
  store.setGameInfo(gameInfo);
}
function onNewMessage(user, cardIndex, message) {
  store.addMessage({ user: user, message: message, round: cardIndex });
}
function onNewAnswer(user, answer) {
  console.log("OnNewAnswer", user, answer)
  store.addAnswer({ user: user, answer: answer });
}

function onNextRound() {
  store.setAnswers([]);
  store.setAnswerSubmitted(false);
  store.setConclusion("");
  store.increaseRound();
}
function onEndSession() {
  console.log("onEndSession")
  store.resetState();
  store.setGameState('end');

}

const components = {
  "default": StartView,
  "login": LoginView,
  "menu": MainMenuView,
  "join": JoinGameView,
  "register": RegisterView,
  "howto": HowToView,
  "settings": AccountSettingsView,
  "lobby": LobbyView,
  "game": GameView,
  "addConclusion": AddConclusionView,
  "editProfile": EditProfileView,
  "end": EndGameView
}
function getComponent() {
  return components[store.gameState];
}

function reload() {
  router.go();
}
</script>

<template>

  <div class="disconnected"
    v-if="!['default', 'login', 'register'].includes(store.gameState) && store.connectionId === ''">
    <IconHeadline icon="clarity:disconnected-solid" text="You are disconnected!" />
    <GameButton @click="reload" text="Reload" />
  </div>

  <component v-else :is="components[store.gameState]"></component>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

.disconnected>div {
  margin: 3rem;
}

.disconnected button {
  align-self: flex-end;
  width: max-content;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: bold;
}


nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

/* 
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
