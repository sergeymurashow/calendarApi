import { Router } from 'express'
import * as calendar from '../../calendar'

const router = Router()

/**
 * @swagger
 * /calendar/event:
 *  get:
 *   description: Get event by id
 *  tags:
 *  - Calendar
 * parameters:
 * - in: query
 *  name: id
 * schema:
 * type: string
 * required: true
 * responses:
 * 200:
 * description: Success
 * 400:
 * description: Bad request
 * 404:
 * description: Not found
 * 500:
 * description: Internal server error
 *
 */
router.get('/event', calendar.getEventById.validator, calendar.getEventById.handler)

/**
 * @swagger
 * /calendar/availability:
 *  get:
 *   description: Get availability
 *  tags:
 *  - Calendar
 * parameters:
 * - in: query
 *  name: startDate
 * schema:
 * type: string
 * required: true
 * - in: query
 *  name: endDate
 * schema:
 * type: string
 * required: true
 * responses:
 * 200:
 * description: Success
 * 400:
 * description: Bad request
 * 404:
 * description: Not found
 * 500:
 * description: Internal server error
 *
 */
router.get('/availability', calendar.getAvailability.validator, calendar.getAvailability.handler)

/**
 * @swagger
 * /calendar/events:
 *  get:
 *   description: Get events
 *  tags:
 *  - Calendar
 * parameters:
 * - in: query
 *  name: startDate
 * schema:
 * type: string
 * required: true
 * - in: query
 *  name: endDate
 * schema:
 * type: string
 * required: true
 * responses:
 * 200:
 * description: Success
 * 400:
 * description: Bad request
 * 404:
 * description: Not found
 * 500:
 * description: Internal server error
 *
 */
router.get('/events', calendar.getEvents.validator, calendar.getEvents.handler)

/**
 * @swagger
 * /calendar/event:
 *  post:
 *   description: Create event
 *  tags:
 *  - Calendar
 * requestBody:
 * content:
 * application/json:
 * schema:
 * 	type: object
 * 	properties:
 * 	title:
 * 	type: string
 * 	startDate:
 * 	type: string
 * 	endDate:
 * 	type: string
 * required:
 * - title
 * - startDate
 * - endDate
 * responses:
 * 200:
 * description: Success
 * 400:
 * description: Bad request
 * 404:
 * description: Not found
 * 500:
 * description: Internal server error
 *
 */
router.post('/event', calendar.createEvent.validator, calendar.createEvent.handler)

export default router
