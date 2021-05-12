import PropTypes from 'prop-types';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Route, Redirect, useLocation } from 'react-router-dom';

import firebase from '../../firebase';
import Loading from '../Loading';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [user, loading] = useAuthState(firebase.auth());
  const location = useLocation();

  if (!user) {
    window.sessionStorage.setItem('authRedirect', location.pathname);
  }

  if (user) {
    window.sessionStorage.removeItem('authRedirect');
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/sign-in" />
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
};

export default PrivateRoute;
