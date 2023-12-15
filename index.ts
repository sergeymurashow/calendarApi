import express from 'express'
import routes from './src/routes'
import sequelize from './src/db/dbInit'
import { apiErrorMiddleware } from './src/middlewares/apiError.middleware'

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', routes)

/* 
Error handler middleware
Must be the last 
*/
app.use(apiErrorMiddleware)
;(async () => {
	await sequelize.authenticate()
	await sequelize.sync()

	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`)
	})
})()
