import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";

export interface WalletInstance extends Model {
  id: number,
  name: string,
  description: string,
  type: number,
  color: string,
  icon: string,
  balance: number,
  iduser: number,
};

export const Wallet = sequelize.define<WalletInstance>('Wallet', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  },
  type: {
    type: DataTypes.INTEGER
  },
  color: {
    type: DataTypes.STRING
  },
  icon: {
    type: DataTypes.STRING
  },
  balance: {
    type: DataTypes.DECIMAL
  },
  iduser: {
    type: DataTypes.INTEGER
  },
}, {
  tableName: "wallets",
  timestamps: true,
  paranoid: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  deletedAt: "deleted_at",
})