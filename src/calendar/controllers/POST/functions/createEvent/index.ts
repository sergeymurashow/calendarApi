import { createEventDB } from '../../../../../db/functions'
import { getPeriodRegardingNewDate } from './getPeriodRegardingNewDate'
import { checkPeriod } from './periodUtils'

async function createEvent(
	title: string,
	startDate: string,
	endDate: string,
): Promise<ReturnType<typeof createEventDB> | ReturnType<typeof getPeriodRegardingNewDate>> {
	try {
		const check = await checkPeriod(startDate, endDate)
		if (!check) {
			return getPeriodRegardingNewDate(startDate, endDate)
		}
		const newEvent = await createEventDB(title, startDate, endDate)
		return {
			id: newEvent.id,
			title: newEvent.title,
			startDate: newEvent.startDate,
			endDate: newEvent.endDate,
		}
	} catch (error) {
		console.error('Error occurred:', error)
		throw error
	}
}

export default createEvent
