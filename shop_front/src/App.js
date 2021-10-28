import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import SignUp from "./comp/signup/SignUp";

import "./App.css";
import Login from "./comp/login/Login";
import Request from "./comp/request/Request";
import Shop from "./comp/shop/Shop";
import { useSelector } from "react-redux";
import { selectUser } from "./redux/slices/userSlice";
import { useEffect } from "react";

function App() {
  const user = useSelector(selectUser);
  let history = useHistory();
  function backToLogin() {
    history.push("/signup");
  }

  function redirectAuth() {
    if (user == null) {
      history.push("/signup");
    } else {
      if (user?.is_shop == 1) {
        history.push("/shop");
      } else if (user?.is_shop == 0) {
        history.push("/request");
      }
    }
  }

  useEffect(() => {}, []);

  return (
    <div className="app">
      <Router>
        {user == null && <Redirect to="/signup" />}
        {user?.is_shop == 1 && <Redirect to="/shop" />}
        {user?.is_shop == 0 && <Redirect to="/request" />}
        <Switch>
          <Route path="/signin">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/request">
            <Request />
          </Route>
          <Route path="/shop">
            <Shop />
          </Route>
          <Route path="/">
            {user == null && <Redirect to="/signup" />}
            {user?.is_shop == 1 && <Redirect to="/shop" />}
            {user?.is_shop == 0 && <Redirect to="/request" />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
