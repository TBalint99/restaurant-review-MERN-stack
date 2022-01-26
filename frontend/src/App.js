import React, { useState } from "react"
import { Switch, Route, Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'

import AddReview from "./components/add-review"
import Restaurants from "./components/restaurants"
import RestaurantsList from "./components/restaurants-list"
import Login from "./components/login"

function App() {

  const [user, setUser] = useState(null)

  async function login(user = null) {
    setUser(user)
  }

  async function logout() {
    setUser(null)
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/restaurants" className="navbar-brand">
          Restaurant Reviews
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/restaurants"} className="nav-link">
              Restaurants
            </Link>
          </li>
          <li className="nav-item">
            {
              user ? (
                <a onClick={logout} className="nav-link" style={{cursor: 'pointer'}}>
                  Logout {user.name}
                </a>
              ) : (
                <Link to={"/login"} className="nav-link">
                  Login dude
                </Link>
              )
            }
          </li>
        </div>
      </nav>

      <div className="container mt-3">            
            <Switch>

              <Route exact path={["/", "/restaurants"]}>
                <RestaurantsList/>
              </Route>

              <Route path="/restaurants/:id/reviews" >
                <AddReview user={user} />
              </Route>

              <Route path="/restaurants/:id" >
                <Restaurants user={user} />
              </Route>

              <Route path="/login" >
                <Login login={login} />
              </Route>
              
            </Switch>
      </div>
    </div>
  );
}

export default App;
