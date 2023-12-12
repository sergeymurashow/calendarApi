import { getPeriodDB } from '../../../../db/functions'

async function getEventsByPeriod(startDate: string, endDate: string) {
	try {
		const events = await getPeriodDB(startDate, endDate)
		return events
	} catch (error) {
		console.error('Error occurred:', error)
		throw error
	}
}

export { getEventsByPeriod }
