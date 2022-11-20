import { BrowserRouter, Switch, Route } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import { PrivateRoute, PublicRoute } from './components/Routes';
import {
  AboutUs,
  // Bet,
  FAQ,
  Landing,
  // Payment,
  // PaymentCallback,
  // PollaDetails,
  Pollas,
  Ranking,
  Results,
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
          <Route path="/about-us" exact component={AboutUs} />
          <Route path="/faq" exact component={FAQ} />
          <Route path="/ranking" exact component={Ranking} />
          <Route path="/results" exact component={Results} />
          <PublicRoute path="/sign-up" exact component={SignUp} />
          <PublicRoute path="/sign-in" exact component={SignIn} />
          {/* <PrivateRoute path="/bet" exact component={Bet} /> */}
          {/* <PrivateRoute
            path="/payment/callback"
            exact
            component={PaymentCallback}
          />
          <PrivateRoute path="/payment" exact component={Payment} />
          <PrivateRoute
            path="/pollas/:pollaId"
            exact
            component={PollaDetails}
          /> */}
          <PrivateRoute path="/pollas" exact component={Pollas} />
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
