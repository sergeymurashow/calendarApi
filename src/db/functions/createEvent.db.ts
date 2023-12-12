import { Events } from '../models'
import ICalendarEvent from '../interfaces/ICalendarEvent'

async function createEventDB(title: string, startDate: string, endDate: string): Promise<ICalendarEvent> {
	try {
		const event = await Events.create({
			title,
			startDate,
			endDate,
		})
		return event as unknown as ICalendarEvent
	} catch (error) {
		throw new Error(error.message || 'Error creating event')
	}
}

export { createEventDB }
