const express = require("express");
const router = express.Router();

const models = require("../models");
const hashTools = require("../helpers/hashTools");

const routes = () => {
  const passportOptions = { session: false, failWithError: true };

  router.get("/", async (req, res, next) => {
    try {
      if (req.query.id) {
        responseMessage = await models.Message.findAll({
          where: { id: req.query.id }
        });
      } else {
        responseMessage = await models.Message.findAll();
      }
      res.json(responseMessage);
    } catch (error) {
      next(error);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      let id = parseInt(req.params.id);

      let message = await models.Message.findById(id);

      if (message) {
        res.json(message);
      } else {
        next({ id: id, message: "message not found", status: 404 });
      }
    } catch (error) {
      next(error);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      let newMessage = await models.Message.build({
        description: req.body.description,
        message: req.body.message
      });

      await newMessage.save();

      res.json({ id: newMessage.id, message: "Message created" });
    } catch (error) {
      next(error);
    }
  });

  router.put("/:id", async (req, res, next) => {
    try {
      let id = parseInt(req.params.id);
      let message = await models.Message.findById(id);

      if (message) {
        if (req.body.description) {
          await message.update({
            description: req.body.description
          });
          res.json({ id: id, message: " description updated" });
        }
        if (req.body.message) {
          await message.update({
            message: req.body.message
          });
          res.json({ id: id, message: " message updated" });
        }
      } else {
        next({ id: id, message: "message not found", status: 404 });
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

      let message = await models.Message.findById(id);

      if (message) {
        message.destroy();
        res.json({ id: id, message: "deleted" });
      } else {
        next({ id: id, message: "message not found", status: 404 });
      }
    } catch (error) {
      next(error);
    }
  });
  return router;
};

module.exports = routes;
