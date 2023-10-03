const { INTEGER } = require("sequelize");
const sequelize = require("../util/database");

const Schedule = sequelize.define("schedule", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Schedule;
