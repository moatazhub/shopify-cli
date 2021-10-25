'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Account.init({
    account_number: DataTypes.STRING,
    user_name: DataTypes.STRING,
    password: DataTypes.STRING,
    company: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    email: DataTypes.STRING,
    address1: DataTypes.STRING,
    address2: DataTypes.STRING,
    contact: DataTypes.STRING,
    mobile: DataTypes.STRING,
    shop_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};