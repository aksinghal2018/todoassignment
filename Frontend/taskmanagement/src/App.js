import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Aboutus from "./Components/Home/Aboutus";
import Dashboard from "./Components/Home/Dashboard";
import EditImage from "./Components/Home/EditImage";
import Headercmp from "./Components/Home/Headercmp";
import Home from "./Components/Home/Home";
import Logincmp from "./Components/Home/Logincmp";
import Logoutcmp from "./Components/Home/Logoutcmp";
import Profile from "./Components/Home/Profile";
import Registercmp from "./Components/Home/Registercmp";
import TaskManagement from "./Components/Home/TaskManagement";
function App() {
  return (
    <div className="App">
      <Router>
      <Headercmp />
      <div>
        <Switch>
          <Route path="/" exact>
            <Logincmp />
          </Route>
          <Route path="/register" exact>
            <Registercmp />
          </Route>
          <Route path="/login" exact>
            <Logincmp />
          </Route>
          <Route path="/logout" exact>
            <Logoutcmp />
          </Route>
          <Route path="/dashboard" exact>
            <Dashboard />
          </Route>
          <Route path="/changeimage" exact>
            <EditImage />
          </Route>
          <Route path="/taskmanagement" exact>
            <TaskManagement />
          </Route>
          <Route path="/profile" exact>
            <Profile />
          </Route>
          <Route path="/aboutus" exact>
            <Aboutus />
          </Route>
          
          </Switch>
      </div>
     </Router>
      </div>
  );
}

export default App;
