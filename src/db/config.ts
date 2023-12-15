import { Dialect, Sequelize, DataTypes, Optional, Model, Op } from 'sequelize'

const dbDriver = 'sqlite' as Dialect

const Connection = new Sequelize({
	dialect: dbDriver,
	storage: './storage/database.sqlite',
})

const attributes = {
	timestamps: true,
	sequelize: Connection,
	paranoid: true,
}

export { Connection, DataTypes, Optional, Model, Op, attributes }
