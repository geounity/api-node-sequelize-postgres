const express = require("express");
const response = require("../../network/response");
const controller = require("./controller");
const router = express.Router();

router.get("/continents", (req, res) => {
  controller
    .getContinents()
    .then(data => {
      response.success(req, res, data, 201);
    })
    .catch(e => {
      response.error(req, res, "Internal error", 500, e);
    });
});

router.get("/countries", (req, res) => {
  controller
    .getCountries()
    .then(data => {
      response.success(req, res, data, 201);
    })
    .catch(e => {
      response.error(req, res, "Internal error", 500, e);
    });
});

router.get("/global/uuid", (req, res) => {
  controller
    .getUuidGlobal()
    .then(data => {
      response.success(req, res, data, 201)
    })
    .catch(e => {
      response.error(req, res, "Internal error", 500, e)
    })
})

router.get("/:continent/countries", (req, res) => {
  let { continent } = req.params;
    
  controller
    .getCountriesByContinent(continent)
    .then(data => {
      response.success(req, res, data, 200);
    })
    .catch(e => {
      response.error(req, res, "Internal error", 500, e);
    });
});

router.get("/:country/states", (req, res) => {
  const { country } = req.params;
  controller
    .getStatesByCountry(country)
    .then(data => {
      response.success(req, res, data, 200);
    })
    .catch(e => {
      response.error(req, res, `Not find states in ${country}`, 500, e);
    });
});

router.get("/:country/:state/cities", (req, res) => {
  const { country, state } = req.params
  controller
    .getCitiesByStateAndCountries(state, country)
    .then(data => {
      response.success(req, res, data, 200)
    })
    .catch(e => {
      response.error(req, res, `Not find cities in ${state} in ${country}`, 500, e)
    })
})

module.exports = router;
