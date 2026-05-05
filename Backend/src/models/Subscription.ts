import { DataTypes, Model, Optional } from "sequelize";
import { db } from "../config/db";

const sequelize = db.getInstance();

interface SubscriptionAttributes {
    id: number;
    user_id: number;
    author_id: number;
}

interface SubscriptionCreationAttributes extends Optional<SubscriptionAttributes, "id"> {}

export class Subscription extends Model<SubscriptionAttributes, SubscriptionCreationAttributes>
    implements SubscriptionAttributes {
    declare id: number;
    declare user_id: number;
    declare author_id: number;
}

Subscription.init({
    id:        { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id:   { type: DataTypes.INTEGER, allowNull: false },
    author_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
    sequelize,
    modelName: "Subscription",
    tableName: "Subscriptions",
    timestamps: true
});
