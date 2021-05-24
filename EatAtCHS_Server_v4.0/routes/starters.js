const express = require("express");
const router = express.Router();

const models = require("../models");
const hashTools = require("../helpers/hashTools");

const routes = () => {
  const passportOptions = { session: false, failWithError: true };

  router.get("/", async (req, res, next) => {
    try {
      if (req.query.id) {
        responseStarter = await models.Starter.findAll({
          where: { id: req.query.id }
        });
      } else {
        responseStarter = await models.Starter.findAll();
      }
      res.json(responseStarter);
    } catch (error) {
      next(error);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      let id = parseInt(req.params.id);

      let starter = await models.Starter.findById(id);

      if (starter) {
        res.json(starter);
      } else {
        next({ id: id, message: "starter not found", status: 404 });
      }
    } catch (error) {
      next(error);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      let newStarter = await models.Starter.build({
        sName: req.body.sName
      });

      await newStarter.save();

      res.json({ id: newStarter.id, message: "Starter created" });
    } catch (error) {
      next(error);
    }
  });

  router.put("/:id", async (req, res, next) => {
    try {
      let id = parseInt(req.params.id);
      let starter = await models.Starter.findById(id);

      if (starter) {
        await starter.update({
          sName: req.body.sName
        });
        res.json({ id: id, message: "updated" });
      } else {
        next({ id: id, message: "starter not found", status: 404 });
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

      let starter = await models.Starter.findById(id);

      if (starter) {
        starter.destroy();
        res.json({ id: id, message: "deleted" });
      } else {
        next({ id: id, message: "starter not found", status: 404 });
      }
    } catch (error) {
      next(error);
    }
  });
  return router;
};

module.exports = routes;
