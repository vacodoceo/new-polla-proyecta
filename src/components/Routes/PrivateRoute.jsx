import PropTypes from 'prop-types';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Route, Redirect } from 'react-router-dom';

import firebase from '../../firebase';
import Loading from '../Loading';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [user, loading] = useAuthState(firebase.auth());

  if (loading) {
    return <Loading />;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
};

export default PrivateRoute;
