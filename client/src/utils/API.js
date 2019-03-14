import axios from "axios";

export default {
  // Gets all foods
  getFood: function() {
    return axios.get("/api/food");
  },
  // Gets the food with the given id
  getFoodByID: function(id) {
    return axios.get("/api/food/" + id);
  },
  // Deletes the food with the given id
  deleteFood: function(id) {
    return axios.delete("/api/food/" + id);
  },
  // Saves a food to the database
  saveFood: function(foodData) {
    return axios.post("/api/food", foodData);
  },
  getUser: function() {
    return axios.get("/api/user");
  },
  getUserByID: function(id) {
    return axios.get("/api/user/" + id);
  }
};
