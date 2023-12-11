export const saveToLocalStorage = (key, value) => {
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

		if (serializedValue === null) {
			return undefined
		}

		return JSON.parse(serializedValue)
	} catch (error) {
		console.log(error, 'Error retreiving from local storage')
		return undefined
	}
}
