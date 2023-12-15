import Events from '../../models/Events/'
import { datesCheck } from './checks/dates.check'

async function getEventDB(eventId: number) {
	try {
		const event = await Events.findByPk(eventId)
		return event
	} catch (error) {
		throw new Error(error.message || 'Error getting event')
	}
}

export { getEventDB }
