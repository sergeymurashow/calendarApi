import { getPeriodDB } from '../../../../db/dta/Events'

async function getEventsByPeriod(startDate: Date, endDate: Date) {
	try {
		const events = await getPeriodDB(startDate, endDate)
		return events
	} catch (error) {
		console.error('Error occurred:', error)
		throw error
	}
}

export { getEventsByPeriod }
