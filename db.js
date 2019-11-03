const chalk = require("chalk");

const dbMongo = require("mongoose");
// const dbPostrgres = require('postgres-geounity')

dbMongo.Promise = global.Promise;
// dbPostgres.Promise = global.Promise;

const connectMongo = async url => {
  await dbMongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log(chalk.green("[MongoDB] Conected succefull!!"));
};

// const connectPostgres = async () => {
//   await dbPostgres()
// }

module.exports.mongo = connectMongo;
// module.exports.postgres = connectPostgres