const development = require("../config/development.cjs");
const production = require("../config/production.cjs");

module.exports = {
  development: development.database,
  production: production.database,
};
