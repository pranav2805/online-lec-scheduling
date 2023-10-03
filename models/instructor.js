const { INTEGER, STRING } = require("sequelize");
const sequelize = require("../util/database");

const Instructor = sequelize.define("instructor", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
});

module.exports = Instructor;
