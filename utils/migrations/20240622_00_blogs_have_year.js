import { DataTypes } from "sequelize"

export const up = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('blogs', 'year', {
    type: DataTypes.INTEGER,
    defaultValue: 1991
  })
}

export const down = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('blogs', 'year')
}
