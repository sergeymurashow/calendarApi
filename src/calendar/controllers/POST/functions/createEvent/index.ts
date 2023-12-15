import { createEventDB } from '../../../../../db/dta/Events'
import { getPeriodRegardingNewDate } from './getPeriodRegardingNewDate'
import { checkPeriod } from './periodUtils'

async function createEvent(
	title: string,
	startDate: Date,
	endDate: Date,
): Promise<ReturnType<typeof createEventDB> | ReturnType<typeof getPeriodRegardingNewDate>> {
	try {
		const check = await checkPeriod(startDate, endDate)
		if (!check) {
			return getPeriodRegardingNewDate(startDate, endDate)
		}
		const newEvent = await createEventDB({ title, startDate, endDate })
		return newEvent
	} catch (error) {
		console.error('Error occurred:', error)
		throw error
	}
}

export default createEvent
