'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class appSession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  appSession.init({
    sessionId: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    shop: {
      allowNull: false,
      type: DataTypes.STRING
    },
    payload: {
      allowNull: false,
      type: DataTypes.JSON
    }
  }, {
    sequelize,
    modelName: 'appSession',
  });
  return appSession;
};