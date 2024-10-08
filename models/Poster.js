const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");

class Poster extends Model {}

Poster.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id"
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        underscored: true,
        freezeTableName: true,
        modelName: "poster"
    }   
)

module.exports = Poster;