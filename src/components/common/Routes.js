import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ListCarsPage from '../cars/ListCarsPage'
import LoginPage from '../users/LoginPage'
import RegisterPage from '../users/RegisterPage'
import PrivateRoute from './PrivateRoute'
import LogoutPage from '../users/LogoutPage'
import CreateCarPage from '../cars/CreateCarPage'
import CarDetails from '../cars/CarDetails'
import ProfilePage from '../users/ProfilePage'

const Routes = () => (
  <Switch>
    <Route path='/' exact component={ListCarsPage} />
    <Route path='/users/login' component={LoginPage} />
    <Route path='/users/register' component={RegisterPage} />
    <PrivateRoute path='/users/logout' component={LogoutPage} />
    <PrivateRoute path='/profile/:username' component={ProfilePage} />
    <PrivateRoute path='/cars/create' component={CreateCarPage} />
    <PrivateRoute path='/cars/details/:id' component={CarDetails} />
  </Switch>
)

export default Routes