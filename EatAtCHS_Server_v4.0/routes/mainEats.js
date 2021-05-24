const express = require("express");
const router = express.Router();

const models = require("../models");
const hashTools = require("../helpers/hashTools");

const routes = () => {
  const passportOptions = { session: false, failWithError: true };

  router.get("/", async (req, res, next) => {
    try {
      if (req.query.id) {
        responseMainEat = await models.MainEat.findAll({
          where: { id: req.query.id }
        });
      } else {
        responseMainEat = await models.MainEat.findAll();
      }
      res.json(responseMainEat);
    } catch (error) {
      next(error);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      let id = parseInt(req.params.id);

      let mainEat = await models.MainEat.findById(id);

      if (mainEat) {
        res.json(mainEat);
      } else {
        next({ id: id, message: "mainEat not found", status: 404 });
      }
    } catch (error) {
      next(error);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      let newMainEat = await models.MainEat.build({
        mName: req.body.mName
      });

      await newMainEat.save();

      res.json({ id: newMainEat.id, message: "MainEat created" });
    } catch (error) {
      next(error);
    }
  });

  router.put("/:id", async (req, res, next) => {
    try {
      let id = parseInt(req.params.id);
      let mainEat = await models.MainEat.findById(id);

      if (mainEat) {
        await mainEat.update({
          mName: req.body.mName
        });
        res.json({ id: id, message: "updated" });
      } else {
        next({ id: id, message: "MainEat not found", status: 404 });
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

      let mainEat = await models.MainEat.findById(id);

      if (mainEat) {
        mainEat.destroy();
        res.json({ id: id, message: "deleted" });
      } else {
        next({ id: id, message: "MainEat not found", status: 404 });
      }
    } catch (error) {
      next(error);
    }
  });
  return router;
};

module.exports = routes;
