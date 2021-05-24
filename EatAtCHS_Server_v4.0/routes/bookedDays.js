const express = require("express");
const router = express.Router();
const moment = require("moment");

const models = require("../models");
const hashTools = require("../helpers/hashTools");

const routes = () => {
  const passportOptions = { session: false, failWithError: true };

  /* GET BookedDay listing. */
  router.get("/", async (req, res, next) => {
    try {
      let responseDay = await models.BookedDay.findAll();
      let bookedDayManyData = [];

      for (let b of responseDay) {
        let id = b.id;
        let bookedDayData = await makeBookedDayData(id);

        bookedDayManyData.push(bookedDayData);
      }

      res.json(bookedDayManyData);
    } catch (error) {
      next(error);
    }
  });

  router.get("/arrive/", async (req, res, next) => {
    try {
      let curdate = moment();

      let actualDate = formatCalendarDate(curdate);

      let foodDays = await models.FoodDay.findAll({
        where: { date: actualDate }
      });

      let foodDay = foodDays[0];

      let bookedDays = await models.BookedDay.findAll({
        where: { foodDay_id: foodDay.id, paid: true }
      });

      let bookedDayManyData = [];

      for (let b of bookedDays) {
        let id = b.id;
        let bookedDayData = await makeArriveBookedDayData(id);

        bookedDayManyData.push(bookedDayData);
      }

      res.json(bookedDayManyData);
    } catch (error) {
      next(error);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      let id = parseInt(req.params.id);
      let bookedDayData = {};

      bookedDayData = await makeBookedDayData(id);

      if (bookedDayData) {
        res.json(bookedDayData, (status = 200));
      } else {
        next({ id: id, message: "BookedDay not found", status: 404 });
      }
    } catch (error) {
      next(error);
    }
  });

  router.get("/users/:id", async (req, res, next) => {
    try {
      let id = parseInt(req.params.id);
      let user = await models.User.findByPk(id);
      let bookedDayData = [];

      if (user) {
        responseDay = await models.BookedDay.findAll({
          where: { uid: id }
        });

        for (let b of responseDay) {
          let id = b.id;
          bookedDayData.push(await makeBookedDayData(id));
        }

        if (bookedDayData) {
          res.json(bookedDayData, (status = 200));
        } else {
          next({ id: id, message: "BookedDay not found", status: 404 });
        }
      } else {
        next({ id: id, message: "User not found", status: 404 });
      }
    } catch (error) {
      next(error);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      let userID = req.body.uID;
      let fID = req.body.fID;

      let foodDay = await models.FoodDay.findByPk(fID);

      if (foodDay) {
        let date = foodDay.date;
        let ifExits = await checkAlreadyExits(userID, fID, date);

        if (ifExits === true) {
          next({ id: fID, message: "Already booked", status: 409 });
        } else {
          let newDay = await models.BookedDay.build({
            uID: req.body.uID,
            loggedIn: req.body.loggedIn,
            paid: req.body.paid,
            consumed: req.body.consumed
          });

          await newDay.setFoodDay(foodDay, { save: false });
          await newDay.save();

          res.json({ id: newDay.id, message: "Day created" });
        }
      } else {
        next({ id: fID, message: "Included FoodDay not found", status: 404 });
      }
    } catch (error) {
      next(error);
    }
  });

  router.put("/:id", async (req, res, next) => {
    try {
      let id = parseInt(req.params.id);
      let day = await models.BookedDay.findById(id);
      if (day) {
        if (req.body.menuID) {
          await day.update({
            menuID: req.body.menuID
          });
        }
        if (req.body.uID) {
          await day.update({
            uID: req.body.uID
          });
        }
        if (req.body.bookedDate) {
          await day.update({
            bookedDate: req.body.bookedDate
          });
        }
        if (req.body.loggedIn !== undefined && req.body.loggedIn !== null) {
          await day.update({
            loggedIn: req.body.loggedIn
          });
        }
        if (req.body.paid !== undefined && req.body.paid !== null) {
          await day.update({
            paid: req.body.paid
          });
        }
        if (req.body.consumed !== undefined && req.body.consumed !== null) {
          await day.update({
            consumed: req.body.consumed
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

      let day = await models.BookedDay.findById(id);

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

async function makeBookedDayData(id) {
  let bookedDay = await models.BookedDay.findByPk(id);
  let foodDay = await bookedDay.getFoodDay();
  let menu = await foodDay.getMenu();
  /*let starter = await menu.getStarter();
  let main = await menu.getMainEat();
  let dessert = await menu.getDessert();*/
  let bookedDayData = {};
  if (bookedDay) {
    bookedDayData = {
      id: bookedDay.id,
      uID: bookedDay.uID,
      loggedIn: bookedDay.loggedIn,
      paid: bookedDay.paid,
      consumed: bookedDay.consumed
    };
    if (foodDay) {
      bookedDayData.foodDay = {
        id: foodDay.id,
        date: foodDay.date
      };
      if (menu) {
        bookedDayData.foodDay.menu = {
          id: menu.id,
          name: menu.name,
          description: menu.description,
          starter: menu.starter,
          main: menu.main,
          dessert: menu.dessert
        };
        /*if (starter) {
          bookedDayData.foodDay.menu.starter = {
            id: starter.id,
            name: starter.sName
          };
        }
        if (main) {
          bookedDayData.foodDay.menu.main = {
            id: main.id,
            name: main.mName
          };
        }
        if (dessert) {
          bookedDayData.foodDay.menu.dessert = {
            id: dessert.id,
            name: dessert.dName
          };
        }*/
      }
    }
  }
  return bookedDayData;
}

async function checkAlreadyExits(uID, fID, date) {
  let avaiableBookedDays = await models.BookedDay.findAll({
    where: { uID: uID }
  });
  let foodDayAdd = await models.FoodDay.findByPk(fID);
  let dateAdd = foodDayAdd.date;

  for (let b of avaiableBookedDays) {
    let foodCheck = await b.getFoodDay();
    let dateCheck = foodCheck.date;

    if (dateCheck === dateAdd) {
      return true;
    }
  }
  return false;
}

formatCalendarDate = function(dateTime) {
  return moment.utc(dateTime).format("YYYY-MM-DD");
};

async function makeArriveBookedDayData(id) {
  let bookedDay = await models.BookedDay.findByPk(id);
  let foodDay = await bookedDay.getFoodDay();
  let menu = await foodDay.getMenu();

  let user = await models.User.findAll({
    where: { id: bookedDay.uID }
  });

  let name = user[0].firstname + " " + user[0].lastname;

  let bookedDayData = {};
  if (bookedDay) {
    bookedDayData = {
      id: bookedDay.id,
      name: name,
      loggedIn: bookedDay.loggedIn,
      paid: bookedDay.paid,
      consumed: bookedDay.consumed
    };
    if (foodDay) {
      bookedDayData.foodDay = {
        id: foodDay.id,
        date: foodDay.date
      };
      if (menu) {
        bookedDayData.foodDay.menu = {
          id: menu.id,
          name: menu.name,
          description: menu.description,
          starter: menu.starter,
          main: menu.main,
          dessert: menu.dessert
        };
      }
    }
  }
  return bookedDayData;
}

module.exports = routes;
