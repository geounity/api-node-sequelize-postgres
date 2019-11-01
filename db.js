const chalk = require("chalk");

const db = require("mongoose");
// const dbPostgres = require("databas_geounity_sequelize");

db.Promise = global.Promise;

const connectMongo = async url => {
  await db.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log(chalk.green("[db] Conected succefull!!"));
};

// const connectPostgres = async () => {
//   await dbPostgres()
// }

module.exports.mongo = connectMongo;
// module.exports.postgres = connectPostgres