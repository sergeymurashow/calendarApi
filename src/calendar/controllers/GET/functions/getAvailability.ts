import { getEventsByPeriod } from './getEventsByPeriod'

async function getAvailability(startDate: Date, endDate: Date): Promise<boolean> {
	try {
		const events = await getEventsByPeriod(startDate, endDate)
		return events.length ? false : true
	} catch (error) {
		console.error('Error occurred:', error)
		throw error
	}
}

export { getAvailability }
