<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { saveToLocalStorage, getFromLocalStorage } from '@/utilities/general.js'
import { useToast } from 'primevue/usetoast'
const toast = useToast()

import FlipCard from '@/components/MemoryGame/FlipCard.vue'

var emojis = ['🧪', '🍗', '🤣', '😍', '🥲', '🙌', '👌', '🤦‍♂️']
var items = ref([])
var matchedIndexes = ref([])
var badSelections = ref([])
var selectedIndexOld = ref(null)
var selectedIndexNew = ref(null)
var moves = ref(0)
var bestScore = ref(null)
var disableClick = ref(false)

const resetGame = () => {
	selectedIndexOld.value = null
	selectedIndexNew.value = null
	matchedIndexes.value = []
	gameOver.value = false
	moves.value = 0

	initList()
}

// Initial List
const generateList = () => {
	var arr = []
	for (let i = 0; i < 8; i++) {
		let item = { val: i, icon: emojis[i] }

		//Add matching pair for each item
		arr.push(item, item)
	}

	return arr
}

const shuffleList = (arr) => {
	return arr.sort(() => Math.random() - 0.5)
}

const initList = () => {
	var arr = generateList()
	var shuffledList = shuffleList(arr)
	items.value = shuffledList
}

// Grid Item Select
const handleGridItemClick = (i) => {
	if (badSelections.value.length > 0) {
		badSelections.value = []
	}

	const newIndex = i
	const previousIndex = selectedIndexOld?.value

	if (previousIndex == null) {
		selectedIndexOld.value = i
	} else {
		selectedIndexNew.value = i
		const newVal = items.value[newIndex]
		const oldVal = items.value[previousIndex]

		if (newIndex == previousIndex) {
			toast.add({
				severity: 'error',
				summary: 'Already Selected',
				detail: 'This item is already selected',
				life: 3000
			})
			return
		}

		if (newVal == oldVal) {
			handleMatch(newIndex, previousIndex)
		} else {
			handleMisMatch(newIndex, previousIndex)
		}

		moves.value++
	}
}

const handleMatch = (index1, index2) => {
	matchedIndexes.value = [...matchedIndexes.value, index1, index2]
	disableClick.value = false
	selectedIndexOld.value = null
	selectedIndexNew.value = null
}

const handleMisMatch = (index1, index2) => {
	selectedIndexOld.value = null
	selectedIndexNew.value = null
	badSelections.value = [...badSelections.value, index1, index2]

	setTimeout(() => {
		let found1 = badSelections.value.find((x) => x == index1)
		let found2 = badSelections.value.find((x) => x == index2)

		if (found1 !== undefined) {
			let badIndex1 = badSelections.value.indexOf(found1)
			badSelections.value.splice(badIndex1, 1)
		}

		if (found2 !== undefined) {
			let badIndex2 = badSelections.value.indexOf(found2)
			badSelections.value.splice(badIndex2, 1)
		}
	}, 1500)
}

const updateBestScore = () => {
	if (!bestScore.value) {
		bestScore.value = moves.value
	} else {
		if (moves.value < bestScore.value) {
			bestScore.value = moves.value
		}
	}
	updateHighScore(moves.value)
}

const loadHighScore = () => {
	const result = getFromLocalStorage('high-scores')

	if (result?.memory_card) {
		bestScore.value = result.memory_card
	}
}

const updateHighScore = (score) => {
	let highScores = {
		memory_card: score
	}
	saveToLocalStorage('high-scores', highScores)
}

// Selected / Matched Class Handler
const handleOptionalClasses = (i) => {
	if (matchedIndexes.value.includes(i)) {
		return 'bg-primary'
	} else if (badSelections.value.includes(i)) {
		return 'shake bg-red-400'
	} else if (selectedIndexOld.value != null && i == selectedIndexOld.value) {
		return 'border-white bg-primary-900'
	} else {
		return 'border-transparent hover:border-white bg-primary-900'
	}
}

const displayCardValue = (i) => {
	if (
		matchedIndexes.value.includes(i) ||
		badSelections.value.includes(i) ||
		selectedIndexOld.value == i ||
		selectedIndexNew.value == i
	) {
		return true
	}

	return false
}

onMounted(() => {
	initList()
	loadHighScore()
})

var gameOver = ref(false)
watch(matchedIndexes, (newVal) => {
	if (newVal.length == items.value.length) {
		gameOver.value = true
	}
})

watch(gameOver, (newVal) => {
	if (newVal) {
		toast.add({
			severity: 'success',
			summary: 'Success!',
			detail: 'All matches found!',
			life: 3000
		})

		updateBestScore()
	}
})
</script>

<template>
	<div>
		<div class="flex justify-content-center">
			<div style="max-width: 1000px">
				<h1 class="text-center">Memory Game</h1>
				<Button @click="$router.push('/')">
					<font-awesome-icon icon="fa-solid fa-arrow-left"></font-awesome-icon>
				</Button>
				<div class="flex justify-content-between">
					<p>Moves: {{ moves }}</p>
					<p v-if="bestScore">Best: {{ bestScore }}</p>
				</div>
				<div class="grid">
					<div v-for="(item, i) in items" class="col-3" :key="i">
						<FlipCard
							@click="handleGridItemClick(i)"
							:id="`grid-item-${i}`"
							:item="item"
							:class="handleOptionalClasses(i)"
							:displayValue="displayCardValue(i)"
						></FlipCard>
					</div>
				</div>
			</div>
		</div>
		<div>
			<div v-if="moves > 0" class="flex justify-content-center p-3">
				<Button
					:severity="gameOver ? '' : 'secondary'"
					:outlined="gameOver ? false : true"
					@click="resetGame"
					>{{ gameOver ? 'Play Again' : 'Reset' }}</Button
				>
			</div>
		</div>
	</div>
</template>

<style scoped>
.grid-item {
	transition: background-color 0.3s;
}
.shake {
	animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
	transform: translate3d(0, 0, 0);
}

.error-bg {
	background-color: #ef5267 !important;
}

@keyframes shake {
	10%,
	90% {
		transform: translate3d(-1px, 0, 0);
	}

	20%,
	80% {
		transform: translate3d(2px, 0, 0);
	}

	30%,
	50%,
	70% {
		transform: translate3d(-4px, 0, 0);
	}

	40%,
	60% {
		transform: translate3d(4px, 0, 0);
	}
}
</style>
