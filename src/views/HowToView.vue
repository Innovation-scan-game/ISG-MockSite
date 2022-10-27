<script setup>
import IconHeadline from '../components/IconHeadline.vue';
import BackButton from '../components/BackButton.vue';

</script>

<template>
    <div class="howto">
        <BackButton goto="menu" />
        <form>
            <IconHeadline text="How-to-play" icon="fa:question-circle" />
            <h4>Joining a game</h4>
            <p>Joining a game is simple. You only need to enter the Game ID in the textfield in the “Join Game” view.
                The Game ID is a 4-digit code that you received from a game host. This can be via Whatsapp, email or any
                other social media-platform.</p>
            <h4>Hosting a game</h4>
            <p>Hosting a game can be done by selecting the “Host a Game” option in the main menu. This will bring you in
                a Game Lobby where you can invite other plays by sending them the Game ID manually, or generate a
                automated message via the share-button in the top-right corner and send this via any of your favorite
                social media-platforms.
            </p>
            <p>When a player joins the game he or she wil be shown in the players-overview in
                the middle of the screen. This is basicly a list of players that are ready to play the
                game.<br />//Decks or cards?
            </p>
        </form>
    </div>
</template>

<style scoped>
form {
    gap: 0;
}
form p {
    margin-bottom: 1.5rem;
}
.headline {
    margin-bottom: 2rem;
}
</style>