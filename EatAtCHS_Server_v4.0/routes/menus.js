const express = require("express");
const router = express.Router();

const models = require("../models");
const hashTools = require("../helpers/hashTools");

const routes = () => {
  const passportOptions = { session: false, failWithError: true };

  router.get("/", async (req, res, next) => {
    try {
      //let menuManyData = [];
      let responseMenu = await models.Menu.findAll();

      /*for (let m of responseMenu) {
        let id = m.id;
        let menuData = await makeMenuData(id);

        menuManyData.push(menuData);
      }*/
      res.json(responseMenu);
    } catch (error) {
      next(error);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      let id = parseInt(req.params.id);
      let menuData = await models.Menu.findByPk(id);

      //menuData = await makeMenuData(id);

      if (menuData) {
        res.json(menuData, (status = 200));
      } else {
        next({ id: id, message: "Menu not found", status: 404 });
      }
    } catch (error) {
      next(error);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      let newMenu = await models.Menu.build({
        name: req.body.name,
        description: req.body.description,
        starter: req.body.starter,
        main: req.body.main,
        dessert: req.body.dessert
      });
      await newMenu.save();
      res.json({ id: newMenu.id, message: "Menu created" });

      /*starterID = req.body.starterID;
      mainID = req.body.mainID;
      dessertID = req.body.dessertID;

      let starter = await models.Starter.findByPk(starterID);
      let main = await models.MainEat.findByPk(mainID);
      let dessert = await models.Dessert.findByPk(dessertID);

      if (starter) {
        if (main) {
          if (dessert) {
            await newMenu.setStarter(starter, { save: false });
            await newMenu.setMainEat(main, { save: false });
            await newMenu.setDessert(dessert, { save: false });
            await newMenu.save();

            res.json({ id: newMenu.id, message: "Menu created" });
          } else {
            next({ message: "Dessert not found", status: 404 });
          }
        } else {
          next({ message: "Main not found", status: 404 });
        }
      } else {
        next({ message: "Starter not found", status: 404 });
      }*/
    } catch (error) {
      next(error);
    }
  });

  router.put("/:id", async (req, res, next) => {
    try {
      let id = parseInt(req.params.id);
      let menu = await models.Menu.findById(id);

      if (menu) {
        if (req.body.name) {
          await menu.update({
            name: req.body.name
          });
        }
        if (req.body.description) {
          await menu.update({
            description: req.body.description
          });
        }
        if (req.body.starter) {
          await menu.update({
            starter: req.body.starter
          });
        }
        if (req.body.main) {
          await menu.update({
            main: req.body.main
          });
        }
        if (req.body.dessert) {
          await menu.update({
            dessert: req.body.dessert
          });
        }

        res.json({ id: id, message: "updated" });
      } else {
        next({ id: id, message: "Menu not found", status: 404 });
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

      let menu = await models.Menu.findById(id);

      if (menu) {
        menu.destroy();
        res.json({ id: id, message: "deleted" });
      } else {
        next({ id: id, message: "menu not found", status: 404 });
      }
    } catch (error) {
      next(error);
    }
  });
  return router;
};

/*async function makeMenuData(id) {
  let menu = await models.Menu.findByPk(id);
  let starter = await menu.getStarter();
  let main = await menu.getMainEat();
  let dessert = await menu.getDessert();
  let menuData = {};

  if (menu) {
    // check if null
    menuData = {
      id: menu.id,
      name: menu.name,
      description: menu.description
    };

    if (starter) {
      menuData.starter = {
        id: starter.id,
        sName: starter.sName
      };
    }
    if (main) {
      menuData.main = {
        id: main.id,
        mName: main.mName
      };
    }
    if (dessert) {
      menuData.dessert = {
        id: dessert.id,
        dName: dessert.dName
      };
    }
  }
  return menuData;
}*/

module.exports = routes;
