const express = require("express");
const router = express.Router();

const models = require("../models");
const hashTools = require("../helpers/hashTools");

const routes = () => {
  const passportOptions = { session: false, failWithError: true };

  router.get("/", async (req, res, next) => {
    try {
      if (req.query.id) {
        responseDessert = await models.Dessert.findAll({
          where: { id: req.query.id }
        });
      } else {
        responseDessert = await models.Dessert.findAll();
      }
      res.json(responseDessert);
    } catch (error) {
      next(error);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      let id = parseInt(req.params.id);

      let dessert = await models.Dessert.findById(id);

      if (dessert) {
        res.json(dessert);
      } else {
        next({ id: id, message: "dessert not found", status: 404 });
      }
    } catch (error) {
      next(error);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      let newDessert = await models.Dessert.build({
        dName: req.body.dName
      });

      await newDessert.save();

      res.json({ id: newDessert.id, message: "Dessert created" });
    } catch (error) {
      next(error);
    }
  });

  router.put("/:id", async (req, res, next) => {
    try {
      let id = parseInt(req.params.id);
      let dessert = await models.Dessert.findById(id);

      if (dessert) {
        await dessert.update({
          dName: req.body.dName
        });
        res.json({ id: id, message: "updated" });
      } else {
        next({ id: id, message: "dessert not found", status: 404 });
      }
    } catch (error) {
      next(error);
    }
  });

  /**
   *
   */
  router.delete("/:id", async (req, res, next) => {
    try {
      let id = parseInt(req.params.id);

      let dessert = await models.Dessert.findById(id);

      if (dessert) {
        dessert.destroy();
        res.json({ id: id, message: "deleted" });
      } else {
        next({ id: id, message: "dessert not found", status: 404 });
      }
    } catch (error) {
      next(error);
    }
  });
  return router;
};

module.exports = routes;
