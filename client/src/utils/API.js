import axios from "axios";

export default {
  // Gets all foods
  getFood: function() {
    return axios.get("/api/food");
  },
  getMeal: function() {
    return axios.get("/api/meal");
  },
  getFoodByFoodGroup: function(foodGroup) {
    return axios.get("/api/food/foodByFoodGroup/" + foodGroup);
  },

  // Gets the food with the given id
  getFoodByID: function(id) {
    return axios.get("/api/food/foodByID" + id);
  },
  // Deletes the food with the given id
  deleteFood: function(id) {
    return axios.delete("/api/food/" + id);
  },
  // Saves a food to the database
  saveFood: function(foodData) {
    return axios.post("/api/food", foodData);
  },
  saveMeal: function(mealData) {
    return axios.post("/api/meal", mealData);
  },
  getUser: function() {
    return axios.get("/api/user");
  },
  getUserByID: function(id) {
    return axios.get("/api/user/userByID" + id);
  },
  getFoodGroup: function() {
    return axios.get("/api/foodgroup");
  },
  // Gets the food with the given id
  getFoodGroupByID: function(id) {
    return axios.get("/api/foodgroup/foodGroupByID" + id);
  }
};
