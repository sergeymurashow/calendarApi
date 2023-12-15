import { DataTypes } from '../../config'

const EventsModel = {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
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
}

export { EventsModel }
