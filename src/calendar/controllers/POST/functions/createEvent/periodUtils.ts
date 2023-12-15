import { getPeriodDB } from '../../../../../db/dta/Events'
import { ApiError } from '../../../../../errorHandler'

import _ from 'lodash'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import between from 'dayjs/plugin/isBetween'

dayjs.extend(customParseFormat)
dayjs.extend(between)

async function checkPeriod(startDate: Date, endDate: Date) {
	try {
		const events = await getPeriodDB(startDate, endDate)
		return events.length > 0 ? false : true
	} catch (error) {
		console.error('Error occurred:', error)
		throw ApiError.internal(`Some error:`, error)
	}
}

function sortEvents(eventsCollection) {
	const sorted = _.sortBy(eventsCollection, (event) => event.startDate)
	sorted.forEach((event, index) => {
		eventsCollection[index] = event
	})
}

function calcPeriod(sortedDBAnswer): void {
	return sortedDBAnswer.forEach((event, index) => {
		const nextEvent = sortedDBAnswer[index + 1]
		if (nextEvent) {
			const empty = emptyDays(event.endDate, nextEvent.startDate)
			event.after = empty
			nextEvent.before = empty
		}
	})
}

function findEmptyPeriods(bookingDays, eventsCollection) {
	const beforeBlockedPeriod = eventsCollection.filter((eventItem) => ['before', 'blocked'].includes(eventItem.period))
	const afterBlockedPeriod = eventsCollection.filter((eventItem) => ['blocked', 'after'].includes(eventItem.period))

	const before = _.findLast(beforeBlockedPeriod, (event) => event.before >= bookingDays)
	const after = _.find(afterBlockedPeriod, (event) => event.after >= bookingDays)

	const result = {
		after: addDays(bookingDays, after.endDate),
		before: subtractDays(bookingDays, before.startDate),
	}

	return result
}

function addDays(bookingDays, raperDate) {
	raperDate = dayjs(raperDate, 'YYYY-MM-DD').clone()
	const proposedStartDate = raperDate.clone().add(1, 'day')
	const proposedEndDate = proposedStartDate.add(bookingDays - 1, 'day')
	return { startDate: proposedStartDate.format('YYYY-MM-DD'), endDate: proposedEndDate.format('YYYY-MM-DD') }
}

function subtractDays(bookingDays, raperDate) {
	raperDate = dayjs(raperDate, 'YYYY-MM-DD').clone()
	const proposedEndDate = raperDate.clone().subtract(1, 'day')
	const proposedStartDate = proposedEndDate.subtract(bookingDays - 1, 'day')
	return { startDate: proposedStartDate.format('YYYY-MM-DD'), endDate: proposedEndDate.format('YYYY-MM-DD') }
}

function diffDays(startDate, endDate) {
	const start = dayjs(startDate, 'YYYY-MM-DD')
	const end = dayjs(endDate, 'YYYY-MM-DD')
	const diff = end.diff(start, 'day')
	return diff
}

function emptyDays(startDate, endDate) {
	const diff = diffDays(startDate, endDate) - 1
	return diff >= 0 ? diff : diff * -1
}

export { checkPeriod, sortEvents, calcPeriod, findEmptyPeriods, addDays, subtractDays, diffDays, emptyDays }
