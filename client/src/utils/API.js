import axios from "axios";

export default {
  //To get the picture from recipes API

  getRecipes: function(query) {
    return axios.get(
      "https://cors.io/?http://www.recipepuppy.com/api/?q=" +
        { params: { q: query } }
    );
  },
  // Gets all foods
  getFood: function() {
    return axios.get("/api/food");
  },
  getMeal: function() {
    return axios.get("/api/meal");
  },

  //! this is the new one ignored this in merge conflict
  //   updateMealByID: function (id, updatedMeal) {
  //     return axios.put("/api/meal/" + id, updatedMeal);
  //   },
  //   getMealByUser: function (userID) {
  removeFoodFromMealByID: function(mealId, foodId) {
    console.log("inside client api removeFoodFromMealById");
    console.log("mealId is:", mealId); //this is right
    console.log("foodId is:", foodId); // this is correct
    return axios.delete("/api/meal/food/" + mealId + "/" + foodId);
  },

  removeMealFromDailyPlanByID: function(dailyPlanId, mealId) {
    console.log("inside client api removeMealFromDailyPlanByID");
    console.log("dailPlanId is:", dailyPlanId);
    console.log("mealId is:", mealId);
    return axios.delete("/api/dailyPlan/meal/" + dailyPlanId + "/" + mealId);
  },

  removeDailyPlanFromScheduleByID: function(scheduleId, dailyPlanId) {
    return axios.delete(
      "/api/schedule/dailyPlan/" + scheduleId + "/" + dailyPlanId
    );
  },

  //! new stuff
  updateEnergyPotassiumTotalsForMealByID: function(
    mealId,
    totalEnergy,
    totalPotassium
  ) {
    console.log("mealId is:", mealId);
    console.log("totalEnergy is:", totalEnergy);
    console.log("totalPotassium is:", totalPotassium);
    return axios.put("/api/meal/KCalTotals/" + mealId, {
      totalEnergy: totalEnergy,
      totalPotassium: totalPotassium
    });
  },

  updateEnergyPotassiumTotalsForDailyPlanByID: function(
    dailyPlanId,
    totalEnergy,
    totalPotassium
  ) {
    console.log("dailyPlanId is:", dailyPlanId);
    console.log("totalEnergy is:", totalEnergy);
    console.log("totalPotassium is:", totalPotassium);
    return axios.put("/api/dailyPlan/KCalTotals/" + dailyPlanId, {
      totalEnergy: totalEnergy,
      totalPotassium: totalPotassium
    });
  },

  updateEnergyPotassiumTotalsForScheduleByID: function(
    scheduleId,
    totalEnergy,
    totalPotassium
  ) {
    console.log("scheduleId is:", scheduleId);
    console.log("totalEnergy is:", totalEnergy);
    console.log("totalPotassium is:", totalPotassium);
    return axios.put("/api/schedule/KCalTotals/" + scheduleId, {
      totalEnergy: totalEnergy,
      totalPotassium: totalPotassium
    });
  },

  addFoodToMealByID: function(mealId, foodId, servingSize) {
    console.log("in addFoodToMealByID");
    console.log("mealId is:", mealId);
    console.log("foodId is:", foodId);
    console.log("servingSize is:", servingSize);
    return axios.post("/api/meal/food/" + mealId + "/" + foodId, {
      servingSize: servingSize
    });
  },

  addMealToDailyPlanByID: function(dailyPlanId, mealId) {
    return axios.post("/api/dailyPlan/meal/" + dailyPlanId + "/" + mealId);
  },

  // addDailyPlanToScheduleByDate: function(scheduleData) {
  //   return axios.post("/api/schedule" + scheduleData);
  // },

  getMealByUser: function(userID) {
    console.log(
      "I'm inside getMealByUser in the API... looking for meals for:",
      userID
    );
    return axios.get("/api/meal/mealByUser/" + userID);
  },

  getDailyPlanByUser: function(userID) {
    return axios.get("/api/dailyPlan/dailyPlanByUser/" + userID);
  },

  getMealByID: function(id) {
    return axios.get("/api/meal/mealByID/" + id);
  },

  getDailyPlanByID: function(id) {
    return axios.get("/api/dailyPlan/" + id);
  },

  getScheduleByScheduleDate: function(scheduleDate) {
    return axios.get("/api/schedule/dailyPlanByScheduleDate/" + scheduleDate);
  },

  getScheduleByUser: function(userID) {
    return axios.get("/api/schedule/scheduleByUser/" + userID);
  },

  deleteMeal: function(id) {
    return axios.delete("/api/meal/" + id);
  },

  deleteDailyPlan: function(id) {
    return axios.delete("/api/dailyPlan/" + id);
  },
  getFoodByFoodGroupName: function(foodGroupName) {
    return axios.get("/api/food/foodByFoodGroupName/" + foodGroupName);
  },
  getFoodByFoodGroupNameAndUser: function(foodGroupName, userID) {
    return axios.get(
      "/api/food/foodByFoodGroupNameAndUser/" + foodGroupName + "/" + userID
    );
  },
  getFoodByUser: function(userID) {
    return axios.get("/api/food/foodByUser/" + userID);
  },
  getFoodGroupByMasterAndUser: function(userID) {
    return axios.get(
      "/api/foodgroup/foodGroupByMasterAndUser/" + "123456/" + userID
    );
  },
  getFoodGroupByMaster: function(userID) {
    return axios.get("/api/foodgroup/foodGroupByMaster/" + "123456");
  },
  // Gets the food with the given id
  getFoodByID: function(id) {
    return axios.get("/api/food/foodByID/" + id);
  },
  getFoodByFoodName: function(foodName) {
    return axios.get("/api/food/foodByFoodName/" + foodName);
  },
  // Deletes the food with the given id

  deleteFoodByID: function(id) {
    return axios.delete("/api/food/foodByID/" + id);
  },
  // Update the food with the given id

  updateFoodByID: function(id, updatedFood) {
    return axios.put("/api/food/foodByID/" + id, updatedFood);
  },

  // Saves a food to the database
  saveFood: function(foodData) {
    return axios.post("/api/food", foodData);
  },
  saveSchedule: function(scheduleData) {
    return axios.post("/api/schedule", scheduleData);
  },
  updateSchedule: function(scheduleData) {
    return axios.put("/api/schedule", scheduleData);
  },
  saveFoodGroup: function(foodGroupData) {
    return axios.post("/api/foodGroup", foodGroupData);
  },
  saveMeal: function(mealData) {
    return axios.post("/api/meal", mealData);
  },
  saveDailyPlan: function(dailyPlanData) {
    return axios.post("/api/dailyPlan", dailyPlanData);
  },
  getUser: function() {
    return axios.get("/api/user");
  },
  getUserByID: function(id) {
    return axios.get("/api/user/userByID/" + id);
  },
  getFoodGroup: function() {
    return axios.get("/api/foodgroup");
  },
  // Gets the food with the given id
  getFoodGroupByID: function(id) {
    return axios.get("/api/foodgroup/foodGroupByID/" + id);
  }
};
