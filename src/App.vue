<script setup>
import { RouterView } from 'vue-router'
import NavBar from '@/components/layout/NavBar.vue'
</script>

<template>
	<NavBar />
	<RouterView />
	<Toast></Toast>
</template>

<style>
.pointer {
	cursor: pointer;
}
</style>
