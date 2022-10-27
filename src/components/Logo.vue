<script setup>
</script>
<template>
    <header>
        <div class="logo"></div>
        <div class="title">
            <h3>Cardisc</h3>
            <p>An idea developing tool</p>
        </div>
    </header>
</template>
<style scoped>
header {
    /*aspect-ratio: 2;*/
    background-color: white;
    border: 1px solid #585858;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 0px 18px 18px 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: black;
    padding: 1.25rem;
    width: 85%;
    min-width: 260px;
    max-width: 460px;
    border-left: 0;
    margin-bottom: 5rem;
    gap: 1rem;
}

header .title {
    display: flex;
    flex-direction: column;
}

header p {
    font-size: 1.25rem;
    line-height: 1.5rem;
    margin: 0;
}

.logo {
    background-image: url("https://i.imgur.com/t2CsXHg.png");
    background-size: contain;
    background-repeat: no-repeat;
    aspect-ratio: 1;
    min-width: 112px;
}
</style>