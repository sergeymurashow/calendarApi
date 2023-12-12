import { createEventDB } from '../createEvent.db'
import { ApiError } from '../../../errorHandler'
import { Events } from '../../models'

jest.mock('../../models', () => ({
	Events: {
		create: jest.fn(),
	},
}))

const mockCreate = Events.create as jest.MockedFunction<typeof Events.create>

const mockResponse = [{ id: 1, title: 'testTitle', startDate: '2021-01-01', endDate: '2021-01-02' }]
mockCreate.mockResolvedValue(mockResponse)

describe('createEventDB', () => {
	it('should return event', async () => {
		const result = await createEventDB('testTitle', '2021-01-01', '2021-01-02')
		expect(result).toEqual(mockResponse)
	})

	it('should throw error if startDate is after endDate', async () => {
		mockCreate.mockRejectedValue(new Error('Start date must be before end date'))

		await expect(createEventDB('testTitle', '2021-01-02', '2021-01-01')).rejects.toThrow(
			'Start date must be before end date',
		)
	})

	afterEach(() => {
		jest.clearAllMocks()
	})
})
