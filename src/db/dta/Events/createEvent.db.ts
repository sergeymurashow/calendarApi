import Events, { EventInput, EventOutput } from '../../models/Events/'
import { datesCheck } from './checks/dates.check'

async function createEventDB(payload: EventInput): Promise<EventOutput> {
	const { title, startDate, endDate } = payload

	const error = datesCheck(startDate, endDate)
	if (error) {
		throw new Error(error)
	}

	try {
		const event = await Events.create({
			title,
			startDate,
			endDate,
		})
		return event
	} catch (error) {
		throw new Error(error.message || 'Error creating event')
	}
}

export { createEventDB }
