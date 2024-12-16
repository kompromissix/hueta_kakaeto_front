const { DataTypes } = require('sequelize');
const sequelize = require('./database.js');

const User = sequelize.define('User', {
    name_user: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    age_user: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mail_user: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    nick_user: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = User;