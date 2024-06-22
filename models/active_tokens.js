import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/db.js";

class ActiveToken extends Model { }

ActiveToken.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false
})

export default ActiveToken
