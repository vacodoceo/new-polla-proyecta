import { BrowserRouter, Switch, Route } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import { PrivateRoute, PublicRoute } from './components/Routes';
import {
  Bet,
  Landing,
  Payment,
  PaymentCallback,
  SignIn,
  SignUp,
} from './pages';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Header />
      <main>
        <Switch>
          <Route path="/" exact component={Landing} />
          <PrivateRoute path="/bet" exact component={Bet} />
          <PrivateRoute path="/payment" exact component={PaymentCallback} />
          <PrivateRoute path="/payment/:pollaId" exact component={Payment} />
          <PublicRoute path="/sign-up" exact component={SignUp} />
          <PublicRoute path="/sign-in" exact component={SignIn} />
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
