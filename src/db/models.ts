import sequelize from './db'
import { DataTypes } from 'sequelize'
import dayjs from 'dayjs'
import objectSupport from 'dayjs/plugin/objectSupport'
import utc from 'dayjs/plugin/utc'
import { ApiError } from '../errorHandler'
dayjs.extend(objectSupport)
dayjs.extend(utc)

console.log('Events model')

const Events = sequelize.define('events', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	startDate: {
		type: DataTypes.DATEONLY,
		allowNull: false,
	},
	endDate: {
		type: DataTypes.DATEONLY,
		allowNull: false,
	},
})

// Events.addHook('beforeCreate', (event: any) => {
// 	let { startDate, endDate } = event

// 	if (startDate > endDate) {
// 		throw new Error('Start date must be before end date')
// 	}
// })
// 	.addHook('beforeUpdate', (event: any) => {
// 		let { startDate, endDate } = event

// 		if (startDate > endDate) {
// 			throw new Error('Start date must be before end date')
// 		}
// 	})
// 	.addHook('beforeFind', (searchObject: any) => {
// 		let { startDate, endDate } = searchObject.where.or

// 		if (startDate > endDate) {
// 			throw new Error('Start date must be before end date')
// 		}
// }
// )

export { Events }
