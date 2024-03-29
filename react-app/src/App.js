import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import LoginForm from './components/auth/LoginFormModal/LoginForm';
// import SignUpForm from './components/auth/SignUpFormModal/SignUpForm';
import NavBar from './components/NavBar';  
import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
// import User from './components/User';
import { authenticate } from './store/session';
import SpotsList from './components/SpotsList';
import CreateSpot from './components/CreateSpot';
import CreateImage from './components/CreateImage';
import SpotDetails from './components/SpotDetails';
import EditSpot from './components/EditSpot';
// import CreateBooking from './components/CreateBooking';
import UserBookingsList from './components/BookingsList';
import Footer from './components/Footer';
// import LoginFormModal from './components/auth/LoginFormModal';
// import SignupFormModal from './components/auth/SignupFormModal';
import './App.css'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <body>
        <Switch>
          {/* <Route path='/login' exact={true}>
          <LoginFormModal />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignupFormModal />
        </Route> */}
          {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute> */}
          <ProtectedRoute path='/users/:userId/profile' exact={true}>
            <UserBookingsList />
          </ProtectedRoute>
          {/* <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
          <ProtectedRoute path='/spots/new' exact={true}>
            <CreateSpot />
          </ProtectedRoute>
          {/* <ProtectedRoute path='/spots/:spotId/bookings/new' exact={true}>
          <CreateBooking/>
        </ProtectedRoute> */}
          <ProtectedRoute path='/spots/:spotId/images/new' exact={true}>
            <CreateImage />
          </ProtectedRoute>
          <ProtectedRoute path='/spots/:spotId/edit' exact={true}>
            <EditSpot />
          </ProtectedRoute>
          <Route path='/spots/:spotId' exact={true}>
            <SpotDetails />
          </Route>
          <Route path='/' exact={true} >
            <SpotsList />
          </Route>
          <Route>
            <h1> 404 Error Page Not Found.
              <Link to='/'> Click here to go to back to home </Link>
            </h1>
          </Route>
        </Switch>
      </body>

      <footer>
        <Footer />
      </footer>
    </BrowserRouter>
  );
}

export default App;
