import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Route, Redirect } from 'react-router-dom';

import firebase from '../../firebase';
import Loading from '../Loading';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [user, loading] = useAuthState(firebase.auth());

  useEffect(() => {
    if (user && !user.displayName) {
      const displayName = window.sessionStorage.getItem('displayName');
      user.updateProfile({ displayName }).then(window.location.reload());
      window.sessionStorage.clear();
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
};

export default PrivateRoute;
