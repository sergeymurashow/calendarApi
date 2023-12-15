import { Model, DataTypes, Optional, Connection, attributes } from '../../config'
import { EventAttributes, EventInput } from './Events.types'

export class Events extends Model<EventAttributes, EventInput> implements EventAttributes {
	id: number
	title!: string
	startDate!: Date
	endDate!: Date
	createdAt: Date
	updatedAt: Date
}
