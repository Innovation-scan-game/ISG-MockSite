<script setup>
defineProps({
    text: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: false,
    },
});
</script>

<template>

    <button class="blue">
        <Icon :icon="icon" class="icon" style="font-size: 1.5rem;" />
        {{text}}
    </button>

</template>

<style scoped>
.icon {
    width: 21px;
    height: 21px;
    min-width: 21px;
    min-height: 21px;
}
button {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 18px 0 0 18px;
  border: 0;
  padding: 1rem;
  font-weight: bold;
  padding-right: 3rem;
  max-height: 3.5rem;
  flex-grow: 0;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}
.left {
    padding-right: 1rem;
    padding-left: 3rem;
    border-radius: 0 18px 18px 0;
}
</style>