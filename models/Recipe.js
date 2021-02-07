const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Recipe extends Model {}

Recipe.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      recipe_url: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isURL: true
        }
      },
      recipe_text: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            len: [1]
        }
      },
      ingredients_text: {
        type: DataTypes.TEXT('tiny'),
        allowNull: true,
        validate: {
            len: [1]
        }
      },
      directions_text: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            len: [1]
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'recipe'
    }
);
  
module.exports = Recipe;