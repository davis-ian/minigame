export const saveToLocalStorage = (key, value) => {
	console.log(key, value)
	try {
		const serializedValue = JSON.stringify(value)
		localStorage.setItem(key, serializedValue)
	} catch (error) {
		console.log(error, 'Error saving to local storage')
	}
}

export const getFromLocalStorage = (key) => {
	try {
		const serializedValue = localStorage.getItem(key)

		console.log(serializedValue)

		if (serializedValue === null) {
			return undefined
		}

		return JSON.parse(serializedValue)
	} catch (error) {
		console.log(error, 'Error retreiving from local storage')
		return undefined
	}
}
