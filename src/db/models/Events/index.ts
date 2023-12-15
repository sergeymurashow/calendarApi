import { Events } from './Events.class'
import { EventsModel } from './Events.model'
import { attributes } from '../../config'

export { EventAttributes, EventInput, EventOutput } from './Events.types'
export default Events.init(EventsModel, attributes)
