<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { saveToLocalStorage, getFromLocalStorage } from '@/utilities/general.js'
import { useToast } from 'primevue/usetoast'
const toast = useToast()
import { v4 as uuidv4 } from 'uuid'

import JSConfetti from 'js-confetti'
const jsConfetti = new JSConfetti()

const confettiHandler = () => {
	jsConfetti.addConfetti({
		// emojis: ['🎊', '🎈', '🎉']
		emojis: emojis.value
	})
}

import FlipCard from '@/components/MemoryGame/FlipCard.vue'

var emojis = ref([])

var emojisDict = {
	spooky: ['🎃', '🪦', '⚰️', '🕯️', '🦇', '🕸️', '🧟', '👻'],
	faces: ['🤠', '🧐', '🥸', '🥳', '😠', '😵', '😬', '🤯'],
	weird: ['👁️', '📎', '🎰', '🧪', '🔮', '🐉', '🗿', '⏳'],
	animals: ['🐺', '🐸', '🫎', '🐔', '🦞', '🐣', '🦔', '🐳']
}

const getRandomList = () => {
	var keys = Object.keys(emojisDict)

	var randomIndex = Math.floor(Math.random() * keys.length)

	var randomKey = keys[randomIndex]

	var randomList = emojisDict[randomKey]

	return randomList
}

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
	emojis.value = getRandomList()

	initList()
}

// Initial List
const generateList = () => {
	var arr = []
	for (let i = 0; i < 8; i++) {
		let item = { val: i, icon: emojis.value[i] }

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
	if (allHighScoreModal.value) {
		allHighScoreModal.value = false
	}
	if (newHighScoreModal.value) {
		newHighScoreModal.value = false
	}

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

// High Score
const newHighScoreModal = ref(false)
const allHighScoreModal = ref(false)
const userName = ref('')
const existingHighScores = ref([])

const testSetScore = () => {
	newHighScoreModal.value = true
	moves.value = 125
}

const loadHighScores = () => {
	const result = getFromLocalStorage('high-scores')

	if (result?.memory_card) {
		existingHighScores.value = result.memory_card
		existingHighScores.value.sort((a, b) => a.score - b.score)

		bestScore.value = existingHighScores.value[0]

		console.log(existingHighScores.value, 'existing on  load')
	}
}

const addHighScore = (userName, score) => {
	if (!userName) {
		toast.add({
			severity: 'error',
			summary: '',
			detail: 'Username is required',
			life: 3000
		})
		return
	}
	if (!score) {
		toast.add({
			severity: 'error',
			summary: '',
			detail: 'Score is required',
			life: 3000
		})
		return
	}

	const newHighScore = { id: uuidv4(), user: userName, score: score }

	const updatedScores = [newHighScore, ...existingHighScores.value]
	updatedScores.sort((a, b) => a.score - b.score)

	let highScores = {
		memory_card: updatedScores
	}
	saveToLocalStorage('high-scores', highScores)
	existingHighScores.value = updatedScores

	newHighScoreModal.value = false
	allHighScoreModal.value = true
}

const clearHighScores = () => {
	let highScores = {
		memory_card: []
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
	emojis.value = getRandomList()

	initList()
	loadHighScores()
})

var gameOver = ref(false)
watch(matchedIndexes, (newVal) => {
	if (newVal.length == items.value.length) {
		gameOver.value = true
	}
})

watch(gameOver, (newVal) => {
	if (newVal) {
		confettiHandler()
		toast.add({
			severity: 'success',
			summary: 'Success!',
			detail: 'All matches found!',
			life: 3000
		})

		newHighScoreModal.value = true
	}
})
</script>

<template>
	<div>
		<div class="flex justify-content-center">
			<div style="max-width: 1000px">
				<h1 class="text-center">Memory Game</h1>
				<div class="flex justify-content-between">
					<Button @click="$router.push('/')">
						<font-awesome-icon icon="fa-solid fa-arrow-left"></font-awesome-icon>
					</Button>
					<Button @click="allHighScoreModal = true">
						<font-awesome-icon class="mr-2" icon="fa-solid fa-gamepad"></font-awesome-icon>High
						Scores</Button
					>
				</div>
				<div class="flex justify-content-between">
					<p>Moves: {{ moves }}</p>

					<!-- v-tooltip.top="'High Scores'" -->
					<p v-if="existingHighScores.length > 0">Best: {{ existingHighScores[0].score }}</p>
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

			<Dialog :closable="false" v-model:visible="newHighScoreModal">
				<template #header>
					<h2>High Score: {{ moves }}</h2>
				</template>
				<InputText
					@keydown.enter="updateHighScore(userName, moves)"
					type="text"
					v-model="userName"
				/>
				<template #footer>
					<div class="flex justify-content-center">
						<Button @click="addHighScore(userName, moves)">Save</Button>
					</div>
				</template>
			</Dialog>

			<Dialog
				@click:outside="allHighScoreModal = false"
				v-model:visible="allHighScoreModal"
				:closable="false"
			>
				<template #header>
					<h2>High Scores</h2>
				</template>

				<!-- <ListBox :style="{ maxHeight: '300px' }" :options="existingHighScores">
					<template #option="slotProps">
						<div class="flex justify-content-between gap-8">
							<span>
								{{ slotProps.option.score }}
							</span>
							<span>
								{{ slotProps.option.user }}
							</span>
						</div>
					</template>
				</ListBox> -->

				<DataTable
					tableStyle="min-width: 300px"
					:style="{ maxHeight: '500px' }"
					:value="existingHighScores"
				>
					<Column field="user" header="User"></Column>
					<Column class="text-right" field="score">
						<template #header>
							<span class="flex-1 text-right">Score</span>
						</template>
					</Column>
				</DataTable>

				<template #footer>
					<div class="flex justify-content-center">
						<Button @click="allHighScoreModal = false">Close</Button>
					</div>
				</template>
			</Dialog>
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
