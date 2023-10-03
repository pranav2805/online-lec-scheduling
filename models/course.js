const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Course = sequelize.define("course", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  level: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  imageURL: {
    type: Sequelize.STRING,
  },
});

module.exports = Course;
