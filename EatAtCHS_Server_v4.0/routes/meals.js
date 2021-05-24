const express = require("express");
const router = express.Router();

const models = require("../models");
const hashTools = require("../helpers/hashTools");

const routes = () => {
  const passportOptions = { session: false, failWithError: true };

  router.get("/", async (req, res, next) => {
    try {
      if (req.query.id) {
        responseMeal = await models.Meal.findAll({
          where: { mealID: req.query.id }
        });
      } else {
        responseMeal = await models.Meal.findAll();
      }
      res.json(responseMeal);
    } catch (error) {
      next(error);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      let id = parseInt(req.params.id);

      let meal = await models.Meal.findById(id);

      if (meal) {
        res.json(meal);
      } else {
        next({ id: id, message: "meal not found", status: 404 });
      }
    } catch (error) {
      next(error);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      let newMeal = await models.Meal.build({
        mealName: req.body.mealName,
        mealType: req.body.mealType
      });

      await newMeal.save();

      res.json({ id: newMeal.id, message: "Meal created" });
    } catch (error) {
      next(error);
    }
  });

  router.put("/:id", async (req, res, next) => {
    try {
      let id = parseInt(req.params.id);
      let meal = await models.Meal.findById(id);

      if (meal) {
        await meal.update({
          mealName: req.body.mealName,
          mealType: req.body.mealType
        });
        res.json({ id: id, message: "updated" });
      } else {
        next({ id: id, message: "meal not found", status: 404 });
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

      let meal = await models.Meal.findById(id);

      if (meal) {
        meal.destroy();
        res.json({ id: id, message: "deleted" });
      } else {
        next({ id: id, message: "meal not found", status: 404 });
      }
    } catch (error) {
      next(error);
    }
  });
  return router;
};

module.exports = routes;
