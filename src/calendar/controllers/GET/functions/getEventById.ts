import { getEventDB } from '../../../../db/functions'

async function getEventById(id: string) {
	try {
		const event = await getEventDB(+id)
		return event
	} catch (error) {
		console.error('Error occurred:', error)
		throw error
	}
}

export { getEventById }
