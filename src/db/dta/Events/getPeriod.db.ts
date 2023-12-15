import Events from '../../models/Events/'
import { Op } from '../../config'
import { datesCheck } from './checks/dates.check'

async function getPeriodDB(startDate: Date, endDate: Date) {
	const error = datesCheck(startDate, endDate)
	if (error) {
		throw new Error(error)
	}

	try {
		const searchObject = {
			where: {
				[Op.or]: [
					{
						startDate: {
							[Op.between]: [startDate.toString(), endDate.toString()],
						},
					},
					{
						endDate: {
							[Op.between]: [startDate.toString(), endDate.toString()],
						},
					},
				],
			},
		}

		const events = await Events.findAll(searchObject)
		return events
	} catch (error) {
		throw new Error(error.message || 'Error getting event')
	}
}

export { getPeriodDB }

let t = new Events()
