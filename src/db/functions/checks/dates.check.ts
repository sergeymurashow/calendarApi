import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import between from 'dayjs/plugin/isBetween'

dayjs.extend(customParseFormat)
dayjs.extend(between)

function datesCheck(startDate, endDate) {
	startDate = dayjs(startDate, 'YYYY-MM-DD')
	endDate = dayjs(endDate, 'YYYY-MM-DD')
	if (startDate.isAfter(endDate)) {
		throw new Error('Start date must be before end date')
	}
}

export { datesCheck }
