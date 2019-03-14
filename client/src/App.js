import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import AddFood from "./pages/AddFood";
import ViewFood from "./pages/ViewFood";
import AddMeal from "./pages/AddMeal";
import ViewMeal from "./pages/ViewMeal";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={AddFood} />
          <Route exact path="/AddFood" component={AddFood} />
          <Route exact path="/ViewFood" component={ViewFood} />
          <Route exact path="/AddMeal" component={AddMeal} />
          <Route exact path="/ViewMeal" component={ViewMeal} />
          {/* <Route exact path="/foods/:id" component={Detail} /> */}
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
