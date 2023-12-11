<script setup>
import { RouterView } from 'vue-router'
import NavBar from '@/components/layout/NavBar.vue'
</script>

<template>
	<!-- <NavBar /> -->
	<main id="main">
		<RouterView id="routerView" />
	</main>

	<Toast></Toast>
</template>

<style>
body {
	margin: 0;
}
#main {
	height: 100vh;
	/* background-color: #010409; */
}
#routerView {
	min-height: 100%;
}
.pointer {
	cursor: pointer;
}
</style>
