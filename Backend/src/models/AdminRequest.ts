import { DataTypes, Model, Optional } from "sequelize";
import { db } from "../config/db";
import { ReqStatus } from "../common/enums/reqStatus.enum";

const sequelize = db.getInstance();

interface AdminRequestAttributes {
    id: number;
    blog_id: number;
    author_id: number;
    status: ReqStatus;
}

interface AdminRequestCreationAttributes extends Optional<AdminRequestAttributes, "id" | "status"> {}

export class AdminRequest extends Model<AdminRequestAttributes, AdminRequestCreationAttributes>
    implements AdminRequestAttributes {
    declare id: number;
    declare blog_id: number;
    declare author_id: number;
    declare status: ReqStatus;
}

AdminRequest.init({
    id:        { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    blog_id:   { type: DataTypes.INTEGER, allowNull: false },
    author_id: { type: DataTypes.INTEGER, allowNull: false },
    status: {
        type: DataTypes.ENUM(...Object.values(ReqStatus)),
        defaultValue: ReqStatus.PENDING
    }
}, {
    sequelize,
    modelName: "AdminRequest",
    tableName: "AdminRequests",
    timestamps: true
});
