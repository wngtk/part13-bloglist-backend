import { DataTypes } from "sequelize"

export const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable('active_tokens', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    }
  })

  await queryInterface.addColumn('users', 'disabled', {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  })
}

export const down = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('users', 'disabled')
  await queryInterface.dropTable('active_tokens')  
}
