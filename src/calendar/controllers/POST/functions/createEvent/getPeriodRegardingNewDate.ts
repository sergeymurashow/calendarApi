import { diffDays, sortEvents, calcPeriod, findEmptyPeriods } from './periodUtils'
import { getPeriodRegardingNewDateDB } from '../../../../../db/functions/getPeriodRegardingNewDate.db'

async function getPeriodRegardingNewDate(startEventDate: string, endEventDate: string) {
	let diff = diffDays(startEventDate, endEventDate)
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

// ;(async () => {
// 	const periods = await getPeriodRegardingDate('2024-02-26', '2024-02-30')
// 	console.log(periods)
// })()
