import { getPeriodDB } from '../getPeriod.db'
import { ApiError } from '../../../errorHandler'
import { Events } from '../../models'

jest.mock('../../models', () => ({
	Events: {
		findAll: jest.fn(),
	},
}))

const mockFindAll = Events.create as jest.MockedFunction<typeof Events.create>

const mockResponse = [{ id: 1, title: 'testTitle', startDate: '2021-01-01', endDate: '2021-01-02' }]
mockFindAll.mockResolvedValue(mockResponse)

describe('getPeriodDB', () => {
	it('should return event', async () => {
		const result = await getPeriodDB('2021-01-01', '2021-01-02')
		expect(result).toEqual(mockResponse)
	})

	it('should throw error if startDate is after endDate', async () => {
		mockFindAll.mockRejectedValue(new Error('Start date must be before end date'))

		await expect(getPeriodDB('2021-01-01', '2021-01-02')).rejects.toThrow('Start date must be before end date')
	})

	afterEach(() => {
		jest.clearAllMocks()
	})
})
