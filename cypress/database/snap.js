const Sequelize = require('sequelize');

const sequelize = new Sequelize(global.config.env.db_url, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true,
  },
  port: 5438,
  pool: {
    max: 5,
    min: 0,
    require: 30000,
    idle: 20000
  },
  logging: false
}
);

sequelize.authenticate().then(() => {
  console.log('Successfully connected to the database: ' + global.config.env.db_url);
}).catch((err) => {
  console.log(err, 'Unable to connect to the database :(');
});

exports.sequelize = sequelize;