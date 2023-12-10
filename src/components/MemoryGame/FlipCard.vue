<script setup>
// Selected / Matched Class Handler

defineProps({
	item: Object,
	displayValue: Boolean
})
</script>

<template>
	<Card class="grid-item text-center text-4xl border-round-md font-bold border-3 shadow-3 pointer">
		<template #content>
			<span v-if="displayValue">{{ item.icon }}</span>
			<span class="pa-4" v-else>❔</span>
		</template>
	</Card>
</template>
<style></style>
