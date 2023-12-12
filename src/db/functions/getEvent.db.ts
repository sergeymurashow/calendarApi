import { Events } from '../models'
import ICalendarEvent from '../interfaces/ICalendarEvent'

async function getEventDB(eventId: number) {
	try {
		const event: ICalendarEvent = (await Events.findByPk(eventId)) as unknown as ICalendarEvent
		return event
	} catch (error) {
		console.error('Error occurred:', error)
		throw new Error(error)
	}
}

export { getEventDB }
