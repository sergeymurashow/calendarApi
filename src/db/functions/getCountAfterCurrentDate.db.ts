import { Events } from '../models'
import { Op } from 'sequelize'
import ICalendarEvent from '../interfaces/ICalendarEvent'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

async function getPeriodRegardingDateDB(startDate: string, endDate: string) {
	try {
		const searchQuery = `
		SELECT COUNT(*) as count
		from events e
		WHERE JULIANDAY(e.startDate) > JULIANDAY(CURRENT_DATE);
		`
		const events = await Events.sequelize.query(searchQuery, {
			type: 'SELECT',
		})
		return events
	} catch (error) {
		console.error('Error occurred:', error)
		throw error
	}
}

export { getPeriodRegardingDateDB }

getPeriodRegardingDateDB(
	dayjs('2021-10-10', 'YYYY-MM-DD').format('YYYY-MM-DD'),
	dayjs('2021-10-15', 'YYYY-MM-DD').format('YYYY-MM-DD'),
)
