const express = require("express");
const response = require("../../network/response");
const controller = require("./controller");
const router = express.Router();

router.get("/", (req, res) => {
  const filterUser = req.query.user || null;
  controller
    .getUsers(filterUser)
    .then(userList => {
      response.success(req, res, userList, 200);
    })
    .catch(err => {
      response.reject(req, res, "Invalid User", 500, err);
    });
});

router.post("/", (req, res) => {
  controller
    .addUser(req.body)
    .then(data => {
      response.success(req, res, data, 201);
    })
    .catch(e => {
      response.error(req, res, "Internal error", 500, e);
    });
});

router.patch("/", (req, res) => {
  const { username, payload } = req.body;
  controller
    .updateUser(username, payload)
    .then(data => {
      response.success(req, res, data, 201);
    })
    .catch(e => {
      response.error(req, res, "Internal error", 500, e);
    });
});

router.get("/username/:email", (req, res) => {
  const { email } = req.params
  controller
    .getUsernameByEmail(email)
    .then(data => {
      response.success(req, res, data, 200)
    })
    .catch(e => {
      response.error(req, res, "Internal error", 500, e)
    })
})

router.get("/:id", (req, res) => {
  const filterUserById = req.params.id || null;
  controller
    .getUserById(filterUserById)
    .then(user => {
      response.success(req, res, user, 200);
    })
    .catch(err => {
      response.error(req, res, "Invalid User", 500, err);
    });
});

module.exports = router;
