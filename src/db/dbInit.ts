import { Connection, DataTypes } from './config'
import Models from './models'

const dbInit = async () => {
	try {
		await Connection.authenticate()
		console.log('Connection has been established successfully.')
	} catch (error) {
		console.error('Unable to connect to the database:', error)
	}
	await Promise.all(Models.map((model) => model.sync({ alter: true })))
}

export default Connection
