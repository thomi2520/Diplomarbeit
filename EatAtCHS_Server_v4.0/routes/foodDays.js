const express = require("express");
const router = express.Router();

const models = require("../models");
const hashTools = require("../helpers/hashTools");

const routes = () => {
  const passportOptions = { session: false, failWithError: true };

  router.get("/", async (req, res, next) => {
    try {
      let foodDayManyData = [];
      let responseDay = await models.FoodDay.findAll();

      for (let f of responseDay) {
        let id = f.id;
        let foodDayData = await makeFoodDayData(id);

        foodDayManyData.push(foodDayData);
      }

      res.json(foodDayManyData);
    } catch (error) {
      next(error);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      let id = parseInt(req.params.id);
      let foodDayData = {};

      foodDayData = await makeFoodDayData(id);

      if (foodDayData) {
        res.json(foodDayData, (status = 200));
      } else {
        next({ id: id, message: "FoodDay not found", status: 404 });
      }
    } catch (error) {
      next(error);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      let checkdate = req.body.date;
      let menuID = req.body.menuID;

      let responseDay = [];
      responseDay = await models.FoodDay.findAll({
        where: { date: checkdate }
      });

      if (responseDay.length !== 0) {
        res.json({ date: date, message: "Date already exists", status: 403 });
      } else {
        let newDay = await models.FoodDay.build({
          date: req.body.date
        });

        let menu = await models.Menu.findByPk(menuID);

        if (menu) {
          await newDay.setMenu(menu, { save: false });
          await newDay.save();

          res.json({ id: newDay.id, message: "FoodDay created" });
        } else {
          res.json({ id: newDay.id, message: "Menu not found", status: 404 });
        }
      }
    } catch (error) {
      next("test" + error);
    }
  });

  router.put("/:id", async (req, res, next) => {
    try {
      let id = parseInt(req.params.id);
      let day = await models.FoodDay.findByPk(id);

      if (day) {
        if (req.body.menuID) {
          let menuID = req.body.menuID;
          let menu = await models.Menu.findByPk(menuID);

          await day.setMenu(menu, { save: false });
          await day.save();
        }
        if (req.body.date) {
          await day.update({
            date: req.body.date
          });
        }

        res.json({ id: id, message: "updated" });
      } else {
        next({ id: id, message: "day not found", status: 404 });
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

      let day = await models.FoodDay.findById(id);

      if (day) {
        day.destroy();
        res.json({ id: id, message: "deleted" });
      } else {
        next({ id: id, message: "day not found", status: 404 });
      }
    } catch (error) {
      next(error);
    }
  });
  return router;
};

async function makeFoodDayData(id) {
  let foodDay = await models.FoodDay.findByPk(id);
  let menu = await foodDay.getMenu();
  /*let starter = await menu.getStarter();
  let main = await menu.getMainEat();
  let dessert = await menu.getDessert();*/
  let foodDayData = {};

  if (foodDay) {
    foodDayData = {
      id: foodDay.id,
      date: foodDay.date
    };
    if (menu) {
      foodDayData.menu = {
        id: menu.id,
        name: menu.name,
        description: menu.description,
        starter: menu.starter,
        main: menu.main,
        dessert: menu.dessert
      };
      /* if (starter) {
        foodDayData.menu.starter = {
          id: starter.id,
          name: starter.sName
        };
      }
      if (main) {
        foodDayData.menu.main = {
          id: main.id,
          name: main.mName
        };
      }
      if (dessert) {
        foodDayData.menu.dessert = {
          id: dessert.id,
          name: dessert.dName
        };
      }*/
    }
  }
  return foodDayData;
}

module.exports = routes;
