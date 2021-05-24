const express = require("express");
const router = express.Router();

const models = require("../models");
const hashTools = require("../helpers/hashTools");

const routes = () => {
  const passportOptions = { session: false, failWithError: true };

  /* GET BookedDayMenus listing. */

  router.get("/:id", async (req, res, next) => {
    try {
      let id = parseInt(req.params.id);

      let bookedDay = await models.BookedDay.findById(id);

      if (bookedDay) {
        responseMenu = await models.Menu.findAll({
          where: { id: bookedDay.menuID }
        });
        res.json(responseMenu);
      } else {
        next({ id: id, message: "Menu not found", status: 404 });
      }
    } catch (error) {
      next(error);
    }
  });

  return router;
};

module.exports = routes;
