import { Router } from 'express'
import * as calendar from '../../calendar'

const router = Router()

/* GET */
router.get('/event', calendar.getEventById.validator, calendar.getEventById.handler)
router.get('/availability', calendar.getAvailability.validator, calendar.getAvailability.handler)
router.get('/events', calendar.getEvents.validator, calendar.getEvents.handler)

/* POST */
router.post('/event', calendar.createEvent.validator, calendar.createEvent.handler)

export default router
