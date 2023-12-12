import { Events } from '../models'
import { Op } from 'sequelize'
import ICalendarEvent from '../interfaces/ICalendarEvent'

async function getPeriodDB(startDate: string, endDate: string) {
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

		const events: ICalendarEvent[] = (await Events.findAll(searchObject)) as unknown as ICalendarEvent[]
		return events
	} catch (error) {
		throw new Error(error.message || 'Error getting event')
	}
}

export { getPeriodDB }

getPeriodDB('2021-01-01', '2021-01-02')
