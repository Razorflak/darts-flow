export const getInputValue = <T extends string | number | boolean>(
	id: string,
): T => {
	const element = document.getElementById(id)

	if (!element) {
		throw new Error(`Element with id "${id}" not found.`)
	}

	if (element instanceof HTMLInputElement) {
		// Si l'élément est un champ texte
		if (element.type === "text") {
			//@ts-expect-error
			return element.value
		}

		// Si l'élément est un champ number
		if (element.type === "number") {
			const valueAsNumber = Number.parseFloat(element.value)
			if (Number.isNaN(valueAsNumber)) {
				throw new Error(`The value of input "${id}" is not a valid number.`)
			}
			//@ts-expect-error
			return valueAsNumber
		}

		// Si l'élément est une checkbox
		if (element.type === "checkbox") {
			//@ts-expect-error
			return element.checked
		}
	}

	if (element instanceof HTMLSelectElement) {
		// Si l'élément est un <select>
		const selectedOption = element.selectedOptions[0]
		//@ts-expect-error
		return selectedOption ? selectedOption.value : null // Retourne la valeur du <option> sélectionné
	}

	throw new Error(`Element with id "${id}" is neither an input nor a select.`)
}

export const getHtmlElementById = (id: string) => {
	const htmlElement = document.getElementById(id)
	if (!htmlElement) {
		throw new Error(`Html element not found: ${id}`)
	}
	return htmlElement
}
