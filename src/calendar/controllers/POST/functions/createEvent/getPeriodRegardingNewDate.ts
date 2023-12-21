import { diffDays, sortEvents, calcPeriod, findEmptyPeriods } from './periodUtils'
import { getPeriodRegardingNewDateDB } from '../../../../../db/dta/Events/getPeriodRegardingNewDate.db'

async function getPeriodRegardingNewDate(startEventDate: Date, endEventDate: Date) {
	const diff = diffDays(startEventDate, endEventDate)
	const bookingDays = diff + 1
	try {
		const dbAnswer = await getPeriodRegardingNewDateDB(startEventDate, endEventDate)
		const dbFields = dbAnswer.map((event) => {
			return {
				id: event.id,
				title: event.title,
				startDate: event.startDate,
				endDate: event.endDate,
				period: event.period,
				before: bookingDays,
				after: bookingDays,
			}
		})
		sortEvents(dbFields)
		calcPeriod(dbFields)
		const recommendation = findEmptyPeriods(bookingDays, dbFields)
		return recommendation
	} catch (error) {
		console.error('Error occurred:', error)
		throw error
	}
}

export { getPeriodRegardingNewDate }
