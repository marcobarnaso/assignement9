const dbConnectionLoader = require('./db-connection-loader');

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  // tasks are automatically merged when registered
    try {
      global.config = config; // Assigns config object to global variable to use in sequelize modules
      dbConnectionLoader.loadDatabaseConnection(config.env.database_connection, config.env.database);
    }
    catch (error) {
      console.log(error)
    }
}