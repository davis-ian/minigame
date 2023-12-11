<script setup>
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'

// Toast
const toast = useToast()
const handleToast = () => {
	toast.add({ severity: 'info', summary: 'S-Info', detail: 'Message Content', life: 3000 })
}

// Dialog
var displayDialog = ref(false)

const initDialog = () => {
	console.log('initing dialog')
	displayDialog.value = true
}

const closeDialog = () => {
	displayDialog.value = false
}
</script>

<template>
	<div style="text-align: center">
		<h1>Games</h1>

		<Button @click="$router.push('/memory')">Memory</Button>
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
