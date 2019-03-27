import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import AddFood from "./pages/AddFood";
import ViewFood from "./pages/ViewFood";
import ViewSchedule from "./pages/ViewSchedule";
import AddMeal from "./pages/AddMeal";
import ViewMeal from "./pages/ViewMeal";
import ViewDailyPlan from "./pages/ViewDailyPlan";
import HomeContainer from "./pages/HomeContainer";
import ViewFoodFavorite from "./pages/ViewFoodFavorite";
import AddFoodGroup from "./pages/AddFoodGroup";
import Register from "./pages/Register";
import ProtectedRoute from "./ProtectedRoute";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Login} />

            <Route exact path="/home" component={HomeContainer} />
            <Route exact path="/Register" component={Register} />
            <Route exact path="/Logout" component={Logout} />

            <ProtectedRoute exact path="/AddFood" component={AddFood} />
            <ProtectedRoute exact path="/ViewFood" component={ViewFood} />
            <ProtectedRoute
              exact
              path="/AddFoodGroup"
              component={AddFoodGroup}
            />
            <ProtectedRoute exact path="/AddMeal" component={AddMeal} />
            <ProtectedRoute exact path="/ViewMeal" component={ViewMeal} />
            <ProtectedRoute
              exact
              path="/ViewDailyPlan"
              component={ViewDailyPlan}
            />
            <ProtectedRoute
              exact
              path="/ViewSchedule"
              component={ViewSchedule}
            />
            <ProtectedRoute
              exact
              path="/ViewFoodFavorite"
              component={ViewFoodFavorite}
            />

            {/* <Route exact path="/foods/:id" component={Detail} /> */}
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
      //   );
      // }
    );
  }
}

export default App;
