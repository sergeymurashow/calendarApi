import { Optional } from '../../dbTypes'

export type EventAttributes = {
	id: number
	title: string
	startDate: Date
	endDate: Date
	createdAt?: Date
	updatedAt?: Date
}

export type EventInput = Optional<EventAttributes, 'id' | 'createdAt' | 'updatedAt'>

export type EventOutput = Required<EventAttributes>
