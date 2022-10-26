import { defineStore } from "pinia";

export const useStore = defineStore("store", {

    state: () => ({
        user: {},
        userId: "",

        jwt: "",
        gameState: "default",
        connectionId: "",
        signalConnection: null,
        sessionInfo: {},
        gameInfo: {},
        answerSubmitted: false,
        messages: [],
        answers: [],
        conclusion: "",
    }),
    persist: true,

    getters: {
        getJwt: (state) => {
            return state.jwt;
        },
        getConnection: (state) => {
            return state.signalConnection;
        },
        getCurrentCard: (state) => {
            if (Object.keys(state.gameInfo).length === 0) {
                return {};
            }
            return state.gameInfo.cards[state.gameInfo.currentRound]
        },
        getCurrentMessages: (state) => {
            return state.messages.filter(m => m.round === state.gameInfo.currentRound);
        },
        isHost: (state) => {
            return state.sessionInfo.hostId === state.user.id;
        },
    },
    actions: {
        // setUserId(id) {
        //     this.userId = id;
        // },

        setUser(user) {
            this.user = user;
        },

        setGameState(state) {
            this.gameState = state;
        },
        setGameInfo(gameInfo) {
            this.gameInfo = gameInfo;
        },
        setJwt(token) {
            this.jwt = token;
        },
        setSession(session) {
            this.sessionInfo = session;
        },
        updatePlayer(player) {
            console.log('store updatePlayer', player)
            this.sessionInfo.players.find(p => p.id === player.id).ready = player.ready;
        },
        addPlayer(player) {
            if (this.sessionInfo.players.find(p => p.id === player.id) === undefined) {
                this.sessionInfo.players.push(player);
            }
        },
        removePlayer(player) {
            this.sessionInfo.players = this.sessionInfo.players.filter(p => p.id !== player.id);
        },
        setConnectionId(id) {
            this.connectionId = id;
        },
        setConnection(connection) {
            this.signalConnection = connection;
        },
        setAnswerSubmitted(answer) {
            this.answerSubmitted = answer;
        },
        addMessage(message) {
            this.messages.push(message)
        },
        increaseRound() {
            this.gameInfo.currentRound++;
        },
        setAnswers(answers) {
            this.answers = answers
        },
        addAnswer(answer) {
            this.answers.push(answer)
        },
        resetState() {
            this.gameState = "menu";
            this.gameInfo = {};
            this.answers = [];
            this.messages = [];
            this.answerSubmitted = false;
        },
        logOut() {
            console.log("store logout");
            this.user = {};
            this.jwt = "";
        },
        setConclusion(conclusion) {
            this.conclusion = conclusion;
        }
    }
});