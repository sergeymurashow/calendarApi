import { Events } from '../models'
import ICalendarEvent from '../interfaces/ICalendarEvent'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import between from 'dayjs/plugin/isBetween'

dayjs.extend(customParseFormat)
dayjs.extend(between)

type TGetPeriodRegardingDateDB = ICalendarEvent & { period: string }

async function getPeriodRegardingNewDateDB(startDate: string, endDate: string): Promise<TGetPeriodRegardingDateDB[]> {
	if (dayjs(startDate, 'YYYY-MM-DD').isBefore(dayjs())) throw new Error('Start date is before current date')

	try {
		const searchQuery = `SELECT *
		FROM (
				WITH blocked AS (
					SELECT min(startDate) AS startDate,
						max(endDate) AS endDate,
						"blocked" AS period
					FROM (
							SELECT e.startDate,
								e.endDate
							FROM events e
							WHERE JULIANDAY(e.startDate) BETWEEN JULIANDAY("${startDate}") AND JULIANDAY("${endDate}")
								OR JULIANDAY(e.endDate) BETWEEN JULIANDAY("${startDate}") AND JULIANDAY("${endDate}")
							UNION
							SELECT "${startDate}" AS startDate,
								"${endDate}" AS endDate
						)
				)
				SELECT e.id,
					e.startDate,
					e.endDate,
					COALESCE(beforePeriod.period, afterPeriod.period) AS period
				FROM events e
					LEFT JOIN (
						SELECT "before" AS period
					) AS beforePeriod ON JULIANDAY(e.endDate) < JULIANDAY(
						(
							SELECT startDate
							FROM blocked
						)
					)
					LEFT JOIN (
						SELECT "after" AS period
					) AS afterPeriod ON JULIANDAY(e.startDate) > JULIANDAY(
						(
							SELECT endDate
							FROM blocked
						)
					)
				UNION
				SELECT NULL AS id,
					startDate,
					endDate,
					period
				FROM blocked
		) AS marked
		where marked.period is not null
		ORDER BY JULIANDAY(marked.startDate) desc;`

		const events: TGetPeriodRegardingDateDB[] = (await Events.sequelize.query(searchQuery, {
			type: 'SELECT',
		})) as unknown as TGetPeriodRegardingDateDB[]
		return events
	} catch (error) {
		console.error('Error occurred:', error)
		throw error
	}
}

export { getPeriodRegardingNewDateDB }
