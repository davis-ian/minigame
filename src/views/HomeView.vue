<script setup>
import Button from 'primevue/button'
</script>

<template>
	<div class="flex justify-content-center align-items-center">
		<div style="text-align: center">
			<h1>Games</h1>

			<Button @click="$router.push('/memory')">Memory</Button>
		</div>
	</div>
</template>

<style>
/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
	opacity: 0;
}
</style>
