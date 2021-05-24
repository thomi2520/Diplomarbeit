const hashTools = require("./hashTools");

module.exports = async models => {
  /*******************************************************/
  try {
    let hashedPassword1 = await hashTools.createHash("cisco");
    let hashedPassword2 = await hashTools.createHash("cisco!1234");
    let hashedPassword3 = await hashTools.createHash("arrive");
    let hashedPassword4 = await hashTools.createHash("huo01");

    let users = await models.User.findAll();

    if (users && users.length > 0) {
      return;
    }

    // ################################################
    // Roles

    let userRole = await models.Role.create({
      name: "Users",
      shortName: "U"
    });

    let adminRole = await models.Role.create({
      name: "Admin",
      shortName: "A"
    });

    // ################################################
    // Admin Luca

    let luca = await models.User.build({
      firstname: "Luca",
      lastname: "Allmaier",
      email: "allmaiel@edu.htl.villach.at",
      username: "ivan",
      password: hashedPassword1
    });

    await luca.setRole(adminRole, { save: false });
    await luca.save();

    // ################################################
    // User Thomas

    let thomas = await models.User.build({
      firstname: "Thomas",
      lastname: "Kogler",
      email: "koglert@edu.htl-villach.at",
      username: "thomi25",
      password: hashedPassword2
    });

    await thomas.setRole(userRole, { save: false });
    await thomas.save();

    // ################################################
    // User Hufsky

    let leon = await models.User.build({
      firstname: "Robert",
      lastname: "Hufsky",
      email: "huo@htl-villach.at",
      username: "huo",
      password: hashedPassword3
    });

    await leon.setRole(userRole, { save: false });
    await leon.save();

    // to set Thomas to an admin
    // await thomas.setRole(adminRole);

    // ################################################
    // User arriveAdmin

    let arriveAdmin = await models.User.build({
      firstname: "arriveAdmin",
      lastname: "Admin",
      email: "keineMail",
      username: "arrive",
      password: hashedPassword4
    });

    await arriveAdmin.setRole(adminRole, { save: false });
    await arriveAdmin.save();

    // to set Thomas to an admin
    // await thomas.setRole(adminRole);

    let roleusers = await userRole.getUsers();

    users = await models.User.findAll();

    users.forEach(async u => {
      let role = await u.getRole();
      let roleName = role.name;
      let rn = (await u.getRole()).name;
      console.log(`${u.firstname} ${u.username} ${(await u.getRole()).name}`);
    });
  } catch (error) {
    console.log(error);
  }

  // ################################################
  // bookedDays
  /*try {
    let bookedDay1 = await models.BookedDay.build({
      menuID: 2,
      uID: 1,
      bookedDate: "10.12.2019",
      loggedIn: false,
      paid: true,
      consumed: false
    });

    await bookedDay1.save();

    bookedDay = await models.BookedDay.findAll();
    console.log(`${bookedDay}`);
  } catch (error) {
    console.log(error);
  }

  try {
    let bookedDay2 = await models.BookedDay.build({
      menuID: 1,
      uID: 1,
      bookedDate: "11.10.2019",
      loggedIn: true,
      paid: true,
      consumed: true
    });

    await bookedDay2.save();

    bookedDay = await models.BookedDay.findAll();
    console.log(`${bookedDay}`);
  } catch (error) {
    console.log(error);
  }

  try {
    let bookedDay3 = await models.BookedDay.build({
      menuID: 2,
      uID: 2,
      bookedDate: "12.12.2019",
      loggedIn: true,
      paid: false,
      consumed: false
    });

    await bookedDay3.save();

    bookedDay = await models.BookedDay.findAll();
    console.log(`${bookedDay}`);
  } catch (error) {
    console.log(error);
  }

  try {
    let bookedDay4 = await models.BookedDay.build({
      menuID: 1,
      uID: 1,
      bookedDate: "13.12.2019",
      loggedIn: true,
      paid: true,
      consumed: false
    });

    await bookedDay4.save();

    bookedDay = await models.BookedDay.findAll();
    console.log(`${bookedDay}`);
  } catch (error) {
    console.log(error);
  }

  // ################################################
  // Meals

  // ------+ Meal 1 +------

  try {
    let meal1 = await models.Meal.build({
      mealName: "Salat",
      mealType: "S"
    });

    await meal1.save();

    meal = await models.Meal.findAll();
    console.log(`${meal}`);
  } catch (error) {
    console.log(error);
  }

  // ------+ Meal 2 +------

  try {
    let meal2 = await models.Meal.build({
      mealName: "Schnitzel",
      mealType: "M"
    });

    await meal2.save();

    meal = await models.Meal.findAll();
    console.log(`${meal}`);
  } catch (error) {
    console.log(error);
  }

  // ------+ Meal 3 +------

  try {
    let meal3 = await models.Meal.build({
      mealName: "Pudding",
      mealType: "D"
    });

    await meal3.save();

    meal = await models.Meal.findAll();
    console.log(`${meal}`);
  } catch (error) {
    console.log(error);
  }

  // ------+ Meal 4 +------

  try {
    let meal4 = await models.Meal.build({
      mealName: "Suppe",
      mealType: "S"
    });

    await meal4.save();

    meal = await models.Meal.findAll();
    console.log(`${meal}`);
  } catch (error) {
    console.log(error);
  }

  // ------+ Meal 5 +------

  try {
    let meal5 = await models.Meal.build({
      mealName: "Steak",
      mealType: "M"
    });

    await meal5.save();

    meal = await models.Meal.findAll();
    console.log(`${meal}`);
  } catch (error) {
    console.log(error);
  }

  // ------+ Meal 6 +------

  try {
    let meal6 = await models.Meal.build({
      mealName: "Kartoffeln",
      mealType: "D"
    });

    await meal6.save();

    meal = await models.Meal.findAll();
    console.log(`${meal}`);
  } catch (error) {
    console.log(error);
  }

  // ################################################
  // Menus

  // ------+ Menu 1 +------
  /*
  try {
    let menu1 = await models.Menu.create({
      sid: 1,
      sName: "Salat",
      mid: 2,
      mName: "Schnitzel",
      did: 3,
      dName: "Pudding"
    });
    await menu1.save();

    menu = await models.Menu.findAll();
    console.log(`${menu}`);
  } catch (error) {
    console.log(error);
  }

  // ------+ Menu 2 +------

  try {
    let menu2 = await models.Menu.build({
      sid: 4,
      sName: "Suppe",
      mid: 5,
      mName: "Steak",
      did: 6,
      dName: "Kartoffeln"
    });

    await menu2.save();

    menu = await models.Menu.findAll();
    console.log(`${menu}`);
  } catch (error) {
    console.log(error);
  }*/

  // ################################################
  // FoodDays

  // ------+ FoodDay 1 +------
  /*try {
    let foodDay1 = await models.FoodDay.build({
      menuID: 1,
      date: "23.11.2019"
    });

    await foodDay1.save();

    foodDay = await models.FoodDay.findAll();
    console.log(`${foodDay}`);
  } catch (error) {
    console.log(error);
  }

  // ------+ FoodDay 2 +------
  try {
    let foodDay2 = await models.FoodDay.build({
      menuID: 2,
      date: "24.11.2019"
    });

    await foodDay2.save();

    foodDay = await models.FoodDay.findAll();
    console.log(`${foodDay}`);
  } catch (error) {
    console.log(error);
  }

  // ------+ FoodDay 3 +------
  try {
    let foodDay3 = await models.FoodDay.build({
      menuID: 1,
      date: "25.11.2019"
    });

    await foodDay3.save();

    foodDay = await models.FoodDay.findAll();
    console.log(`${foodDay}`);
  } catch (error) {
    console.log(error);
  }

  // ------+ FoodDay 4 +------
  try {
    let foodDay4 = await models.FoodDay.build({
      menuID: 2,
      date: "26.11.2019"
    });

    await foodDay4.save();

    foodDay = await models.FoodDay.findAll();
    console.log(`${foodDay}`);
  } catch (error) {
    console.log(error);
  }

  // ------+ FoodDay 5 +------
  try {
    let foodDay5 = await models.FoodDay.build({
      menuID: 1,
      date: "27.11.2019"
    });

    await foodDay5.save();

    foodDay = await models.FoodDay.findAll();
    console.log(`${foodDay}`);
  } catch (error) {
    console.log(error);
  }

  // ------+ FoodDay 6 +------
  try {
    let foodDay6 = await models.FoodDay.build({
      menuID: 2,
      date: "27.11.2019"
    });

    await foodDay6.save();

    foodDay = await models.FoodDay.findAll();
    console.log(`${foodDay}`);
  } catch (error) {
    console.log(error);
  }

  // ------+ FoodDay 7 +------
  try {
    let foodDay7 = await models.FoodDay.build({
      menuID: 1,
      date: "27.11.2019"
    });

    await foodDay7.save();

    foodDay = await models.FoodDay.findAll();
    console.log(`${foodDay}`);
  } catch (error) {
    console.log(error);
  }

  // ------+ FoodDay 8 +------
  try {
    let foodDay8 = await models.FoodDay.build({
      menuID: 2,
      date: "27.11.2019"
    });

    await foodDay8.save();

    foodDay = await models.FoodDay.findAll();
    console.log(`${foodDay}`);
  } catch (error) {
    console.log(error);
  }

  // ------+ FoodDay 9 +------
  try {
    let foodDay9 = await models.FoodDay.build({
      menuID: 1,
      date: "27.11.2019"
    });

    await foodDay9.save();

    foodDay = await models.FoodDay.findAll();
    console.log(`${foodDay}`);
  } catch (error) {
    console.log(error);
  }*/

  try {
    // ################################################
    // Meals Starter, MainEat, Dessert

    /*let starter = await models.Starter.create({
      sName: "Salat"
    });

    let mainEat = await models.MainEat.create({
      mName: "Schnitzel"
    });

    let dessert = await models.Dessert.create({
      dName: "Pudding"
    });

    let starter2 = await models.Starter.create({
      sName: "Suppe"
    });

    let mainEat2 = await models.MainEat.create({
      mName: "Steak"
    });

    let dessert2 = await models.Dessert.create({
      dName: "Eis"
    });*/

    // ################################################
    // Menu
    /*
    let menu1 = await models.Menu.build({
      sid: 1,
      mid: 2,
      did: 3
    });
*/
    let menu1 = await models.Menu.build({
      name: "menu 1 für montag",
      description: "heute gibt es tolle sachen",
      starter: "Salat",
      main: "Schnitzel",
      dessert: "Pudding"
    });

    /*await menu1.setStarter(starter, { save: false });
    await menu1.setMainEat(mainEat, { save: false });
    await menu1.setDessert(dessert, { save: false });*/

    await menu1.save();

    let menu2 = await models.Menu.build({
      name: "menu2 für dienstag",
      description: "heute gibt es gute sachen",
      starter: "Suppe",
      main: "Steak",
      dessert: "Eis"
    });

    /*await menu2.setStarter(starter2, { save: false });
    await menu2.setMainEat(mainEat2, { save: false });
    await menu2.setDessert(dessert2, { save: false });*/

    await menu2.save();

    menus = await models.Menu.findAll();

    menus.forEach(async m => {
      console.log(`${m.name} ${await m.id}`);
    });

    // ################################################
    // FoodDay

    let foodDay1 = await models.FoodDay.build({
      date: "2020-02-03"
    });

    await foodDay1.setMenu(menu1, { save: false });
    await foodDay1.save();

    let foodDay2 = await models.FoodDay.build({
      date: "2020-02-04"
    });

    await foodDay2.setMenu(menu2, { save: false });
    await foodDay2.save();

    let foodDay3 = await models.FoodDay.build({
      date: "2020-02-05"
    });

    await foodDay3.setMenu(menu2, { save: false });
    await foodDay3.save();

    let foodDay4 = await models.FoodDay.build({
      date: "2020-02-06"
    });

    await foodDay4.setMenu(menu2, { save: false });
    await foodDay4.save();

    let foodDay5 = await models.FoodDay.build({
      date: "2020-02-07"
    });

    await foodDay5.setMenu(menu2, { save: false });
    await foodDay5.save();

    let foodDay6 = await models.FoodDay.build({
      date: "2020-02-10"
    });

    await foodDay6.setMenu(menu2, { save: false });
    await foodDay6.save();

    let foodDay7 = await models.FoodDay.build({
      date: "2020-02-11"
    });

    await foodDay7.setMenu(menu2, { save: false });
    await foodDay7.save();

    let foodDay8 = await models.FoodDay.build({
      date: "2020-02-12"
    });

    await foodDay8.setMenu(menu2, { save: false });
    await foodDay8.save();

    let foodDay9 = await models.FoodDay.build({
      date: "2020-02-13"
    });

    await foodDay9.setMenu(menu2, { save: false });
    await foodDay9.save();

    let foodDay10 = await models.FoodDay.build({
      date: "2020-02-14"
    });

    await foodDay10.setMenu(menu2, { save: false });
    await foodDay10.save();

    let foodDay11 = await models.FoodDay.build({
      date: "2020-03-09"
    });

    await foodDay11.setMenu(menu2, { save: false });
    await foodDay11.save();

    let foodDay12 = await models.FoodDay.build({
      date: "2020-03-10"
    });

    await foodDay12.setMenu(menu2, { save: false });
    await foodDay12.save();

    let foodDay13 = await models.FoodDay.build({
      date: "2020-03-11"
    });

    await foodDay13.setMenu(menu2, { save: false });
    await foodDay13.save();

    let foodDay14 = await models.FoodDay.build({
      date: "2020-03-12"
    });

    await foodDay14.setMenu(menu2, { save: false });
    await foodDay14.save();

    let foodDay15 = await models.FoodDay.build({
      date: "2020-03-13"
    });

    await foodDay15.setMenu(menu2, { save: false });
    await foodDay15.save();

    let foodDay16 = await models.FoodDay.build({
      date: "2020-03-16"
    });

    await foodDay16.setMenu(menu2, { save: false });
    await foodDay16.save();

    let foodDay17 = await models.FoodDay.build({
      date: "2020-03-17"
    });

    await foodDay17.setMenu(menu2, { save: false });
    await foodDay17.save();

    let foodDay18 = await models.FoodDay.build({
      date: "2020-03-18"
    });

    await foodDay18.setMenu(menu2, { save: false });
    await foodDay18.save();

    let foodDay19 = await models.FoodDay.build({
      date: "2020-03-19"
    });

    await foodDay19.setMenu(menu2, { save: false });
    await foodDay19.save();

    let foodDay20 = await models.FoodDay.build({
      date: "2020-03-20"
    });

    await foodDay20.setMenu(menu2, { save: false });
    await foodDay20.save();

    foodDays = await models.FoodDay.findAll();

    foodDays.forEach(async f => {
      console.log(`${f.id} ${f.date} ${(await f.getMenu()).id}`);
    });

    // ################################################
    // bookedDay

    let bookedDay1 = await models.BookedDay.build({
      uID: 2,
      loggedIn: true,
      paid: true,
      consumed: false
    });

    await bookedDay1.setFoodDay(foodDay1, { save: false });
    await bookedDay1.save();

    bookedDays = await models.BookedDay.findAll();

    bookedDays.forEach(async b => {
      console.log(`${b.id} ${b.uID} ${(await b.getFoodDay()).id}`);
    });
  } catch (error) {
    console.log(error);
  }
};
