const models = require("../models");

module.exports = () => {
  const opt = {
    force: process.env.NODE_ENV === "test" ? true : false
  };
  return models.sequelize.sync(opt);
};
