import mutateDate from '../mutateDate'

describe('mutateDate', () => {
	it('should return a string', () => {
		const date = mutateDate('2021-01-01')
		expect(date).toBe('2021-01-01')
	})
	it('if the date is in ISO format with time, it should return the only date', () => {
		const date = mutateDate('2021-01-01T12:34:56')
		expect(date).toBe('2021-01-01')
	})
})
