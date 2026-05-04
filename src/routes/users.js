const express = require("express");
const router = express.Router();
const controller = require("../controller/userController");

router
  .route("/")
  .get((req, res, next) => {
    controller.getAll(req, res, next);
  })
  .post((req, res, next) => {
    controller.create(req, res, next);
  });
router
  .route("/:id")
  .get((req, res, next) => {
    controller.getById(req, res, next);
  })
  .put((req, res, next) => {
    controller.update(req, res, next);
  })
  .delete((req, res, next) => {
    controller.remove(req, res, next);
  });

module.exports = router;
