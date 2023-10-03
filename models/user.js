const { INTEGER, STRING, BOOLEAN } = require("sequelize");
const sequelize = require("../util/database");
const Instructor = require("../models/instructor");

const User = sequelize.define("user", {
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
  password: {
    type: STRING,
    allowNull: false,
  },
  isAdmin: {
    type: BOOLEAN,
    default: false,
  },
  instructorId: {
    type: INTEGER,
    references: {
      model: Instructor,
      key: "id",
    },
  },
});

// User.sync({ force: true });
module.exports = User;
