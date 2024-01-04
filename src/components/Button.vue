<template>

    <button :class="size">
        {{ text }}
    </button>

</template>
  
<script setup lang="ts">

    // import { useStore } from '../store/index';
    // const store = useStore();

    defineProps<{ 
        text: string,
        size: "small" | "medium" | "large"
    }>();


</script>

<style src="../styles/button.scss" scoped lang="scss"></style>