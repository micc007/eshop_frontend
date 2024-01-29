<template>

    <button :class="size" :type="type">
        {{ text }}
    </button>

</template>
  
<script setup lang="ts">

    // import { useStore } from '../store/index';
    // const store = useStore();

    defineProps<{ 
        text: string,
        size: "small" | "medium" | "large",
        type?: "submit" | "reset"
    }>();


</script>

<style src="../styles/button.scss" scoped lang="scss"></style>