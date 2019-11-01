const user = require("../components/user/network");
const geocommunities = require("../components/geocommunities/network");
const debates = require('../components/debate/network')

const routes = server => {
  server.use("/user", user);
  server.use("/geocommunities", geocommunities);
  server.use("/debate", debates)
};

module.exports = routes;
