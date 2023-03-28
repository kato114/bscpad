import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MainLayout from "./layouts/main";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Admin from "./pages/admin/Main";
import Login from "./pages/login/Main";

function App() {
  const [login, setLogin] = useState(false);
  return (
    <div className="App">
      <Router>
        <ToastContainer pauseOnFocusLoss={false} />
        <Switch>
          <Route path="/admin">
            <MainLayout>
              <Admin login={login} />
            </MainLayout>
          </Route>
          <Route path="/">
            <Login setLogin={setLogin} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
