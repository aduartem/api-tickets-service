const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');

const configBD = require('../config/config');

const basename = path.basename(__filename);
const db = {};

const config = configBD.db;

let sequelize;
try {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
} catch (error) {
  console.error(error);
}

fs.readdirSync(__dirname)
  .filter((file) => (
    file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  ))
  .forEach((file) => {
    const model = require(path.join(__dirname, '', file))(sequelize, Sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;