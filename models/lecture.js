const { INTEGER, STRING, DATE, DATEONLY } = require("sequelize");

const sequelize = require("../util/database");

const Lecture = sequelize.define("lecture", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  date: {
    type: DATEONLY,
    allowNull: false,
  },
});

module.exports = Lecture;
