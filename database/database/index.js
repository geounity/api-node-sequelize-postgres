const debug = require("debug")("geounity:db:index");

const models = require("./models");

// Longjohn entrega mas información cuando ocurre un error.
if (process.env.NODE_ENV !== "production") require("longjohn");

module.exports = async (setup = false) => {
  const sequelize = models.sequelize;
  await sequelize.authenticate();
  await sequelize.sync({ force: setup });
  debug("[Sequelize] conected to Postgres");

  // Services
  const countryService = require("./services/country");
  const debateService = require("./services/debate");
  const geopoliticService = require("./services/geopolitic");
  const pointOfView = require("./services/point_of_view");
  const stateService = require("./services/state");
  const userService = require("./services/user");

  return {
    Aim: {},
    Answer: {},
    CommunityFund: {},
    Country: countryService(models.country),
    Debate: debateService(
      models.debate,
      models.user,
      models.geopolitic,
      models.ideologic,
      models.organization
    ),
    Denuncias: {},
    Donation: {},
    Geopolitic: geopoliticService(models.geopolitic),
    Opinion: {},
    Organization: {},
    PointOfView: pointOfView(
      models.pointOfView,
      models.debate,
      models.geopolitic,
      models.ideologic,
      models.organization
    ),
    Poll: {},
    QuestionAim: {},
    ResourceHuman: {},
    ResourceMaterial: {},
    State: stateService(models.state),
    Static: {},
    SubQuestion: {},
    User: userService(models.user)
  };
};
