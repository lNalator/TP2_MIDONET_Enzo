const express = require("express");
const router = express.Router();
const controller = require("../controller/userController");

router
  .route("/")
  .get((req, res) => {
    controller.getAll(req, res);
  })
  .post((req, res) => {
    controller.create(req, res);
  });
router
  .route("/:id")
  .get((req, res) => {
    controller.getById(req, res);
  })
  .put((req, res) => {
    controller.update(req, res);
  })
  .delete((req, res) => {
    controller.remove(req, res);
  });

module.exports = router;
