import Events, { EventInput, EventOutput } from '../../models/Events/'
import { datesCheck } from './checks/dates.check'

async function getPeriodRegardingNewDateDB(
	startDate: Date,
	endDate: Date,
): Promise<(EventOutput & { period: string })[]> {
	const error = datesCheck(startDate, endDate)
	if (error) {
		throw new Error(error)
	}

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

		const events = (await Events.sequelize.query(searchQuery, {
			type: 'SELECT',
		})) as ReturnType<keyof typeof getPeriodRegardingNewDateDB>
		return events
	} catch (error) {
		throw new Error(error.message || 'Error finding event')
	}
}

export { getPeriodRegardingNewDateDB }
